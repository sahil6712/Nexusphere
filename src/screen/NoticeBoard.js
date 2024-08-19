import React, { useState, useEffect } from 'react';
import './NoticeBoard.css'; // Import CSS file for styling

const NoticeBoard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [notices, setNotices] = useState([]);
  const [newNotice, setNewNotice] = useState('');

  useEffect(() => {
    // Fetch all notices initially
    fetchNotices();
  }, []);

  const authenticateAdmin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setAuthenticated(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again later.');
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notices");
      const data = await response.json();
      setNotices(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching notices.');
    }
  };

  const handleLogin = () => {
    // Perform client-side validation if needed
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    authenticateAdmin();
  };

  const handleNoticeSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/notice", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notice: newNotice }),
      });
      const data = await response.json();
      if (data.success) {
        // Refresh notices after adding new notice
        fetchNotices();
        setNewNotice('');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the notice.');
    }
  };

  const handleNoticeDelete = async (noticeId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notice/${noticeId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        // Refresh notices after deleting notice
        fetchNotices();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the notice.');
    }
  };

  return (
    <div className="notice-board-container">
      <h2>Notice Board</h2>
      {authenticated && (
        <div className="notice-input-container">
          <h3>Punch Notice</h3>
          <input
            type="text"
            placeholder="Enter notice"
            value={newNotice}
            onChange={(e) => setNewNotice(e.target.value)}
          />
          <button onClick={handleNoticeSubmit}>Submit</button>
        </div>
      )}
      <div className="notices-container">
        <h3>Notices</h3>
        <ul>
          {notices.map((notice, index) => (
            <li key={index} className="notice-item">
              {notice.notice}
              {authenticated && (
                <button onClick={() => handleNoticeDelete(notice._id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {!authenticated && (
        <div className="login-container">
          <h2>Admin Authentication</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default NoticeBoard;
