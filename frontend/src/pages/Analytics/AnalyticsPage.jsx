import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  AlertTriangle, 
  Zap, 
  Calendar
} from 'lucide-react';
import { INITIAL_ANALYTICS } from '../../data/mockData';

export default function AnalyticsPage() {
  const { kpi, categoryDistribution, weeklyVolume, commonCorrections } = INITIAL_ANALYTICS;
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            <BarChart3 size={15} />
            <span>Section 21: Sustainability & Model Telemetry</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            Analytics & Environmental Insights
          </h1>
          <p style={{ color: '#9BAFC3', fontSize: '0.95rem', marginTop: '4px' }}>
            Aggregated classification volumes, stream distribution, and retraining correction vectors.
          </p>
        </div>

        {/* Date Scope Badge */}
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: '#F5F9FF'
          }}
        >
          <Calendar size={15} color="#20D47A" />
          <span>Last 12 Weeks (Active Quarter)</span>
        </div>
      </div>

      {/* KPI Cards Row (Section 21 requirements) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        {/* TOTAL SCANS */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            TOTAL SCANS
          </div>
          <div className="font-mono" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#F5F9FF', marginTop: '10px' }}>
            {kpi.totalScans.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#20D47A', marginTop: '8px', fontWeight: 600 }}>
            <TrendingUp size={14} />
            <span>+22.4% vs prev. month</span>
          </div>
        </div>

        {/* RECYCLABLE */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            RECYCLABLE DIVERTED
          </div>
          <div className="font-mono" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#20D47A', marginTop: '10px' }}>
            {kpi.recyclableCount.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9BAFC3', marginTop: '8px' }}>
            <strong style={{ color: '#20D47A' }}>{kpi.recyclablePercentage}%</strong> verified recycling stream
          </div>
        </div>

        {/* AVG CONFIDENCE */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            AVG CONFIDENCE
          </div>
          <div className="font-mono text-glow-green" style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '10px' }}>
            {kpi.avgConfidence}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9BAFC3', marginTop: '8px' }}>
            MobileNetV2 high-certainty benchmark
          </div>
        </div>

        {/* CORRECTIONS */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            CORRECTIONS
          </div>
          <div className="font-mono" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#60A5FA', marginTop: '10px' }}>
            {kpi.correctionsCount}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#9BAFC3', marginTop: '8px' }}>
            Low error rate: <strong style={{ color: '#60A5FA' }}>{kpi.correctionRate}%</strong>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px', marginBottom: '36px' }}>
        {/* Chart 1: Waste Category Distribution (Doughnut / Progress Bars) */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Waste Category Distribution
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Percentage of classified municipal items across 6 material streams
              </p>
            </div>
            <PieChart size={20} color="#20D47A" />
          </div>

          {/* Interactive Visual Distribution Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {categoryDistribution.map((item) => (
              <div
                key={item.name}
                onMouseEnter={() => setHoveredCategory(item.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: hoveredCategory === item.name ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                  transition: 'background 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#F5F9FF' }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.82rem', color: '#9BAFC3' }}>{item.count} items</span>
                    <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 700, color: item.color }}>
                      {item.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${item.percentage}%`,
                      height: '100%',
                      background: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.8s ease'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Prediction Volume Timeline (12-Week progression) */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Prediction Volume Progression
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Weekly scan adoption and recyclable diversion trends
              </p>
            </div>
            <TrendingUp size={20} color="#1677FF" />
          </div>

          {/* SVG Bar Chart for weekly volume */}
          <div style={{ width: '100%', height: '220px', marginTop: '10px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
              {/* Grid lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="180" x2="500" y2="180" stroke="rgba(255,255,255,0.15)" />

              {/* Bars for 12 weeks */}
              {weeklyVolume.map((w, idx) => {
                const x = 20 + idx * 40;
                const totalHeight = (w.scans / 200) * 140;
                const recHeight = (w.recyclable / 200) * 140;
                const yTotal = 180 - totalHeight;
                const yRec = 180 - recHeight;

                return (
                  <g key={w.week}>
                    {/* Background total scans bar */}
                    <rect
                      x={x}
                      y={yTotal}
                      width="18"
                      height={totalHeight}
                      rx="3"
                      fill="rgba(22, 119, 255, 0.3)"
                    />
                    {/* Foreground recyclable bar */}
                    <rect
                      x={x}
                      y={yRec}
                      width="18"
                      height={recHeight}
                      rx="3"
                      fill="#20d47a"
                    />
                    {/* Week label */}
                    <text
                      x={x + 9}
                      y="195"
                      fill="#9BAFC3"
                      fontSize="9"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                    >
                      {w.week}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '0.8rem', color: '#9BAFC3' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#20d47a' }} />
              <span>Recyclable Scans</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(22, 119, 255, 0.4)' }} />
              <span>Total Classification Volume</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Confidence Trend & Common Correction Frequency */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px' }}>
        {/* Chart 3: Confidence Trend (Line Chart) */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Confidence Trajectory
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Evolution of mean classification confidence through transfer learning fine-tuning
              </p>
            </div>
            <Zap size={20} color="#67F5A6" />
          </div>

          <div style={{ width: '100%', height: '190px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 500 170" preserveAspectRatio="none">
              <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="rgba(255,255,255,0.06)" strokeDasharray="4" />

              {/* Area gradient under line */}
              <defs>
                <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#20d47a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#20d47a" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Path area */}
              <polygon
                points="20,130 90,105 160,82 230,65 300,48 370,42 440,36 440,150 20,150"
                fill="url(#confGrad)"
              />

              {/* Trend Polyline */}
              <polyline
                points="20,130 90,105 160,82 230,65 300,48 370,42 440,36"
                fill="none"
                stroke="#20d47a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {[
                { x: 20, y: 130, val: '82.4%' },
                { x: 90, y: 105, val: '86.1%' },
                { x: 160, y: 82, val: '89.3%' },
                { x: 230, y: 65, val: '91.5%' },
                { x: 300, y: 48, val: '93.4%' },
                { x: 370, y: 42, val: '94.1%' },
                { x: 440, y: 36, val: '94.7%' }
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.x} cy={pt.y} r="5" fill="#06111f" stroke="#20d47a" strokeWidth="2.5" />
                  <text x={pt.x} y={pt.y - 10} fill="#67f5a6" fontSize="9" fontWeight="700" textAnchor="middle">
                    {pt.val}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#9BAFC3', marginTop: '12px' }}>
            <span>Baseline (Untrained Head)</span>
            <span>Unfreeze Top 32 Layers</span>
            <span style={{ color: '#20D47A', fontWeight: 700 }}>Final Converged v1.0</span>
          </div>
        </div>

        {/* Chart 4: Common User Corrections Frequency */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Correction Frequency Matrix
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Feedback instances submitted by users to retrain edge cases
              </p>
            </div>
            <AlertTriangle size={20} color="#F59E0B" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {commonCorrections.map((corr, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(6, 17, 31, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: '#F5F9FF' }}>
                    <span style={{ color: '#f43f5e' }}>{corr.from}</span>
                    <span style={{ color: '#9BAFC3' }}>➔</span>
                    <span style={{ color: '#20d47a' }}>{corr.to}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9BAFC3', marginTop: '3px' }}>
                    Reason: {corr.reason}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f59e0b' }}>
                    {corr.count} scans
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
