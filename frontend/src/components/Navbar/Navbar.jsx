import React from 'react';
import { 
  Scan, 
  LayoutDashboard, 
  History, 
  BarChart3, 
  Cpu, 
  ShieldCheck, 
  User, 
  LogOut, 
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  activePage, 
  setActivePage, 
  currentUser, 
  setCurrentUser, 
  onOpenAuth 
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(6, 17, 31, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '12px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo with Leaf + Neural Network Icon */}
        <div 
          onClick={() => setActivePage('landing')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          {/* Custom SVG Icon: Leaf contour + AI neural network nodes */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(22, 119, 255, 0.2) 0%, rgba(32, 212, 122, 0.25) 100%)',
              border: '1px solid rgba(32, 212, 122, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(32, 212, 122, 0.25)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {/* Outer leaf node structure */}
              <path
                d="M12 3C7 3 4 8 4 13C4 18 8 21 12 21C16 21 20 18 20 13C20 8 17 3 12 3Z"
                stroke="#20d47a"
                strokeWidth="1.6"
                strokeOpacity="0.8"
              />
              {/* Central stem / data bus */}
              <line x1="12" y1="3" x2="12" y2="21" stroke="#20d47a" strokeWidth="1.4" />
              {/* Neural connection lines */}
              <line x1="12" y1="9" x2="7.5" y2="13" stroke="#1677ff" strokeWidth="1.2" />
              <line x1="12" y1="9" x2="16.5" y2="13" stroke="#1677ff" strokeWidth="1.2" />
              <line x1="12" y1="15" x2="8" y2="17" stroke="#67f5a6" strokeWidth="1.2" />
              <line x1="12" y1="15" x2="16" y2="17" stroke="#67f5a6" strokeWidth="1.2" />
              {/* Apex Node */}
              <circle cx="12" cy="5" r="2" fill="#20d47a" />
              {/* Neural Nodes */}
              <circle cx="7.5" cy="13" r="2" fill="#1677ff" />
              <circle cx="16.5" cy="13" r="2" fill="#1677ff" />
              <circle cx="12" cy="12" r="2.2" fill="#67f5a6" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              <span style={{ color: '#F5F9FF' }}>Lumina</span>
              <span style={{ color: '#20D47A', textShadow: '0 0 12px rgba(32, 212, 122, 0.6)' }}>Green</span>
            </div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', color: '#9BAFC3', fontWeight: 600, textTransform: 'uppercase' }}>
              Waste Intelligence
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setActivePage('landing')}
            className={`btn btn-sm ${activePage === 'landing' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ borderRadius: '10px' }}
          >
            Home
          </button>

          <button
            onClick={() => setActivePage('analyze')}
            className="btn btn-sm"
            style={{
              background: activePage === 'analyze' 
                ? 'linear-gradient(135deg, #20d47a, #1677ff)' 
                : 'rgba(32, 212, 122, 0.15)',
              color: activePage === 'analyze' ? '#04120a' : '#20d47a',
              border: '1px solid rgba(32, 212, 122, 0.35)',
              fontWeight: 700,
              boxShadow: activePage === 'analyze' ? '0 0 15px rgba(32, 212, 122, 0.4)' : 'none',
              borderRadius: '10px'
            }}
          >
            <Scan size={15} />
            Analyze Waste
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#20d47a',
              boxShadow: '0 0 8px #20d47a'
            }} />
          </button>

          <button
            onClick={() => setActivePage('dashboard')}
            className={`btn btn-sm ${activePage === 'dashboard' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ borderRadius: '10px' }}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>

          <button
            onClick={() => setActivePage('history')}
            className={`btn btn-sm ${activePage === 'history' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ borderRadius: '10px' }}
          >
            <History size={15} />
            History
          </button>

          <button
            onClick={() => setActivePage('analytics')}
            className={`btn btn-sm ${activePage === 'analytics' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ borderRadius: '10px' }}
          >
            <BarChart3 size={15} />
            Analytics
          </button>

          <button
            onClick={() => setActivePage('model-evaluation')}
            className={`btn btn-sm ${activePage === 'model-evaluation' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ borderRadius: '10px' }}
          >
            <Cpu size={15} />
            AI Model
          </button>

          {/* Admin Tab (visible for all or highlighted for Waste Manager / Admin) */}
          <button
            onClick={() => setActivePage('admin')}
            className={`btn btn-sm ${activePage === 'admin' ? 'btn-outline' : 'btn-ghost'}`}
            style={{ 
              borderRadius: '10px',
              color: activePage === 'admin' ? '#F5F9FF' : '#9BAFC3'
            }}
          >
            <ShieldCheck size={15} />
            Admin
          </button>
        </nav>

        {/* User Status / Role Pill & Auth Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Role badge */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(12, 24, 43, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '30px',
                  padding: '4px 12px 4px 6px',
                  cursor: 'pointer'
                }}
                onClick={onOpenAuth}
                title="Click to switch role or account"
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: currentUser.role === 'ADMIN' 
                      ? 'linear-gradient(135deg, #1677ff, #8b5cf6)'
                      : currentUser.role === 'WASTE MANAGER'
                      ? 'linear-gradient(135deg, #20d47a, #1677ff)'
                      : 'linear-gradient(135deg, #20d47a, #06b6d4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}
                >
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F5F9FF' }}>
                    {currentUser.name}
                  </span>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    color: currentUser.role === 'ADMIN' ? '#60a5fa' : currentUser.role === 'WASTE MANAGER' ? '#20d47a' : '#9bafc3',
                    textTransform: 'uppercase'
                  }}>
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: '#9bafc3' }} />
              </div>

              <button
                onClick={() => setCurrentUser(null)}
                className="btn btn-ghost btn-sm"
                title="Sign Out"
                style={{ padding: '8px' }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={onOpenAuth}
                className="btn btn-primary btn-sm"
              >
                <User size={15} />
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
