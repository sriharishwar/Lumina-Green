import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Activity
} from 'lucide-react';
import { INITIAL_ANALYTICS, MODEL_METADATA } from '../../data/mockData';

export default function ModelEvaluationPage() {
  const { confusionMatrix } = INITIAL_ANALYTICS;
  const [hoveredCell, setHoveredCell] = useState(null);

  const classes = confusionMatrix.classes;
  const matrix = confusionMatrix.matrix;

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            <Cpu size={15} />
            <span>Section 22: AI Engine Evaluation</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            Model Evaluation & Architecture
          </h1>
          <p style={{ color: '#9BAFC3', fontSize: '0.95rem', marginTop: '4px' }}>
            Verified transfer learning benchmark results on the 2,400-sample test partition.
          </p>
        </div>

        {/* Model Version Tag */}
        <div
          style={{
            padding: '8px 18px',
            borderRadius: '12px',
            background: 'rgba(32, 212, 122, 0.12)',
            border: '1px solid rgba(32, 212, 122, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#20d47a', boxShadow: '0 0 10px #20d47a' }} />
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#F5F9FF' }}>
              {MODEL_METADATA.name}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#20D47A' }}>
              Active Production Checkpoint
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Specified in Section 22 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        {/* Accuracy */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            TEST ACCURACY
          </div>
          <div className="font-mono text-glow-green" style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '10px' }}>
            {confusionMatrix.overallAccuracy}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${confusionMatrix.overallAccuracy}%`, height: '100%', background: '#20d47a', borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9BAFC3', marginTop: '6px' }}>
            2,260 / 2,400 correct classifications
          </div>
        </div>

        {/* Precision */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            WEIGHTED PRECISION
          </div>
          <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#60A5FA', marginTop: '10px' }}>
            {confusionMatrix.precision}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${confusionMatrix.precision}%`, height: '100%', background: '#1677ff', borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9BAFC3', marginTop: '6px' }}>
            Low false-positive rate across streams
          </div>
        </div>

        {/* Recall */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            WEIGHTED RECALL
          </div>
          <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#67F5A6', marginTop: '10px' }}>
            {confusionMatrix.recall}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${confusionMatrix.recall}%`, height: '100%', background: '#67f5a6', borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9BAFC3', marginTop: '6px' }}>
            High sensitivity for contamination capture
          </div>
        </div>

        {/* F1 Score */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            F1-SCORE
          </div>
          <div className="font-mono" style={{ fontSize: '2.5rem', fontWeight: 900, color: '#F5F9FF', marginTop: '10px' }}>
            {confusionMatrix.f1Score}%
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginTop: '12px', overflow: 'hidden' }}>
            <div style={{ width: `${confusionMatrix.f1Score}%`, height: '100%', background: 'linear-gradient(90deg, #1677ff, #20d47a)', borderRadius: '3px' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9BAFC3', marginTop: '6px' }}>
            Harmonic mean of precision and recall
          </div>
        </div>
      </div>

      {/* Confusion Matrix Section */}
      <div className="glass-panel" style={{ padding: '36px', marginBottom: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#F5F9FF' }}>
              Interactive 6×6 Confusion Matrix
            </h3>
            <p style={{ color: '#9BAFC3', fontSize: '0.9rem', marginTop: '2px' }}>
              Evaluated on 400 test images per category (2,400 total test samples). Rows = Ground Truth, Columns = Predicted Class.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: '#9BAFC3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(32, 212, 122, 0.55)', border: '1px solid #20d47a' }} />
              <span>True Positive (Diagonal)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(244, 63, 94, 0.35)' }} />
              <span>Misclassification</span>
            </div>
          </div>
        </div>

        {/* Matrix Table Container */}
        <div style={{ overflowX: 'auto', paddingBottom: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '6px', textAlign: 'center', minWidth: '600px' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', fontSize: '0.8rem', color: '#9BAFC3', textAlign: 'left', fontWeight: 600 }}>
                  Actual \ Pred
                </th>
                {classes.map((c) => (
                  <th key={c} style={{ padding: '10px', fontSize: '0.85rem', color: '#F5F9FF', fontWeight: 700 }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map((actualClass, rowIdx) => (
                <tr key={actualClass}>
                  <td style={{ padding: '10px', fontSize: '0.85rem', color: '#F5F9FF', fontWeight: 700, textAlign: 'left' }}>
                    {actualClass}
                  </td>
                  {classes.map((predClass, colIdx) => {
                    const count = matrix[rowIdx][colIdx];
                    const isDiagonal = rowIdx === colIdx;
                    const pct = ((count / 400) * 100).toFixed(1);

                    return (
                      <td
                        key={predClass}
                        onMouseEnter={() => setHoveredCell({ actual: actualClass, pred: predClass, count, pct, isDiagonal })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          padding: '14px 10px',
                          borderRadius: '10px',
                          background: isDiagonal 
                            ? 'rgba(32, 212, 122, 0.22)' 
                            : count > 0 
                            ? 'rgba(244, 63, 94, 0.12)' 
                            : 'rgba(255, 255, 255, 0.02)',
                          border: isDiagonal 
                            ? '1px solid rgba(32, 212, 122, 0.45)' 
                            : count > 0 
                            ? '1px solid rgba(244, 63, 94, 0.2)' 
                            : '1px solid rgba(255, 255, 255, 0.04)',
                          cursor: 'pointer',
                          transition: 'transform 0.2s ease, border-color 0.2s ease'
                        }}
                      >
                        <div className="font-mono" style={{ fontSize: '1.05rem', fontWeight: 800, color: isDiagonal ? '#20D47A' : count > 5 ? '#f43f5e' : '#cbd5e1' }}>
                          {count}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: isDiagonal ? '#67f5a6' : '#9BAFC3', marginTop: '2px' }}>
                          {pct}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hovered Cell Tooltip Readout */}
        {hoveredCell ? (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 18px',
              borderRadius: '10px',
              background: 'rgba(6, 17, 31, 0.8)',
              border: '1px solid rgba(32, 212, 122, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.88rem'
            }}
          >
            <div>
              Ground Truth: <strong style={{ color: '#F5F9FF' }}>{hoveredCell.actual}</strong> ➔ Predicted As: <strong style={{ color: '#60A5FA' }}>{hoveredCell.pred}</strong>
            </div>
            <div style={{ display: 'flex', gap: '14px' }}>
              <span>Sample Count: <strong className="font-mono" style={{ color: '#20D47A' }}>{hoveredCell.count} items</strong></span>
              <span>Rate: <strong className="font-mono" style={{ color: '#67F5A6' }}>{hoveredCell.pct}%</strong></span>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#9BAFC3', textAlign: 'center' }}>
            Hover any cell above to inspect class confusion details.
          </div>
        )}
      </div>

      {/* Model Metadata & Training Pipeline Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        {/* Architecture Specs */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Layers size={22} color="#1677FF" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
              Neural Architecture Breakdown
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#9BAFC3' }}>Backbone:</span>
              <strong style={{ color: '#F5F9FF' }}>MobileNetV2 (17 Inverted Residual Blocks)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#9BAFC3' }}>Input Resolution:</span>
              <strong className="font-mono" style={{ color: '#20D47A' }}>{MODEL_METADATA.inputShape}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#9BAFC3' }}>Total Parameters:</span>
              <strong className="font-mono" style={{ color: '#F5F9FF' }}>3,418,694</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#9BAFC3' }}>Trainable Head Parameters:</span>
              <strong className="font-mono" style={{ color: '#60A5FA' }}>1,184,774</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ color: '#9BAFC3' }}>Inference Latency:</span>
              <strong className="font-mono text-glow-green">38 ms (CPU Edge / Mobile)</strong>
            </div>
          </div>
        </div>

        {/* Training Strategy */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Activity size={22} color="#20D47A" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
              Two-Stage Transfer Learning Protocol
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#F5F9FF', fontSize: '0.92rem' }}>Stage 1: Head Initialization</strong>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: '#60A5FA' }}>Epochs 1-10</span>
              </div>
              <p style={{ color: '#9BAFC3', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.5 }}>
                MobileNetV2 base weights frozen. Train Global Average Pooling + Dense 128 + Dropout (0.3) head with Adam optimizer (lr = 1e-3).
              </p>
            </div>

            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(32, 212, 122, 0.05)',
                border: '1px solid rgba(32, 212, 122, 0.25)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: '#20D47A', fontSize: '0.92rem' }}>Stage 2: Deep Fine-Tuning</strong>
                <span className="font-mono" style={{ fontSize: '0.8rem', color: '#20D47A' }}>Epochs 11-30</span>
              </div>
              <p style={{ color: '#9BAFC3', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.5 }}>
                Top 32 layers of MobileNetV2 unfrozen. Fine-tuned with reduced learning rate (1e-5) to adapt high-level feature extractors for packaging textures.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
