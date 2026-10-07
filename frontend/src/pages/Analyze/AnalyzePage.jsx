import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, 
  Camera, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Cpu, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../../data/mockData';

export default function AnalyzePage({ onRunPrediction, selectedPreset, onClearPreset }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [validationState, setValidationState] = useState(null); // { valid: bool, errors: [], metadata: {} }
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState(0); // 0: Idle, 1: Validating, 2: Preprocessing, 3: Neural Backbone, 4: Softmax

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // Section 12: Image Validation pipeline
  const validateImageDimensions = useCallback((src, sizeBytes, mimeType) => {
    const errors = [];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    // Format validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (mimeType && !allowedTypes.includes(mimeType.toLowerCase())) {
      errors.push('Unsupported format. Only JPG, PNG, and WebP are supported.');
    }

    // Size validation
    if (sizeBytes > maxSizeBytes) {
      errors.push('File is too large. Maximum supported size is 10 MB.');
    }
    if (sizeBytes === 0) {
      errors.push('Empty file detected. Please upload a valid image.');
    }

    const img = new Image();
    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width < 64 || height < 64) {
        errors.push('Image resolution too low (<64px). Neural network requires clearer input.');
      }

      setValidationState({
        valid: errors.length === 0,
        errors,
        metadata: {
          width,
          height,
          aspect: (width / height).toFixed(2),
          sizeFormatted: (sizeBytes / (1024 * 1024)).toFixed(2) + ' MB',
          format: mimeType ? mimeType.replace('image/', '').toUpperCase() : 'JPG'
        }
      });
    };
    img.onerror = () => {
      errors.push('Corrupted image payload. Failed to decode pixel matrix.');
      setValidationState({ valid: false, errors, metadata: {} });
    };
    img.src = src;
  }, []);

  // If a preset was passed from Landing Page or Sample bar
  useEffect(() => {
    if (selectedPreset) {
      const timer = setTimeout(() => {
        setPreviewUrl(selectedPreset.image);
        setSelectedFile({
          name: `${selectedPreset.title.toLowerCase().replace(/\s+/g, '_')}.jpg`,
          size: 512000,
          type: 'image/jpeg',
          presetData: selectedPreset
        });
        validateImageDimensions(selectedPreset.image, 512000, 'image/jpeg');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [selectedPreset, validateImageDimensions]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start real browser camera
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported on this browser or context.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setPreviewUrl(null);
      setSelectedFile(null);
      setValidationState(null);
    } catch (err) {
      console.warn('Camera error:', err);
      setCameraError('Camera access unavailable. You can use drag-and-drop or our sample photos below!');
    }
  };

  // Capture frame from webcam stream
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);

    stopCamera();
    setPreviewUrl(dataUrl);
    setSelectedFile({
      name: `webcam_scan_${Date.now()}.jpg`,
      size: Math.round(dataUrl.length * 0.75),
      type: 'image/jpeg',
    });
    validateImageDimensions(dataUrl, Math.round(dataUrl.length * 0.75), 'image/jpeg');
  };

  // Handle file drop / input
  const handleFileSelect = (file) => {
    if (!file) return;
    stopCamera();

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setPreviewUrl(dataUrl);
      setSelectedFile(file);
      validateImageDimensions(dataUrl, file.size, file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Run AI processing with multi-stage HUD
  const handleStartAnalysis = () => {
    if (!previewUrl || (validationState && !validationState.valid)) return;

    setIsProcessing(true);
    setProcessingStage(1); // Stage 1: Validating

    setTimeout(() => {
      setProcessingStage(2); // Stage 2: Preprocessing (224x224 RGB)
      setTimeout(() => {
        setProcessingStage(3); // Stage 3: MobileNetV2 feature extraction
        setTimeout(() => {
          setProcessingStage(4); // Stage 4: Softmax distribution
          setTimeout(() => {
            setIsProcessing(false);
            setProcessingStage(0);
            // Send to result viewer
            onRunPrediction({
              imageSrc: previewUrl,
              file: selectedFile,
              validation: validationState?.metadata
            });
          }, 600);
        }, 700);
      }, 600);
    }, 500);
  };

  const handleReset = () => {
    stopCamera();
    setSelectedFile(null);
    setPreviewUrl(null);
    setValidationState(null);
    setIsProcessing(false);
    setProcessingStage(0);
    if (onClearPreset) onClearPreset();
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 36px auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sparkles size={16} />
          <span>Real-Time Waste Classification</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#F5F9FF' }}>
          Analyze Municipal Waste
        </h1>
        <p style={{ color: '#9BAFC3', fontSize: '1rem', marginTop: '8px' }}>
          Upload an image or capture directly with your camera. MobileNetV2 will classify the material and deliver localized disposal rules.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: previewUrl ? '1fr 1fr' : '1fr', gap: '28px', maxWidth: '1080px', margin: '0 auto' }}>
        {/* Left Column: Upload / Camera Box */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            position: 'relative',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            minHeight: '440px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Active Camera View */}
          {isCameraActive ? (
            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#02070e',
                  border: '2px solid #20d47a',
                  boxShadow: '0 0 25px rgba(32, 212, 122, 0.3)'
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                
                {/* Viewfinder Target Reticle */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '16%',
                    border: '2px dashed rgba(32, 212, 122, 0.7)',
                    borderRadius: '16px',
                    pointerEvents: 'none'
                  }}
                />
                <div style={{ position: 'absolute', top: 12, left: 16, color: '#20D47A', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em' }}>
                  ● LIVE CAMERA STREAM
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', marginTop: '18px' }}>
                <button onClick={capturePhoto} className="btn btn-primary" style={{ padding: '12px 28px' }}>
                  <Camera size={18} />
                  Capture Photo
                </button>
                <button onClick={stopCamera} className="btn btn-outline">
                  Cancel
                </button>
              </div>
            </div>
          ) : !previewUrl ? (
            /* Upload Zone */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: 'rgba(22, 119, 255, 0.12)',
                  border: '1px solid rgba(22, 119, 255, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto',
                  color: '#60a5fa'
                }}
              >
                <Upload size={36} />
              </div>

              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#F5F9FF' }}>
                Drop your waste image here
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.9rem', marginTop: '6px' }}>
                Supports JPG, PNG, and WebP (up to 10 MB)
              </p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary"
                >
                  <Upload size={18} />
                  Choose File
                </button>

                <button
                  onClick={startCamera}
                  className="btn btn-secondary"
                >
                  <Camera size={18} />
                  Open Camera
                </button>
              </div>

              {cameraError && (
                <div style={{ marginTop: '18px', color: '#f59e0b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <AlertTriangle size={15} />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Image Preview & Scanner Frame */
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5F9FF' }}>
                  Captured Input
                </div>
                <button
                  onClick={handleReset}
                  className="btn btn-ghost btn-sm"
                  style={{ color: '#9BAFC3', padding: '4px 10px' }}
                >
                  <RefreshCw size={14} />
                  Change Image
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1/1',
                  maxHeight: '360px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#040d18',
                  border: isProcessing ? '2px solid #20d47a' : '1px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: isProcessing ? '0 0 30px rgba(32, 212, 122, 0.4)' : 'none',
                }}
              >
                <img
                  src={previewUrl}
                  alt="Waste to classify"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Laser scanning beam during processing */}
                {isProcessing && <div className="scanner-laser" />}

                {/* Overlay Neural Grid Box */}
                <div
                  style={{
                    position: 'absolute',
                    inset: '10%',
                    border: '1px solid rgba(32, 212, 122, 0.4)',
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#20d47a', fontFamily: 'monospace' }}>
                    <span>RES: 224×224</span>
                    <span>MOBILENET_V2</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#20d47a', fontFamily: 'monospace' }}>
                    <span>CHANNELS: 3</span>
                    <span>TENSOR: READY</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleStartAnalysis}
                  disabled={isProcessing || (validationState && !validationState.valid)}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    opacity: isProcessing ? 0.8 : 1
                  }}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Analyzing Neural Matrix...
                    </>
                  ) : (
                    <>
                      <Cpu size={18} />
                      Run AI Classification
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Multi-Stage AI HUD & Validation State (when file is picked) */}
        {previewUrl && (
          <div
            className="glass-panel"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                <Cpu size={16} />
                <span>Section 16: AI Engine HUD</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5F9FF' }}>
                Pipeline Verification
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.9rem', marginTop: '6px' }}>
                Pre-flight checks and MobileNetV2 transfer learning execution.
              </p>

              {/* Validation Specs Card */}
              {validationState && (
                <div
                  style={{
                    marginTop: '20px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: validationState.valid ? 'rgba(32, 212, 122, 0.08)' : 'rgba(244, 63, 94, 0.1)',
                    border: `1px solid ${validationState.valid ? 'rgba(32, 212, 122, 0.25)' : 'rgba(244, 63, 94, 0.3)'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    {validationState.valid ? (
                      <CheckCircle size={18} color="#20D47A" />
                    ) : (
                      <ShieldAlert size={18} color="#F43F5E" />
                    )}
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: validationState.valid ? '#20D47A' : '#F43F5E' }}>
                      {validationState.valid ? 'Image Integrity Verified' : 'Validation Failed'}
                    </span>
                  </div>

                  {validationState.valid ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.8rem', color: '#9BAFC3' }}>
                      <div>Resolution: <strong style={{ color: '#F5F9FF' }}>{validationState.metadata.width}×{validationState.metadata.height}</strong></div>
                      <div>Format: <strong style={{ color: '#F5F9FF' }}>{validationState.metadata.format}</strong></div>
                      <div>Size: <strong style={{ color: '#F5F9FF' }}>{validationState.metadata.sizeFormatted}</strong></div>
                      <div>Aspect Ratio: <strong style={{ color: '#F5F9FF' }}>{validationState.metadata.aspect}</strong></div>
                    </div>
                  ) : (
                    <div style={{ color: '#fb7185', fontSize: '0.85rem' }}>
                      {validationState.errors.map((err, i) => (
                        <div key={i}>• {err}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 4-Step Animated Pipeline Checklist */}
              <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Step 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: processingStage >= 1 || (!isProcessing && validationState?.valid) ? '#20d47a' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#04120a', fontSize: '0.75rem', fontWeight: 800 }}>
                    ✓
                  </div>
                  <div style={{ fontSize: '0.9rem', color: processingStage === 1 ? '#20D47A' : '#F5F9FF', fontWeight: processingStage === 1 ? 700 : 500 }}>
                    Image format & integrity validated
                  </div>
                </div>

                {/* Step 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: processingStage >= 2 ? '#20d47a' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#04120a', fontSize: '0.75rem', fontWeight: 800 }}>
                    {processingStage >= 2 ? '✓' : '2'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: processingStage === 2 ? '#20D47A' : processingStage > 2 ? '#F5F9FF' : '#9BAFC3', fontWeight: processingStage === 2 ? 700 : 500 }}>
                    Tensor resized to 224×224 & normalized [-1, 1]
                  </div>
                </div>

                {/* Step 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: processingStage >= 3 ? '#20d47a' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#04120a', fontSize: '0.75rem', fontWeight: 800 }}>
                    {processingStage >= 3 ? '✓' : '3'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: processingStage === 3 ? '#20D47A' : processingStage > 3 ? '#F5F9FF' : '#9BAFC3', fontWeight: processingStage === 3 ? 700 : 500 }}>
                    MobileNetV2 feature extraction & GAP layer
                  </div>
                </div>

                {/* Step 4 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: processingStage >= 4 ? '#20d47a' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#04120a', fontSize: '0.75rem', fontWeight: 800 }}>
                    {processingStage >= 4 ? '✓' : '4'}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: processingStage === 4 ? '#20D47A' : '#9BAFC3', fontWeight: processingStage === 4 ? 700 : 500 }}>
                    Softmax classification & confidence calculation
                  </div>
                </div>
              </div>
            </div>

            {/* Hint footer */}
            <div
              style={{
                marginTop: '30px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(22, 119, 255, 0.08)',
                border: '1px solid rgba(22, 119, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.82rem',
                color: '#60a5fa'
              }}
            >
              <Info size={16} />
              <span>Section 31 logic: Confidence scores below 70% automatically trigger clarification guidance.</span>
            </div>
          </div>
        )}
      </div>

      {/* Preset Sandbox below upload for immediate 1-click test */}
      <div style={{ marginTop: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F9FF' }}>
            Or pick from pre-curated test items:
          </h4>
          <span style={{ fontSize: '0.85rem', color: '#9BAFC3' }}>
            Includes 6 standard classes + low-confidence edge case
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '14px' }}>
          {SAMPLE_PRESETS.map((sample) => (
            <div
              key={sample.id}
              onClick={() => {
                setPreviewUrl(sample.image);
                setSelectedFile({
                  name: `${sample.categoryId}.jpg`,
                  size: 450000,
                  type: 'image/jpeg',
                  presetData: sample
                });
                validateImageDimensions(sample.image, 450000, 'image/jpeg');
              }}
              className="interactive-card"
              style={{
                background: 'rgba(10, 23, 42, 0.7)',
                border: selectedFile?.presetData?.id === sample.id ? '2px solid #20d47a' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', marginBottom: '8px', background: '#02070e' }}>
                <img src={sample.image} alt={sample.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F5F9FF' }}>
                {sample.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: sample.isLowConfidence ? '#f59e0b' : '#20d47a', fontWeight: 600 }}>
                {sample.isLowConfidence ? 'Edge Case' : sample.category}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
