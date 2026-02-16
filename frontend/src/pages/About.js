import React from 'react';
import './About.css';

function About() {
  const team = [
    { id: 1, name: 'Sarah Johnson', role: 'Co-Founder & CEO', icon: '👩‍💼' },
    { id: 2, name: 'Michael Chen', role: 'Co-Founder & CTO', icon: '👨‍💻' },
    { id: 3, name: 'Emily Rodriguez', role: 'Head of Community', icon: '👩‍🔬' },
    { id: 4, name: 'James Wilson', role: 'Head of Operations', icon: '👨‍💼' },
  ];

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About TalentHub</h1>
        <p>Connecting Communities, Building Careers</p>
      </div>

      <div className="about-container">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At TalentHub, we believe that talent knows no boundaries. Our mission is to create vibrant communities around different professions and industries, connecting like-minded professionals and opening doors to opportunities. We're dedicated to helping individuals advance their careers while building meaningful professional relationships.
          </p>
        </section>

        <section className="vision-section">
          <h2>Our Vision</h2>
          <p>
            We envision a world where professionals can easily discover opportunities, collaborate with peers, and grow their skills within communities that understand their industry. Whether you're an IT professional, designer, marketer, or business leader, TalentHub is your platform to thrive.
          </p>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community First</h3>
              <p>We believe in the power of communities. Everything we do centers on building strong, supportive professional networks.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Growth & Development</h3>
              <p>We're committed to helping professionals grow their skills, advance their careers, and reach their full potential.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Inclusivity</h3>
              <p>We welcome professionals from all backgrounds, experiences, and perspectives. Diversity strengthens our communities.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We continuously innovate to provide the best tools and features for professional connection and career advancement.</p>
            </div>
          </div>
        </section>

        <section className="community-section">
          <h2>Our Communities</h2>
          <div className="communities-display">
            <div className="community-item">
              <h3>💻 IT Community</h3>
              <p>For software developers, engineers, and technology professionals seeking to connect and grow in the tech industry.</p>
            </div>
            <div className="community-item">
              <h3>🎨 Designer Community</h3>
              <p>For UX/UI designers, graphic designers, and creative professionals to share work, learn, and collaborate.</p>
            </div>
            <div className="community-item">
              <h3>📱 Marketing Community</h3>
              <p>For digital marketers, content creators, and marketing specialists to share insights and best practices.</p>
            </div>
            <div className="community-item">
              <h3>💼 Business Community</h3>
              <p>For entrepreneurs, managers, and business professionals to network and discuss business strategies.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-icon">{member.icon}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="stats-section">
          <h2>Our Impact</h2>
          <div className="stats-grid">
            <div className="stat">
              <h3 className="stat-number">50K+</h3>
              <p>Active Members</p>
            </div>
            <div className="stat">
              <h3 className="stat-number">4</h3>
              <p>Professional Communities</p>
            </div>
            <div className="stat">
              <h3 className="stat-number">5K+</h3>
              <p>Job Listings</p>
            </div>
            <div className="stat">
              <h3 className="stat-number">2K+</h3>
              <p>Successful Placements</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>Get In Touch</h2>
          <p>Have questions or want to learn more about TalentHub? We'd love to hear from you!</p>
          <div className="contact-methods">
            <div className="contact-item">
              <h4>📧 Email</h4>
              <p>hello@talenthub.com</p>
            </div>
            <div className="contact-item">
              <h4>🌐 Website</h4>
              <p>www.talenthub.com</p>
            </div>
            <div className="contact-item">
              <h4>📱 Follow Us</h4>
              <p>Twitter • LinkedIn • Instagram</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
