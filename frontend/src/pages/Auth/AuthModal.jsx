import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'forgot') {
      setResetSent(true);
      return;
    }

    const userData = {
      name: name || (authMode === 'login' ? email.split('@')[0] : 'Citizen User'),
      email: email || 'citizen@luminagreen.org',
      role: role,
      token: `jwt_session_${Date.now()}`
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handleQuickDemo = (demoRole, demoName, demoEmail) => {
    onLoginSuccess({
      name: demoName,
      email: demoEmail,
      role: demoRole,
      token: `jwt_demo_${Date.now()}`
    });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(3, 8, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '36px',
          border: '1px solid rgba(32, 212, 122, 0.35)',
          background: 'linear-gradient(180deg, #0a172a 0%, #06111f 100%)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(32, 212, 122, 0.2)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', top: 18, right: 18, padding: '6px' }}
        >
          <X size={18} />
        </button>

        {/* Modal Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'rgba(32, 212, 122, 0.15)',
              border: '1px solid rgba(32, 212, 122, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
              color: '#20d47a'
            }}
          >
            <ShieldCheck size={24} />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5F9FF' }}>
            {authMode === 'login' ? 'Sign In to LuminaGreen' : authMode === 'register' ? 'Create LuminaGreen Account' : 'Reset Password'}
          </h2>
          <p style={{ color: '#9BAFC3', fontSize: '0.85rem', marginTop: '4px' }}>
            {authMode === 'login'
              ? 'Access real-time AI classification and tracking'
              : authMode === 'register'
              ? 'Join the municipal waste intelligence network'
              : 'Enter your email to receive recovery instructions'}
          </p>
        </div>

        {/* 1-Click Demo Profiles for Rapid Testing */}
        <div style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9BAFC3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', textAlign: 'center' }}>
            ⚡ 1-Click Demo Roles
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <button
              onClick={() => handleQuickDemo('USER', 'Alex Green', 'resident@luminagreen.org')}
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                fontSize: '0.72rem',
                flexDirection: 'column',
                padding: '8px 4px',
                gap: '2px'
              }}
            >
              <strong style={{ color: '#F5F9FF' }}>Resident</strong>
              <span style={{ color: '#9BAFC3', fontSize: '0.65rem' }}>USER</span>
            </button>

            <button
              onClick={() => handleQuickDemo('WASTE MANAGER', 'Marcus Vance', 'manager@mrffacility.org')}
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(32, 212, 122, 0.1)',
                border: '1px solid rgba(32, 212, 122, 0.3)',
                borderRadius: '8px',
                fontSize: '0.72rem',
                flexDirection: 'column',
                padding: '8px 4px',
                gap: '2px'
              }}
            >
              <strong style={{ color: '#20D47A' }}>Supervisor</strong>
              <span style={{ color: '#67F5A6', fontSize: '0.65rem' }}>MANAGER</span>
            </button>

            <button
              onClick={() => handleQuickDemo('ADMIN', 'Dr. Evelyn Chen', 'admin@luminagreen.org')}
              className="btn btn-ghost btn-sm"
              style={{
                background: 'rgba(22, 119, 255, 0.12)',
                border: '1px solid rgba(22, 119, 255, 0.35)',
                borderRadius: '8px',
                fontSize: '0.72rem',
                flexDirection: 'column',
                padding: '8px 4px',
                gap: '2px'
              }}
            >
              <strong style={{ color: '#60A5FA' }}>Admin</strong>
              <span style={{ color: '#93C5FD', fontSize: '0.65rem' }}>ADMIN</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '14px 0', color: '#64748b', fontSize: '0.75rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          <span>OR CONTINUE WITH CREDENTIALS</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {authMode === 'register' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#9BAFC3', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#9BAFC3' }} />
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Lin"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: '#9BAFC3', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#9BAFC3' }} />
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '8px',
                  background: '#040d18',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#F5F9FF',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: '#9BAFC3' }}>Password</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    style={{ background: 'none', border: 'none', color: '#20d47a', fontSize: '0.75rem', cursor: 'pointer' }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#9BAFC3' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            </div>
          )}

          {authMode === 'register' && (
            <>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#9BAFC3', marginBottom: '6px' }}>Confirm Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={16} style={{ position: 'absolute', top: 12, left: 12, color: '#9BAFC3' }} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: '8px',
                      background: '#040d18',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F5F9FF',
                      outline: 'none',
                      fontSize: '0.9rem'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#9BAFC3', marginBottom: '6px' }}>Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: '#040d18',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#F5F9FF',
                    outline: 'none',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="USER">Resident / User</option>
                  <option value="WASTE MANAGER">Waste Manager / Facility Operator</option>
                  <option value="ADMIN">System Administrator</option>
                </select>
              </div>
            </>
          )}

          {resetSent && (
            <div style={{ color: '#20D47A', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle size={16} /> Password reset instructions dispatched to your email.
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', marginTop: '6px' }}
          >
            {authMode === 'login' ? 'Sign In' : authMode === 'register' ? 'Create LuminaGreen Account' : 'Send Reset Link'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Bottom Switcher */}
        <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '0.82rem', color: '#9BAFC3' }}>
          {authMode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                onClick={() => setAuthMode('register')}
                style={{ background: 'none', border: 'none', color: '#20d47a', fontWeight: 700, cursor: 'pointer' }}
              >
                Create Account
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => { setAuthMode('login'); setResetSent(false); }}
                style={{ background: 'none', border: 'none', color: '#20d47a', fontWeight: 700, cursor: 'pointer' }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
