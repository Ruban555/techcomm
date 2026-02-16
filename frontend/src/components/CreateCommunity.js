import React, { useState } from 'react';
import './CreateCommunity.css';

function CreateCommunity({ isOpen, onClose, onCommunityCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'IT',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['IT', 'Design', 'Marketing', 'Business', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.name.trim() || !formData.description.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/communities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create community');
      }

      const newCommunity = await response.json();
      setFormData({ name: '', description: '', category: 'IT' });
      onCommunityCreated(newCommunity);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create community');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="create-community-overlay">
      <div className="create-community-modal">
        <div className="modal-header">
          <h2>Create New Community</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="community-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Community Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Python Developers"
              maxLength="50"
              required
            />
            <small>{formData.name.length}/50 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your community, its purpose, and who should join..."
              rows="5"
              maxLength="500"
              required
            />
            <small>{formData.description.length}/500 characters</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Community'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCommunity;
