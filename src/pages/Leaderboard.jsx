import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Ensure this path is correct based on your folder structure
import { ref, query, orderByChild, limitToLast, get } from "firebase/database";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const usersRef = ref(db, 'users');
        // Order by score and get the top 10 (Firebase limits from the end)
        const topUsersQuery = query(usersRef, orderByChild('score'), limitToLast(10));
        
        const snapshot = await get(topUsersQuery);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert object to array and reverse it (because limitToLast gives ascending order)
          const leaderboardData = Object.keys(data)
            .map(key => ({
              id: key,
              ...data[key]
            }))
            .sort((a, b) => b.score - a.score); // Sort descending (High to Low)
            
          setLeaders(leaderboardData);
        } else {
          setLeaders([]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏆 Leaderboard</h2>
      
      {loading ? (
        <p>Loading scores...</p>
      ) : (
        <div style={styles.list}>
          {leaders.length > 0 ? (
            leaders.map((user, index) => (
              <div key={user.id} style={styles.card}>
                <div style={styles.rank}>#{index + 1}</div>
                <div style={styles.info}>
                  <h3 style={styles.name}>{user.displayName || "Anonymous"}</h3>
                  <p style={styles.score}>{user.score || 0} pts</p>
                </div>
                {index === 0 && <span style={{fontSize: '1.5rem'}}>👑</span>}
              </div>
            ))
          ) : (
            <p>No scores yet. Be the first to play!</p>
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    textAlign: 'center',
    background: 'var(--card-bg, white)',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    color: 'var(--text-main, #333)'
  },
  title: {
    marginBottom: '30px',
    color: '#f59e0b'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.05)',
    padding: '15px',
    borderRadius: '8px',
    justifyContent: 'space-between'
  },
  rank: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    width: '40px',
    color: '#666'
  },
  info: {
    textAlign: 'left',
    flex: 1,
    marginLeft: '15px'
  },
  name: {
    margin: 0,
    fontSize: '1.1rem'
  },
  score: {
    margin: 0,
    color: '#10b981',
    fontWeight: 'bold'
  }
};

export default Leaderboard;