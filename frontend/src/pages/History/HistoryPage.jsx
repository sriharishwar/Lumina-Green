import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Cpu
} from 'lucide-react';

export default function HistoryPage({ scans = [], onSelectScanForReview: _onSelectScanForReview }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [selectedScanDetail, setSelectedScanDetail] = useState(null);

  // Filter scans
  const filteredScans = scans.filter((scan) => {
    const matchesSearch = 
      scan.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scan.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'RECYCLABLE') return scan.isRecyclable;
    if (selectedFilter === 'CORRECTED') return scan.feedback === 'corrected_by_user';
    return scan.categoryId === selectedFilter.toLowerCase();
  });

  const exportCSV = () => {
    const headers = ['ID,Item,Category,Confidence,Recyclable,Date,Model,Status\n'];
    const rows = filteredScans.map(s => 
      `"${s.id}","${s.itemTitle}","${s.category}",${s.confidence}%,${s.isRecyclable},"${s.date}","${s.modelVersion}","${s.feedback}"`
    );
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luminagreen_scans_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            <History size={15} />
            <span>Telemetry & Archive</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            Prediction History
          </h1>
          <p style={{ color: '#9BAFC3', fontSize: '0.95rem', marginTop: '4px' }}>
            Historical waste classification scans, verification status, and audit logs.
          </p>
        </div>

        <button onClick={exportCSV} className="btn btn-secondary btn-sm" style={{ borderRadius: '10px' }}>
          <Download size={15} />
          Export CSV Log
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          marginBottom: '26px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        {/* Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(6, 17, 31, 0.7)', padding: '10px 16px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)', flex: '1', minWidth: '240px' }}>
          <Search size={16} color="#9BAFC3" />
          <input
            type="text"
            placeholder="Search by item name, material, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#F5F9FF',
              fontSize: '0.9rem',
              width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['ALL', 'RECYCLABLE', 'plastic', 'paper', 'glass', 'metal', 'organic', 'CORRECTED'].map((chip) => (
            <button
              key={chip}
              onClick={() => setSelectedFilter(chip)}
              className="btn btn-ghost btn-sm"
              style={{
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: selectedFilter === chip ? 'rgba(32, 212, 122, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedFilter === chip ? '1px solid #20d47a' : '1px solid rgba(255, 255, 255, 0.06)',
                color: selectedFilter === chip ? '#20D47A' : '#9BAFC3'
              }}
            >
              {chip === 'plastic' ? '🧴 Plastic' : chip === 'paper' ? '📄 Paper' : chip === 'glass' ? '🥛 Glass' : chip === 'metal' ? '🔩 Metal' : chip === 'organic' ? '🌱 Organic' : chip}
            </button>
          ))}
        </div>
      </div>

      {/* Scans List / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredScans.length === 0 ? (
          <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', color: '#9BAFC3' }}>
            <History size={40} style={{ margin: '0 auto 14px auto', opacity: 0.4 }} />
            <h4 style={{ fontSize: '1.2rem', color: '#F5F9FF' }}>No classification scans found</h4>
            <p style={{ fontSize: '0.9rem', marginTop: '6px' }}>Try adjusting your search criteria or filter tags.</p>
          </div>
        ) : (
          filteredScans.map((scan) => (
            <div
              key={scan.id}
              onClick={() => setSelectedScanDetail(scan)}
              className="glass-panel interactive-card"
              style={{
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                gap: '20px',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                {/* Thumbnail */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={scan.imageUrl}
                    alt={scan.category}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F9FF' }}>
                      {scan.itemTitle}
                    </h3>
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: '#9BAFC3' }}>
                      #{scan.id}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: '#9BAFC3', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {scan.timestamp}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Cpu size={12} /> {scan.modelVersion}
                    </span>
                    <span>•</span>
                    <span style={{ color: '#20D47A' }}>+{scan.co2Offset || 0.18} kg CO₂</span>
                  </div>
                </div>
              </div>

              {/* Badges & Confidence meter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div className="font-mono" style={{ fontSize: '1rem', fontWeight: 700, color: scan.confidence < 70 ? '#f59e0b' : '#20d47a' }}>
                    {scan.confidence}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#9BAFC3', textTransform: 'uppercase' }}>
                    Confidence
                  </div>
                </div>

                <span
                  className={`badge ${scan.isRecyclable ? 'badge-recyclable' : scan.categoryId === 'organic' ? 'badge-organic' : 'badge-general'}`}
                  style={{ minWidth: '100px', justifyContent: 'center' }}
                >
                  {scan.category}
                </span>

                <div style={{ width: '28px', display: 'flex', justifyContent: 'center' }}>
                  {scan.feedback === 'verified_correct' ? (
                    <CheckCircle size={18} color="#20D47A" title="Verified Correct" />
                  ) : scan.feedback === 'corrected_by_user' ? (
                    <AlertCircle size={18} color="#f59e0b" title="User Corrected" />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>—</span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {selectedScanDetail && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(3, 8, 15, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedScanDetail(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '640px',
              width: '100%',
              padding: '32px',
              border: '1px solid rgba(32, 212, 122, 0.4)',
              background: '#0a172a'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="font-mono" style={{ color: '#20D47A', fontWeight: 800 }}>
                  #{selectedScanDetail.id}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5F9FF' }}>
                  {selectedScanDetail.itemTitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedScanDetail(null)}
                className="btn btn-ghost btn-sm"
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '24px', marginBottom: '24px' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '14px', overflow: 'hidden', background: '#030a13' }}>
                <img
                  src={selectedScanDetail.imageUrl}
                  alt={selectedScanDetail.category}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div>Classified Category: <strong style={{ color: '#F5F9FF' }}>{selectedScanDetail.category}</strong></div>
                <div>Confidence Score: <strong className="font-mono text-glow-green">{selectedScanDetail.confidence}%</strong></div>
                <div>Status: <span className={`badge ${selectedScanDetail.isRecyclable ? 'badge-recyclable' : 'badge-general'}`}>{selectedScanDetail.isRecyclable ? 'RECYCLABLE' : 'NON-RECYCLABLE'}</span></div>
                <div>Model Checkpoint: <strong style={{ color: '#60a5fa' }}>{selectedScanDetail.modelVersion}</strong></div>
                <div>Timestamp: <span style={{ color: '#9BAFC3' }}>{selectedScanDetail.timestamp}</span></div>
                <div>CO₂ Prevented: <strong style={{ color: '#20D47A' }}>~{selectedScanDetail.co2Offset || 0.2} kg CO₂</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setSelectedScanDetail(null)}
                className="btn btn-primary btn-sm"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
