import React from 'react';
import './News.css';

function News() {
  const news = [
    {
      id: 1,
      title: 'Tech Industry Reports 25% Growth in Remote Work Opportunities',
      excerpt: 'New survey shows significant rise in remote positions across IT and tech sectors',
      image: '📊',
      date: 'Feb 14, 2024',
      category: 'IT',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'AI and Machine Learning Skills Most In-Demand for 2024',
      excerpt: 'Companies actively seeking professionals with AI expertise and machine learning background',
      image: '🤖',
      date: 'Feb 12, 2024',
      category: 'IT',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Design Thinking Workshop Series Launches This Month',
      excerpt: 'Free online workshops for designers to learn latest tools and techniques',
      image: '🎨',
      date: 'Feb 10, 2024',
      category: 'Design',
      readTime: '3 min read'
    },
    {
      id: 4,
      title: 'Marketing Salary Survey: Biggest Increases Seen in Digital Roles',
      excerpt: 'Digital marketing professionals see average 15% salary increase year over year',
      image: '📈',
      date: 'Feb 8, 2024',
      category: 'Marketing',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Business Leaders Share Strategies for 2024 Growth',
      excerpt: 'Top entrepreneurs discuss their plans for expansion and market penetration',
      image: '💼',
      date: 'Feb 6, 2024',
      category: 'Business',
      readTime: '8 min read'
    },
    {
      id: 6,
      title: 'Women in Tech Initiative Reaches 1 Million Members',
      excerpt: 'Global movement celebrating achievements and pushing for more diversity',
      image: '👩‍💻',
      date: 'Feb 4, 2024',
      category: 'Community',
      readTime: '4 min read'
    },
  ];

  return (
    <div className="news-page">
      <div className="news-header">
        <h1>📰 Latest News & Updates</h1>
        <p>Stay informed with the latest trends, opportunities, and insights from our communities</p>
      </div>

      <div className="news-container">
        <main className="news-main">
          <div className="featured-news">
            <article className="featured-article">
              <div className="featured-image">📊</div>
              <div className="featured-content">
                <span className="category-badge">Featured</span>
                <h2>{news[0].title}</h2>
                <p>{news[0].excerpt}</p>
                <div className="article-meta">
                  <span className="date">{news[0].date}</span>
                  <span className="read-time">{news[0].readTime}</span>
                </div>
                <button className="read-btn">Read Full Article →</button>
              </div>
            </article>
          </div>

          <div className="news-grid">
            {news.slice(1).map(article => (
              <article key={article.id} className="news-card">
                <div className="card-image">{article.image}</div>
                <div className="card-content">
                  <span className="category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="card-footer">
                    <span className="date">{article.date}</span>
                    <span className="read-time">{article.readTime}</span>
                  </div>
                </div>
                <button className="card-button">Read More →</button>
              </article>
            ))}
          </div>
        </main>

        <aside className="news-sidebar">
          <div className="sidebar-section">
            <h3>🔥 Trending Topics</h3>
            <ul className="trending-list">
              <li><a href="#trending">Remote Work Trends</a></li>
              <li><a href="#trending">AI in Business</a></li>
              <li><a href="#trending">Design Innovation</a></li>
              <li><a href="#trending">Startup Growth</a></li>
              <li><a href="#trending">Skill Development</a></li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>📚 Categories</h3>
            <ul className="category-list">
              <li><a href="#cat">IT & Technology</a> <span>245</span></li>
              <li><a href="#cat">Design</a> <span>128</span></li>
              <li><a href="#cat">Marketing</a> <span>96</span></li>
              <li><a href="#cat">Business</a> <span>187</span></li>
              <li><a href="#cat">Community</a> <span>73</span></li>
            </ul>
          </div>

          <div className="sidebar-section newsletter">
            <h3>✉️ Newsletter</h3>
            <p>Get the latest news delivered to your inbox</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default News;
