import React, { useState, useEffect } from 'react';
import './Messaging.css';

function Messaging({ isOpen, onClose, user }) {
  const [messages, setMessages] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch communities and messages on open
  useEffect(() => {
    if (isOpen) {
      fetchCommunities();
      fetchMessages();
    }
  }, [isOpen, fetchCommunities, fetchMessages]);

  const fetchCommunities = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/communities');
      if (response.ok) {
        const data = await response.json();
        setCommunities(data);
        if (data.length > 0 && !selectedCommunityId) {
          setSelectedCommunityId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Error fetching communities:', err);
    }
  }, [selectedCommunityId]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedCommunityId) return;

    setLoading(true);
    const messagePayload = {
      communityId: selectedCommunityId,
      senderId: user?.id || 1,
      senderName: user?.name || 'Anonymous',
      messageText: newMessage
    };

    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload),
      });

      if (response.ok) {
        const savedMessage = await response.json();
        setMessages([...messages, savedMessage]);
        setNewMessage('');
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = selectedCommunityId
    ? messages.filter(msg => msg.communityId === selectedCommunityId)
    : messages;

  if (!isOpen) return null;

  return (
    <div className="messaging-overlay">
      <div className="messaging-modal">
        <div className="messaging-header">
          <h2>💬 Community Messages</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="messaging-container">
          <aside className="community-filter">
            <h3>Communities</h3>
            {communities.map(community => (
              <button
                key={community.id}
                className={`filter-btn ${selectedCommunityId === community.id ? 'active' : ''}`}
                onClick={() => setSelectedCommunityId(community.id)}
              >
                {community.name}
              </button>
            ))}
          </aside>

          <div className="messages-section">
            <div className="messages-list">
              {filteredMessages.length > 0 ? (
                filteredMessages.map(msg => (
                  <div key={msg.id} className="message-item">
                    <div className="message-header">
                      <span className="sender-name">{msg.senderName}</span>
                      <span className="message-time">{new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="message-text">{msg.messageText}</p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#999', padding: '2rem' }}>No messages yet. Start the conversation!</p>
              )}
            </div>

            <form className="message-input-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder={selectedCommunityId ? "Type a message..." : "Select a community first..."}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
                disabled={loading || !selectedCommunityId}
              />
              <button type="submit" className="send-btn" disabled={loading || !selectedCommunityId || !newMessage.trim()}>
                {loading ? '⏳' : '📤'} Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
