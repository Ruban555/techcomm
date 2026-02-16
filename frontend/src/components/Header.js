import React, { useState } from 'react';
import './Header.css';

function Header({ user, onNavigate, currentPage, onLogout, onOpenMessaging, onOpenCreateCommunity, unreadMessages = 0 }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <h1 className="site-name">TalentHub</h1>
        </div>

        <nav className="nav-menu">
          <button
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`nav-item ${currentPage === 'community' ? 'active' : ''}`}
            onClick={() => onNavigate('community')}
          >
            Community
          </button>
          <button
            className={`nav-item ${currentPage === 'news' ? 'active' : ''}`}
            onClick={() => onNavigate('news')}
          >
            News
          </button>
          <button
            className={`nav-item ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
        </nav>

        <div className="action-section">
          {user && (
            <>
              <button className="messaging-btn" onClick={onOpenMessaging} title="Messages">
                💬
                {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
              </button>
              <button className="create-community-btn" onClick={onOpenCreateCommunity}>
                ➕ Create Community
              </button>
            </>
          )}
        </div>

        <div className="auth-section">
          {user ? (
            <div className="user-menu-wrapper">
              <button 
                className="user-display"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user.name} ▼
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button className="dropdown-item" onClick={() => {
                    onNavigate('profile');
                    setShowUserMenu(false);
                  }}>
                    👤 My Profile
                  </button>
                  <button className="dropdown-item" onClick={() => {
                    onLogout();
                    setShowUserMenu(false);
                  }}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="login-btn"
              onClick={() => onNavigate('login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
