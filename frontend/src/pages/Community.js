import React, { useState } from 'react';
import './Community.css';

function Community({ communities = [] }) {
  const [selectedCommunity, setSelectedCommunity] = useState('it');

  const handleViewJobDetails = (jobTitle, jobId) => {
    alert(`Job: ${jobTitle}\n\nJob ID: ${jobId}\n\nView full job details coming soon!`);
  };

  const handleDiscussionClick = (discussionTitle, discussionId) => {
    alert(`Discussion: ${discussionTitle}\n\nDiscussion ID: ${discussionId}\n\nJoin this discussion to see replies and contribute!`);
  };

  const defaultCommunities = {
    it: {
      name: 'IT Community',
      description: 'For Software Developers, Engineers, and Tech Professionals',
      icon: '💻',
      members: 1250,
      jobs: [
        { id: 1, title: 'Senior Full Stack Developer', company: 'Tech Corp', salary: '$120k-$150k', posted: '2 days ago' },
        { id: 2, title: 'React Specialist', company: 'Web Solutions', salary: '$100k-$130k', posted: '5 days ago' },
        { id: 3, title: 'Backend Engineer', company: 'Cloud Systems', salary: '$110k-$140k', posted: '1 week ago' },
      ],
      discussions: [
        { id: 1, title: 'Best practices for Spring Boot microservices', replies: 24 },
        { id: 2, title: 'React vs Vue in 2024', replies: 18 },
        { id: 3, title: 'Database optimization techniques', replies: 31 },
      ]
    },
    design: {
      name: 'Designer Community',
      description: 'For UX/UI Designers, Graphic Designers, and Creatives',
      icon: '🎨',
      members: 850,
      jobs: [
        { id: 1, title: 'UX/UI Designer', company: 'Creative Studio', salary: '$80k-$110k', posted: '3 days ago' },
        { id: 2, title: 'Graphic Designer', company: 'Brand Agency', salary: '$70k-$90k', posted: '1 week ago' },
        { id: 3, title: 'Product Designer', company: 'Tech Startups', salary: '$90k-$120k', posted: '4 days ago' },
      ],
      discussions: [
        { id: 1, title: 'Design trends for 2024', replies: 42 },
        { id: 2, title: 'Figma vs Adobe XD', replies: 28 },
        { id: 3, title: 'Building strong design portfolios', replies: 35 },
      ]
    },
    marketing: {
      name: 'Marketing Community',
      description: 'For Marketers, Content Creators, and Brand Specialists',
      icon: '📱',
      members: 620,
      jobs: [
        { id: 1, title: 'Digital Marketing Manager', company: 'Marketing Plus', salary: '$75k-$100k', posted: '2 days ago' },
        { id: 2, title: 'Content Strategist', company: 'Media Group', salary: '$70k-$95k', posted: '6 days ago' },
        { id: 3, title: 'Social Media Manager', company: 'Brand Co', salary: '$60k-$80k', posted: '3 days ago' },
      ],
      discussions: [
        { id: 1, title: 'SEO strategies in 2024', replies: 38 },
        { id: 2, title: 'Social media growth hacks', replies: 45 },
        { id: 3, title: 'Email marketing best practices', replies: 22 },
      ]
    },
    business: {
      name: 'Business Community',
      description: 'For Entrepreneurs, Managers, and Business Professionals',
      icon: '💼',
      members: 940,
      jobs: [
        { id: 1, title: 'Business Manager', company: 'Enterprise Inc', salary: '$85k-$120k', posted: '1 day ago' },
        { id: 2, title: 'Project Manager', company: 'Consulting Group', salary: '$80k-$110k', posted: '4 days ago' },
        { id: 3, title: 'Strategic Analyst', company: 'Financial Services', salary: '$90k-$130k', posted: '5 days ago' },
      ],
      discussions: [
        { id: 1, title: 'Leadership in uncertain times', replies: 51 },
        { id: 2, title: 'Scaling your business', replies: 33 },
        { id: 3, title: 'Financial planning for startups', replies: 29 },
      ]
    }
  };

  // Convert custom communities to the same format
  const allCommunities = { ...defaultCommunities };
  communities.forEach((comm, index) => {
    const key = `custom_${index}`;
    allCommunities[key] = {
      name: comm.name,
      description: comm.description,
      icon: '🆕',
      members: 0,
      jobs: [],
      discussions: []
    };
  });

  const current = allCommunities[selectedCommunity];

  return (
    <div className="community-page">
      <div className="community-header">
        <h1>{current?.icon} {current?.name}</h1>
        <p>{current?.description}</p>
        <p className="member-count">👥 {current?.members} Active Members</p>
      </div>

      <div className="community-container">
        <aside className="community-sidebar">
          <h3>All Communities</h3>
          <div className="community-list">
            {Object.entries(allCommunities).map(([key, comm]) => (
              <button
                key={key}
                className={`community-btn ${selectedCommunity === key ? 'active' : ''}`}
                onClick={() => setSelectedCommunity(key)}
              >
                <span className="icon">{comm.icon}</span>
                <span>{comm.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="community-main">
          <div className="community-section">
            <h2>📋 Job Listings</h2>
            {current?.jobs && current.jobs.length > 0 ? (
              <div className="jobs-list">
                {current.jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <h3>{job.title}</h3>
                      <span className="posted">{job.posted}</span>
                    </div>
                    <p className="company">{job.company}</p>
                    <p className="salary">{job.salary}</p>
                    <button className="view-btn" onClick={() => handleViewJobDetails(job.title, job.id)}>View Details →</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">No jobs posted yet in this community</p>
            )}
          </div>

          <div className="community-section">
            <h2>💬 Discussions</h2>
            {current?.discussions && current.discussions.length > 0 ? (
              <div className="discussions-list">
                {current.discussions.map(discussion => (
                  <div key={discussion.id} className="discussion-item">
                    <div className="discussion-content">
                      <h4>{discussion.title}</h4>
                      <span className="replies-count">{discussion.replies} replies</span>
                    </div>
                    <button className="discussion-btn" onClick={() => handleDiscussionClick(discussion.title, discussion.id)}>→</button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-content">No discussions yet. Start one!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Community;
