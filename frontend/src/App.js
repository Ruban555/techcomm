import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Messaging from './components/Messaging';
import CreateCommunity from './components/CreateCommunity';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Community from './pages/Community';
import News from './pages/News';
import About from './pages/About';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [communities, setCommunities] = useState([]);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    if (storedUser && authService.isAuthenticated()) {
      setUser(storedUser);
      setCurrentPage('home');
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (message) => {
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
    setCurrentPage('home');
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleSignupSuccess = (message) => {
    const storedUser = authService.getStoredUser();
    setUser(storedUser);
    setCurrentPage('home');
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage('home');
    setSuccessMessage('You have been logged out');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleNavigate = (page) => {
    if (page === 'login' && user) {
      return;
    }
    setCurrentPage(page);
  };

  const handleCommunityCreated = (newCommunity) => {
    setCommunities([...communities, newCommunity]);
    setSuccessMessage(`Community "${newCommunity.name}" created successfully!`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  if (loading) {
    return <div className="app"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="app">
      <Header 
        user={user} 
        onNavigate={handleNavigate}
        currentPage={currentPage}
        onLogout={handleLogout}
        onOpenMessaging={() => setIsMessagingOpen(true)}
        onOpenCreateCommunity={() => setIsCreateCommunityOpen(true)}
        unreadMessages={unreadMessages}
      />

      <Messaging 
        isOpen={isMessagingOpen}
        onClose={() => {
          setIsMessagingOpen(false);
          setUnreadMessages(0);
        }}
        user={user}
      />

      <CreateCommunity 
        isOpen={isCreateCommunityOpen}
        onClose={() => setIsCreateCommunityOpen(false)}
        onCommunityCreated={handleCommunityCreated}
      />

      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}

      <main className="app-content">
        {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
        
        {currentPage === 'community' && <Community communities={communities} />}
        
        {currentPage === 'news' && <News />}
        
        {currentPage === 'about' && <About />}

        {currentPage === 'login' && !user && (
          <div className="auth-container">
            <LoginForm onSuccess={handleLoginSuccess} />
            <div className="auth-toggle">
              <p>Don't have an account? <button onClick={() => handleNavigate('signup')}>Sign Up</button></p>
            </div>
          </div>
        )}

        {currentPage === 'signup' && !user && (
          <div className="auth-container">
            <SignupForm onSuccess={handleSignupSuccess} />
            <div className="auth-toggle">
              <p>Already have an account? <button onClick={() => handleNavigate('login')}>Login</button></p>
            </div>
          </div>
        )}

        {currentPage === 'dashboard' && user && (
          <Dashboard user={user} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;
