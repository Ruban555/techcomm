import React from 'react';
import './Home.css';

function Home({ onNavigate }) {
  const communities = [
    { id: 1, name: 'IT Community', icon: '💻', members: 1250, description: 'For software developers, engineers, and tech professionals' },
    { id: 2, name: 'Designer Community', icon: '🎨', members: 850, description: 'For UX/UI designers, graphic designers, and creatives' },
    { id: 3, name: 'Marketing Community', icon: '📱', members: 620, description: 'For marketers, content creators, and brand specialists' },
    { id: 4, name: 'Business Community', icon: '💼', members: 940, description: 'For entrepreneurs, managers, and business professionals' },
  ];

  const handleExploreClick = () => {
    if (onNavigate) onNavigate('community');
  };

  const handleJoinCommunity = (communityName) => {
    alert(`You've joined ${communityName}! 🎉\n\nYou can now access community discussions and job listings.`);
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to TalentHub</h1>
          <p>Connect with professionals from various communities and explore exciting job opportunities</p>
          <button className="cta-button" onClick={handleExploreClick}>Explore Communities</button>
        </div>
      </section>

      <section className="communities-preview">
        <h2>Featured Communities</h2>
        <div className="communities-grid">
          {communities.map(community => (
            <div key={community.id} className="community-card">
              <div className="community-icon">{community.icon}</div>
              <h3>{community.name}</h3>
              <p className="description">{community.description}</p>
              <p className="members">👥 {community.members} members</p>
              <button className="join-btn" onClick={() => handleJoinCommunity(community.name)}>Join Community</button>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <h2>Why Join TalentHub?</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">🔗</div>
            <h3>Build Connections</h3>
            <p>Connect with professionals in your field and expand your network</p>
          </div>
          <div className="feature">
            <div className="feature-icon">💼</div>
            <h3>Find Jobs</h3>
            <p>Discover job opportunities tailored to your community and skills</p>
          </div>
          <div className="feature">
            <div className="feature-icon">📚</div>
            <h3>Share Knowledge</h3>
            <p>Learn from industry experts and share your insights with others</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <h3>Grow Your Career</h3>
            <p>Advance your career with mentorship and professional development</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
