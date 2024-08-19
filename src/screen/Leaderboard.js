import React, { useState } from 'react';

export default function Leaderboard() {
  const [examId, setExamId] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);

  const handleExamIdChange = (event) => {
    setExamId(event.target.value);
  };

  const fetchLeaderboardData = (examId) => {
    fetch(`http://localhost:5000/api/Leader/${examId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard data fetched successfully:', data);
        const uniqueData = filterUniqueResponses(data);
        const sortedData = sortLeaderboardByScore(uniqueData);
        setLeaderboard(sortedData);
        setError(null);
      })
      .catch((error) => {
        console.error('There was a problem fetching the leaderboard data:', error);
        setError('There was a problem fetching the leaderboard data. Please try again later.');
      });
  };

  const filterUniqueResponses = (data) => {
    const uniqueEntries = new Map();
    data.forEach(entry => {
      if (!uniqueEntries.has(entry.email)) {
        uniqueEntries.set(entry.email, entry);
      }
    });
    return Array.from(uniqueEntries.values());
  };

  const sortLeaderboardByScore = (data) => {
    return data.sort((a, b) => b.score - a.score);
  };

  const handleFetchLeaderboard = () => {
    if (examId) {
      fetchLeaderboardData(examId);
    } else {
      setError('Please enter an exam ID.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#008080', textAlign: 'center' }}>Leaderboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="examId" style={{ display: 'block', marginBottom: '5px' }}>Enter Exam ID:</label>
        <input type="text" id="examId" value={examId} onChange={handleExamIdChange} style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button onClick={handleFetchLeaderboard} style={{ width: '100%', padding: '10px', backgroundColor: '#008080', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Fetch Leaderboard</button>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <h2 style={{ color: '#008080', textAlign: 'center' }}>Leaderboard Results</h2>
      {leaderboard.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {leaderboard.map((entry, index) => (
            <li key={index} style={{ backgroundColor: '#f9f9f9', marginBottom: '10px', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}>
              <strong>{entry.email}</strong>: {entry.score}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No scores available for this exam.</p>
      )}
    </div>
  );
}
