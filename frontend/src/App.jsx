import React, { useState } from 'react';
import SceneBackground from './components/Background/SceneBackground';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/Landing/LandingPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import AnalyzePage from './pages/Analyze/AnalyzePage';
import PredictionResultView from './pages/Result/PredictionResultView';
import HistoryPage from './pages/History/HistoryPage';
import AnalyticsPage from './pages/Analytics/AnalyticsPage';
import ModelEvaluationPage from './pages/ModelEvaluation/ModelEvaluationPage';
import AdminPage from './pages/Admin/AdminPage';
import AuthModal from './pages/Auth/AuthModal';
import { INITIAL_SCANS } from './data/mockData';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [scans, setScans] = useState(INITIAL_SCANS);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Default demo user session
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex Green',
    email: 'resident@luminagreen.org',
    role: 'USER',
    token: 'jwt_demo_token_1001'
  });

  // Flow handlers
  const handleStartAnalyze = () => {
    setSelectedPreset(null);
    setActivePage('analyze');
  };

  const handleSelectSample = (sample) => {
    setSelectedPreset(sample);
    setActivePage('analyze');
  };

  const handleRunPrediction = (predictionPayload) => {
    setCurrentPrediction(predictionPayload);
    setActivePage('result');
  };

  const handleSaveScan = (newScan) => {
    setScans(prev => [newScan, ...prev]);
  };

  const handleSubmitFeedback = (feedbackPayload) => {
    console.log('Feedback submitted for retraining:', feedbackPayload);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background with Scene-17.mp4 and Particle Overlay */}
      <SceneBackground activePage={activePage} />

      {/* Navigation Bar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Dynamic Viewport */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        {activePage === 'landing' && (
          <LandingPage
            onStartAnalyze={handleStartAnalyze}
            onSelectSample={handleSelectSample}
            setActivePage={setActivePage}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            scans={scans}
            onStartAnalyze={handleStartAnalyze}
            setActivePage={setActivePage}
            currentUser={currentUser}
          />
        )}

        {activePage === 'analyze' && (
          <AnalyzePage
            selectedPreset={selectedPreset}
            onClearPreset={() => setSelectedPreset(null)}
            onRunPrediction={handleRunPrediction}
          />
        )}

        {activePage === 'result' && currentPrediction && (
          <PredictionResultView
            predictionData={currentPrediction}
            onAnalyzeAnother={handleStartAnalyze}
            onSaveScan={handleSaveScan}
            onSubmitFeedback={handleSubmitFeedback}
          />
        )}

        {activePage === 'history' && (
          <HistoryPage scans={scans} />
        )}

        {activePage === 'analytics' && (
          <AnalyticsPage />
        )}

        {activePage === 'model-evaluation' && (
          <ModelEvaluationPage />
        )}

        {activePage === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(6, 17, 31, 0.9)',
          backdropFilter: 'blur(12px)',
          padding: '24px 0',
          marginTop: 'auto'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#9BAFC3' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 700, color: '#F5F9FF' }}>
              Lumina<span style={{ color: '#20D47A' }}>Green</span>
            </span>
            <span>—</span>
            <span>AI-Based Waste Classification and Smart Recycling System</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span>Tagline: <em>See Waste Differently. Recycle Smarter.</em></span>
            <span style={{ color: '#20D47A', fontWeight: 600 }}>MobileNetV2 Transfer Learning</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
