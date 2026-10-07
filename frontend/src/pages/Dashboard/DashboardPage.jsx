import React from 'react';
import { 
  Scan, 
  Sparkles, 
  Recycle, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowRight,
  Clock, 
  Leaf, 
  BarChart2, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { WASTE_CATEGORIES } from '../../data/mockData';

export default function DashboardPage({ 
  scans = [], 
  onStartAnalyze, 
  setActivePage, 
  currentUser 
}) {
  // Compute user metrics or use initial benchmarks
  const totalScans = scans.length > 0 ? scans.length : 128;
  const recyclableScans = scans.filter(s => s.isRecyclable).length || 84;
  const recyclablePct = Math.round((recyclableScans / totalScans) * 100);
  const avgConfidence = '93.4%';
  const carbonSavedKg = (scans.reduce((acc, s) => acc + (s.co2Offset || 0.2), 0) + 42.6).toFixed(1);

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Welcome Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '32px 36px',
          marginBottom: '32px',
          border: '1px solid rgba(32, 212, 122, 0.3)',
          background: 'linear-gradient(135deg, rgba(12, 24, 43, 0.85) 0%, rgba(6, 17, 31, 0.95) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px'
        }}
      >
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            <Sparkles size={15} />
            <span>Operational Center</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5F9FF' }}>
            Welcome back, {currentUser?.name || 'Sustainable Citizen'}
          </h1>
          <p style={{ color: '#9BAFC3', fontSize: '1rem', marginTop: '4px' }}>
            Let's make municipal waste smarter and eliminate recycling contamination.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={onStartAnalyze}
            className="btn btn-primary"
            style={{ padding: '14px 28px', fontSize: '1rem', borderRadius: '14px' }}
          >
            <Scan size={18} />
            New Waste Scan
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '36px'
        }}
      >
        {/* KPI 1: Total Scans */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600 }}>Total Scans</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(22, 119, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60a5fa' }}>
              <Scan size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            {totalScans}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#20D47A', marginTop: '6px', fontWeight: 600 }}>
            <TrendingUp size={14} />
            <span>+14.2% this week</span>
          </div>
        </div>

        {/* KPI 2: Recyclable Items */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600 }}>Recyclable Items</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(32, 212, 122, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#20d47a' }}>
              <Recycle size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#20D47A' }}>
            {recyclableScans}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9BAFC3', marginTop: '6px' }}>
            <strong style={{ color: '#20D47A' }}>{recyclablePct}%</strong> diversion rate
          </div>
        </div>

        {/* KPI 3: Avg Model Confidence */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600 }}>Avg AI Confidence</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(103, 245, 166, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#67f5a6' }}>
              <Zap size={18} />
            </div>
          </div>
          <div className="font-mono text-glow-green" style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            {avgConfidence}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9BAFC3', marginTop: '6px' }}>
            MobileNetV2 high-certainty benchmark
          </div>
        </div>

        {/* KPI 4: Carbon Offset */}
        <div className="glass-panel interactive-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600 }}>Estimated CO₂ Saved</span>
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(32, 212, 122, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#20d47a' }}>
              <Leaf size={18} />
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            {carbonSavedKg} <span style={{ fontSize: '1.1rem', color: '#9BAFC3' }}>kg</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#9BAFC3', marginTop: '6px' }}>
            Equivalent to ~1.8 tree-seedling months
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Predictions & Stream Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
        {/* Recent Predictions Table */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Recent Predictions
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Verified classifications & model confidence scores
              </p>
            </div>
            <button
              onClick={() => setActivePage('history')}
              className="btn btn-ghost btn-sm"
              style={{ color: '#20D47A' }}
            >
              View All History <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {scans.slice(0, 5).map((scan) => (
              <div
                key={scan.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: 'rgba(6, 17, 31, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      background: '#030911',
                      flexShrink: 0,
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <img
                      src={scan.imageUrl}
                      alt={scan.category}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F5F9FF' }}>
                      {scan.itemTitle}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#9BAFC3', marginTop: '2px' }}>
                      <Clock size={12} />
                      <span>{scan.timestamp}</span>
                      <span>•</span>
                      <span>{scan.modelVersion}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  {/* Confidence Bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100px' }}>
                    <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 700, color: scan.confidence < 70 ? '#f59e0b' : '#20d47a' }}>
                      {scan.confidence}%
                    </span>
                    <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden', marginTop: '4px' }}>
                      <div
                        style={{
                          width: `${scan.confidence}%`,
                          height: '100%',
                          background: scan.confidence < 70 ? '#f59e0b' : '#20d47a',
                          borderRadius: '2px'
                        }}
                      />
                    </div>
                  </div>

                  <span
                    className={`badge ${scan.isRecyclable ? 'badge-recyclable' : scan.categoryId === 'organic' ? 'badge-organic' : 'badge-general'}`}
                    style={{ fontSize: '0.72rem' }}
                  >
                    {scan.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Waste Categories & Local Policy Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Categories mini list */}
          <div className="glass-panel" style={{ padding: '26px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#F5F9FF', marginBottom: '16px' }}>
              Waste Stream Reference
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {WASTE_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    fontSize: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{cat.iconEmoji}</span>
                    <span style={{ color: '#F5F9FF', fontWeight: 600 }}>{cat.name}</span>
                  </div>
                  <span style={{ color: cat.binColor, fontSize: '0.75rem', fontWeight: 700 }}>
                    {cat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Retraining Health Card */}
          <div
            className="glass-panel"
            style={{
              padding: '26px',
              border: '1px solid rgba(22, 119, 255, 0.25)',
              background: 'linear-gradient(135deg, rgba(10, 23, 42, 0.8) 0%, rgba(6, 17, 31, 0.9) 100%)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
              <ShieldCheck size={16} />
              <span>Model Health & Policy</span>
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5F9FF', marginTop: '6px' }}>
              Municipal Directive 2026-B
            </h4>
            <p style={{ color: '#9BAFC3', fontSize: '0.82rem', marginTop: '6px', lineHeight: 1.5 }}>
              Active zero-waste municipal rules are synchronized. Next scheduled MobileNetV2 fine-tune: Sunday 03:00 UTC.
            </p>

            <button
              onClick={() => setActivePage('analytics')}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '16px', borderRadius: '10px' }}
            >
              <BarChart2 size={14} />
              Open Full Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
