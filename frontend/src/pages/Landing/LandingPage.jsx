import React, { useState } from 'react';
import { 
  Scan, 
  ArrowRight, 
  Sparkles, 
  Recycle, 
  Cpu, 
  Camera, 
  Layers
} from 'lucide-react';
import { WASTE_CATEGORIES, SAMPLE_PRESETS } from '../../data/mockData';

export default function LandingPage({ onStartAnalyze, onSelectSample, setActivePage }) {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div style={{ position: 'relative', zIndex: 1, paddingBottom: '90px' }}>
      {/* Hero Section */}
      <section style={{ minHeight: '84vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          {/* Top Brand Pill with Glowing Sparkle */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(22, 119, 255, 0.12)',
              border: '1px solid rgba(22, 119, 255, 0.35)',
              color: '#60a5fa',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '28px',
              boxShadow: '0 0 20px rgba(22, 119, 255, 0.25)',
              animation: 'floatAnim 4s infinite ease-in-out'
            }}
          >
            <Sparkles size={16} color="#20d47a" />
            <span>AI-POWERED WASTE INTELLIGENCE</span>
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.6rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '22px',
            }}
          >
            See Waste Differently.{' '}
            <span className="gradient-text-green">Recycle Smarter.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
              color: '#9BAFC3',
              maxWidth: '720px',
              margin: '0 auto 38px auto',
              lineHeight: 1.6,
              fontWeight: 400
            }}
          >
            LuminaGreen combines computer vision and <strong style={{ color: '#F5F9FF' }}>MobileNetV2 transfer learning</strong> to 
            classify municipal waste in real time, eliminate contamination, and provide localized recycling guidance.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '46px'
            }}
          >
            <button
              onClick={onStartAnalyze}
              className="btn btn-primary btn-lg"
              style={{
                fontSize: '1.1rem',
                padding: '16px 36px',
                borderRadius: '16px'
              }}
            >
              <Scan size={22} />
              Analyze Waste Now
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setActivePage('dashboard')}
              className="btn btn-secondary btn-lg"
              style={{
                fontSize: '1.1rem',
                padding: '16px 32px',
                borderRadius: '16px'
              }}
            >
              <Layers size={20} />
              Explore Platform
            </button>
          </div>

          {/* Three Feature Badges specified in requirement */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '28px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F5F9FF', fontSize: '0.95rem', fontWeight: 600 }}>
              <span style={{ fontSize: '1.25rem' }}>♻</span>
              <span>AI Classification</span>
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.95rem', fontWeight: 600 }}>
              <span style={{ fontSize: '1.25rem' }}>🌱</span>
              <span>Smart Recycling</span>
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60A5FA', fontSize: '0.95rem', fontWeight: 600 }}>
              <span style={{ fontSize: '1.25rem' }}>◉</span>
              <span>Intelligent Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Test Demo Carousel: 1-Click Samples */}
      <section style={{ padding: '30px 0 60px 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '30px 32px',
              border: '1px solid rgba(32, 212, 122, 0.25)',
              background: 'linear-gradient(180deg, rgba(12, 24, 43, 0.75) 0%, rgba(8, 18, 33, 0.85) 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  <Sparkles size={15} />
                  <span>Interactive Live Sandbox</span>
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#F5F9FF', marginTop: '4px' }}>
                  Test Pre-Trained Waste Detection Instantly
                </h3>
              </div>
              <span style={{ color: '#9BAFC3', fontSize: '0.9rem' }}>
                Click any real sample below to run inference:
              </span>
            </div>

            {/* Presets Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '16px',
              }}
            >
              {SAMPLE_PRESETS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => onSelectSample(sample)}
                  className="interactive-card"
                  style={{
                    background: 'rgba(6, 17, 31, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    padding: '12px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1/1',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      marginBottom: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      background: '#040d18'
                    }}
                  >
                    <img
                      src={sample.image}
                      alt={sample.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  </div>

                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#F5F9FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {sample.title}
                  </div>

                  <div style={{ fontSize: '0.72rem', color: sample.isLowConfidence ? '#f59e0b' : '#20d47a', fontWeight: 600, marginTop: '4px' }}>
                    {sample.isLowConfidence ? '⚠️ Low Conf' : `${sample.confidence}% Conf`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: How LuminaGreen Works (01 Upload -> 02 Analyze -> 03 Recycle) */}
      <section style={{ padding: '70px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 50px auto' }}>
            <div style={{ color: '#20D47A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Seamless Three-Step Workflow
            </div>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginTop: '8px', color: '#F5F9FF' }}>
              How LuminaGreen Works
            </h2>
            <p style={{ color: '#9BAFC3', fontSize: '1rem', marginTop: '10px' }}>
              From image capture to disposal certification in under two seconds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              position: 'relative'
            }}
          >
            {/* Step 1 */}
            <div
              className="glass-panel interactive-card"
              style={{
                padding: '36px 30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: 'rgba(22, 119, 255, 0.15)',
                    border: '1px solid rgba(22, 119, 255, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#60a5fa'
                  }}
                >
                  <Camera size={26} />
                </div>
                <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)' }}>
                  01
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Upload
                </h3>
                <p style={{ color: '#9BAFC3', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '8px' }}>
                  Drop an image from your device or activate your device camera in real-time. LuminaGreen checks file integrity, resolution, and format automatically.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div
              className="glass-panel interactive-card"
              style={{
                padding: '36px 30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                borderColor: 'rgba(32, 212, 122, 0.3)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: 'rgba(32, 212, 122, 0.15)',
                    border: '1px solid rgba(32, 212, 122, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#20d47a'
                  }}
                >
                  <Cpu size={26} />
                </div>
                <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(32,212,122,0.3)' }}>
                  02
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Analyze
                </h3>
                <p style={{ color: '#9BAFC3', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '8px' }}>
                  Our MobileNetV2 neural network preprocesses the 224×224 tensor, extracts feature embeddings, and predicts classification probabilities with high precision.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div
              className="glass-panel interactive-card"
              style={{
                padding: '36px 30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: 'rgba(103, 245, 166, 0.15)',
                    border: '1px solid rgba(103, 245, 166, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#67f5a6'
                  }}
                >
                  <Recycle size={26} />
                </div>
                <span className="font-mono" style={{ fontSize: '2rem', fontWeight: 800, color: 'rgba(255,255,255,0.15)' }}>
                  03
                </span>
              </div>

              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Recycle
                </h3>
                <p style={{ color: '#9BAFC3', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '8px' }}>
                  Receive intelligent, actionable recycling guidance tailored to local municipal policy, designated bin colors, and carbon offset tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Waste Categories Grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 46px auto' }}>
            <div style={{ color: '#20D47A', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Six Standardized Material Streams
            </div>
            <h2 style={{ fontSize: '2.3rem', fontWeight: 800, marginTop: '8px', color: '#F5F9FF' }}>
              Supported Waste Categories
            </h2>
            <p style={{ color: '#9BAFC3', fontSize: '1rem', marginTop: '10px' }}>
              Trained on thousands of curated samples across all core municipal waste streams.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {WASTE_CATEGORIES.map((cat) => {
              const isHovered = hoveredCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="glass-panel interactive-card"
                  style={{
                    padding: '28px',
                    borderColor: isHovered ? 'rgba(32, 212, 122, 0.5)' : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: isHovered ? '0 12px 30px rgba(0,0,0,0.6), 0 0 25px rgba(32, 212, 122, 0.25)' : 'none',
                    transform: isHovered ? 'translateY(-6px)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '2.2rem' }}>{cat.iconEmoji}</span>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                          {cat.name}
                        </h3>
                        <div style={{ fontSize: '0.78rem', color: '#9BAFC3' }}>
                          Model Accuracy: <span style={{ color: '#20D47A', fontWeight: 700 }}>{cat.accuracy}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`badge ${cat.badgeType}`}>
                      {cat.status}
                    </span>
                  </div>

                  <p style={{ color: '#9BAFC3', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '18px' }}>
                    {cat.description}
                  </p>

                  <div
                    style={{
                      background: 'rgba(6, 17, 31, 0.6)',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem'
                    }}
                  >
                    <span style={{ color: '#9BAFC3' }}>Target Bin:</span>
                    <span style={{ color: cat.binColor, fontWeight: 700 }}>
                      {cat.binName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Production Architecture Teaser */}
      <section style={{ padding: '60px 0 20px 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '40px',
              border: '1px solid rgba(22, 119, 255, 0.3)',
              background: 'linear-gradient(135deg, rgba(10, 23, 42, 0.85) 0%, rgba(6, 17, 31, 0.95) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '30px'
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Cpu size={16} />
                <span>MobileNetV2 Deep Neural Architecture</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#F5F9FF', marginTop: '8px' }}>
                Engineered for Real-Time Mobile & Edge Inference
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '10px' }}>
                Utilizing inverted residual blocks, depthwise separable convolutions, and transfer learning fine-tuning. 
                Delivers 94.2% test accuracy with an ultra-low 38ms latency footprint.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePage('model-evaluation')}
                className="btn btn-secondary"
                style={{ borderRadius: '12px', padding: '12px 24px' }}
              >
                <Cpu size={18} />
                View Model Evaluation
              </button>
              <button
                onClick={onStartAnalyze}
                className="btn btn-primary"
                style={{ borderRadius: '12px', padding: '12px 24px' }}
              >
                <Scan size={18} />
                Launch Scanner
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
