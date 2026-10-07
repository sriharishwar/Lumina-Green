import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Save, 
  Check, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { WASTE_CATEGORIES, AUDIT_LOGS } from '../../data/mockData';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('categories');
  const [categories, setCategories] = useState(WASTE_CATEGORIES);
  const [selectedCatForEdit, setSelectedCatForEdit] = useState(categories[0]);
  const [editGuidance, setEditGuidance] = useState(categories[0].guidance);
  const [editPolicy, setEditPolicy] = useState(categories[0].localPolicy);
  const [editStatus, setEditStatus] = useState(categories[0].status);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Toggle category active state
  const handleToggleCategory = (id) => {
    setCategories(prev =>
      prev.map(c => c.id === id ? { ...c, isActive: c.isActive === false ? true : false } : c)
    );
  };

  const handleSelectCategory = (cat) => {
    setSelectedCatForEdit(cat);
    setEditGuidance(cat.guidance);
    setEditPolicy(cat.localPolicy);
    setEditStatus(cat.status);
    setSaveSuccess(false);
  };

  const handleSaveGuidance = (e) => {
    e.preventDefault();
    setCategories(prev =>
      prev.map(c =>
        c.id === selectedCatForEdit.id
          ? { ...c, guidance: editGuidance, localPolicy: editPolicy, status: editStatus }
          : c
      )
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="container" style={{ position: 'relative', zIndex: 1, padding: '40px 0 90px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#20D47A', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
            <ShieldCheck size={15} />
            <span>Section 23: Governance & Administration</span>
          </div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5F9FF' }}>
            LuminaGreen Admin Portal
          </h1>
          <p style={{ color: '#9BAFC3', fontSize: '0.95rem', marginTop: '4px' }}>
            Manage category streams, municipal recycling guidance, model versioning, and compliance audit logs.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(6, 17, 31, 0.7)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <button
            onClick={() => setActiveTab('categories')}
            className={`btn btn-sm ${activeTab === 'categories' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('guidance')}
            className={`btn btn-sm ${activeTab === 'guidance' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            Guidance Editor
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`btn btn-sm ${activeTab === 'models' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            Model Versions
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '8px' }}
          >
            Audit Logs
          </button>
        </div>
      </div>

      {/* Tab 1: Category Management */}
      {activeTab === 'categories' && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Active Waste Streams & Categories
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Toggle materials accepted by local processing plants and MRFs.
              </p>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ borderRadius: '8px' }}>
              <Plus size={15} /> Add Custom Stream
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categories.map((cat) => {
              const isActive = cat.isActive !== false;
              return (
                <div
                  key={cat.id}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '12px',
                    background: 'rgba(6, 17, 31, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '1.8rem' }}>{cat.iconEmoji}</span>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F5F9FF' }}>
                        {cat.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#9BAFC3', marginTop: '2px' }}>
                        Target: <strong style={{ color: cat.binColor }}>{cat.binName}</strong> • {cat.status}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span className={`badge ${cat.badgeType}`}>
                      {cat.status}
                    </span>

                    <button
                      onClick={() => handleToggleCategory(cat.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ color: isActive ? '#20d47a' : '#94a3b8' }}
                    >
                      {isActive ? (
                        <>
                          <Check size={16} /> Active Stream
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} /> Suspended
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Guidance Management */}
      {activeTab === 'guidance' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '28px' }}>
          {/* Left: Category list selector */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5F9FF', marginBottom: '16px' }}>
              Select Stream to Configure
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: selectedCatForEdit.id === cat.id ? 'rgba(32, 212, 122, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedCatForEdit.id === cat.id ? '1px solid #20d47a' : '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <span>{cat.iconEmoji}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: selectedCatForEdit.id === cat.id ? '#20D47A' : '#F5F9FF' }}>
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Guidance Form Editor */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.8rem' }}>{selectedCatForEdit.iconEmoji}</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5F9FF' }}>
                  Edit Rules for {selectedCatForEdit.name}
                </h3>
              </div>

              {saveSuccess && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#20D47A', fontSize: '0.85rem', fontWeight: 700 }}>
                  <Check size={16} /> Saved Successfully
                </div>
              )}
            </div>

            <form onSubmit={handleSaveGuidance} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600, marginBottom: '6px' }}>
                  Recyclability Classification Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Recyclable">Recyclable</option>
                  <option value="Compostable">Compostable</option>
                  <option value="Landfill / Recovery">Landfill / Non-Recyclable</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600, marginBottom: '6px' }}>
                  Citizen Preparation Instructions
                </label>
                <textarea
                  rows={4}
                  value={editGuidance}
                  onChange={(e) => setEditGuidance(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9BAFC3', fontWeight: 600, marginBottom: '6px' }}>
                  Local Municipal Policy Clause
                </label>
                <textarea
                  rows={3}
                  value={editPolicy}
                  onChange={(e) => setEditPolicy(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'inherit',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 28px', marginTop: '6px' }}>
                <Save size={16} />
                Save Policy Guidance
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Model Versions */}
      {activeTab === 'models' && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF' }}>
                Model Version Registry
              </h3>
              <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '2px' }}>
                Deploy, evaluate, and rollback transfer learning checkpoints.
              </p>
            </div>
            <button className="btn btn-primary btn-sm" style={{ borderRadius: '8px' }}>
              <Cpu size={15} /> Trigger Retraining Pipeline
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Version 1.0 (Active) */}
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(32, 212, 122, 0.08)',
                border: '1px solid rgba(32, 212, 122, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F5F9FF' }}>MobileNetV2 WasteNet v1.0</span>
                  <span className="badge badge-recyclable" style={{ fontSize: '0.72rem' }}>ACTIVE PRODUCTION</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#9BAFC3', marginTop: '4px' }}>
                  Accuracy: <strong style={{ color: '#20D47A' }}>94.2%</strong> • Latency: <strong>38ms</strong> • Deployed Oct 2026
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-outline btn-sm" disabled>Current Engine</button>
              </div>
            </div>

            {/* Version 1.1 (Staging / Candidate) */}
            <div
              style={{
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(6, 17, 31, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#F5F9FF' }}>EfficientNet-B0 Hybrid v1.1</span>
                  <span className="badge badge-blue" style={{ fontSize: '0.72rem' }}>CANDIDATE</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#9BAFC3', marginTop: '4px' }}>
                  Accuracy: <strong style={{ color: '#60A5FA' }}>95.1%</strong> • Latency: <strong>52ms</strong> • Tested with 47 user feedback samples
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn btn-secondary btn-sm">Deploy to Production</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F5F9FF', marginBottom: '20px' }}>
            System Audit & Compliance Logs
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {AUDIT_LOGS.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '12px 18px',
                  borderRadius: '10px',
                  background: 'rgba(6, 17, 31, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span className="font-mono" style={{ color: '#20D47A', fontSize: '0.78rem' }}>
                    {log.id}
                  </span>
                  <div>
                    <strong style={{ color: '#F5F9FF' }}>{log.action}</strong>: {log.detail}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#9BAFC3' }}>
                  <span>{log.user}</span>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
