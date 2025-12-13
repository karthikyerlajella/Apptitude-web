import React, { useState, useEffect } from 'react';

// --- DATA: Word List for Word Game ---
const wordList = [
  { word: "VARIABLE", hint: "A container for storing data values" },
  { word: "FUNCTION", hint: "A block of code designed to perform a task" },
  { word: "ARRAY", hint: "Used to store multiple values in a single variable" },
  { word: "REACT", hint: "A JavaScript library for building user interfaces" },
  { word: "COMPONENT", hint: "Independent and reusable bits of code" },
  { word: "DATABASE", hint: "Structured set of data held in a computer" },
  { word: "DEBUG", hint: "Process of identifying and removing errors" }
];

// --- DATA: Snakes and Ladders Mapping ---
// Key = Start Position, Value = End Position
// Note: We handle both logic and visual jumps here
const jumps = {
  // LADDERS (Good) 🚀
  3: 22,
  6: 25,
  11: 40,
  60: 85,
  46: 90,
  
  // SNAKES (Bad) 🐍
  16: 4,
  49: 7,
  56: 19,
  87: 36,
  93: 73,
  99: 5
};

const Games = () => {
  const [activeGame, setActiveGame] = useState(null); // 'word', 'snake', 'ludo' or null

  return (
    <div style={styles.container}>
      {/* HEADER */}
      {!activeGame && (
        <div style={styles.header}>
          <h1>🎮 Bix Break Zone</h1>
          <p>Relax and recharge your brain!</p>
        </div>
      )}

      {/* DASHBOARD (Menu) */}
      {!activeGame && (
        <div style={styles.grid}>
          {/* Card 1: Word Scramble */}
          <div style={styles.card} onClick={() => setActiveGame('word')}>
            <div style={styles.icon}>🔤</div>
            <h3>Word Scramble</h3>
            <p>Unscramble technical terms.</p>
            <button style={styles.btn}>Play Now</button>
          </div>

          {/* Card 2: Snake & Ladder */}
          <div style={styles.card} onClick={() => setActiveGame('snake')}>
            <div style={styles.icon}>🐍</div>
            <h3>Snake & Ladder</h3>
            <p>Reach 100 to win!</p>
            <button style={styles.btn}>Play Now</button>
          </div>

          {/* Card 3: Ludo */}
          <div style={styles.card} onClick={() => alert("Ludo is coming next!")}>
            <div style={styles.icon}>♟️</div>
            <h3>Mini Ludo</h3>
            <p>Quick version of Ludo.</p>
            <button style={{...styles.btn, background:'#6c757d'}}>Coming Soon</button>
          </div>
        </div>
      )}

      {/* GAME COMPONENTS */}
      {activeGame === 'word' && <WordScramble onBack={() => setActiveGame(null)} />}
      {activeGame === 'snake' && <SnakeLadder onBack={() => setActiveGame(null)} />}
    </div>
  );
};

// ==========================================
// 1. WORD SCRAMBLE COMPONENT
// ==========================================
const WordScramble = ({ onBack }) => {
  const [current, setCurrent] = useState({});
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const nextWord = () => {
    const randomObj = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrent(randomObj);
    const mixed = randomObj.word.split('').sort(() => 0.5 - Math.random()).join('');
    setScrambled(mixed);
    setGuess("");
    setMessage("");
  };

  useEffect(() => { nextWord(); }, []);

  const checkAnswer = () => {
    if (guess.toUpperCase() === current.word) {
      setMessage("✅ Correct! Great job.");
    } else {
      setMessage("❌ Try again!");
    }
  };

  return (
    <div style={styles.gameBoard}>
      <button onClick={onBack} style={styles.backBtn}>⬅ Back</button>
      <h2>Word Scramble Challenge</h2>
      <div style={styles.scrambleText}>{scrambled}</div>
      <p style={styles.hint}>Hint: {current.hint}</p>
      <input type="text" value={guess} onChange={(e) => setGuess(e.target.value)} placeholder="Type answer..." style={styles.input} />
      <div style={{ marginTop: '20px' }}>
        <button onClick={checkAnswer} style={styles.actionBtn}>Check Answer</button>
        <button onClick={nextWord} style={{ ...styles.actionBtn, background: '#6c757d', marginLeft: '10px' }}>Next</button>
      </div>
      <p style={{ fontWeight: 'bold', marginTop: '20px' }}>{message}</p>
    </div>
  );
};

// ==========================================
// 2. SNAKE AND LADDER COMPONENT
// ==========================================
const SnakeLadder = ({ onBack }) => {
  const [position, setPosition] = useState(1);
  const [dice, setDice] = useState(1);
  const [message, setMessage] = useState("Roll the dice to start!");
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (position >= 100) return; // Game over check
    
    setIsRolling(true);
    setMessage("Rolling...");
    
    setTimeout(() => {
      const rolledValue = Math.floor(Math.random() * 6) + 1;
      setDice(rolledValue);
      
      let newPos = position + rolledValue;

      if (newPos > 100) {
        setMessage(`You rolled ${rolledValue}. Too high to finish!`);
        setIsRolling(false);
        return;
      }

      // Check for Snake or Ladder
      let finalPos = newPos;
      let msg = `You rolled ${rolledValue}. Moved to ${newPos}.`;

      if (jumps[newPos]) {
        if (jumps[newPos] > newPos) {
          msg = `You rolled ${rolledValue}. LADDER! 🚀 Clime to ${jumps[newPos]}!`;
        } else {
          msg = `You rolled ${rolledValue}. SNAKE! 🐍 Slide down to ${jumps[newPos]}...`;
        }
        finalPos = jumps[newPos];
      }

      setPosition(finalPos);
      setMessage(finalPos === 100 ? "🎉 YOU WON! 🎉" : msg);
      setIsRolling(false);
    }, 500);
  };

  // Create board numbers 100 down to 1
  // We need to reverse alternate rows so they flow in a "snake" pattern
  const renderBoard = () => {
    let board = [];
    for (let row = 9; row >= 0; row--) {
      let rowCells = [];
      for (let col = 0; col < 10; col++) {
        let num = row * 10 + col + 1;
        rowCells.push(num);
      }
      // Reverse even rows (90-99, 70-79, etc) to make the path zigzag
      if (row % 2 !== 0) rowCells.reverse(); // Actually, visual row 9 (top) is mathematically row index 9.
      // Standard board: Bottom row (0) goes 1-10 (Right). Next 11-20 (Left).
      // If row index 0 is 1-10. Row 1 is 11-20.
      if (row % 2 === 1) rowCells.reverse(); 
      
      board.push(...rowCells);
    }
    return board;
  };

  return (
    <div style={{...styles.gameBoard, maxWidth: '600px'}}>
      <button onClick={onBack} style={styles.backBtn}>⬅ Back</button>
      <h2>🐍 Snake & Ladder 🪜</h2>
      
      <div style={styles.boardGrid}>
        {renderBoard().map((num) => {
          const isSnake = jumps[num] && jumps[num] < num;
          const isLadder = jumps[num] && jumps[num] > num;
          
          let cellStyle = styles.cell;
          // Specific colors for game elements (keep these visible in dark mode too)
          if (isSnake) cellStyle = {...styles.cell, backgroundColor: '#ffcccc', color: '#d00'};
          if (isLadder) cellStyle = {...styles.cell, backgroundColor: '#ccffcc', color: '#006400'};
          if (num === 100) cellStyle = {...styles.cell, backgroundColor: 'gold', border: '2px solid orange', color: 'black'};

          return (
            <div key={num} style={cellStyle}>
              {num}
              {/* Markers for special cells */}
              {isSnake && <span style={{fontSize:'10px'}}>🐍</span>}
              {isLadder && <span style={{fontSize:'10px'}}>🚀</span>}
              
              {/* Player Piece */}
              {position === num && <div style={styles.playerPiece}>📍</div>}
            </div>
          );
        })}
      </div>

      <div style={styles.controls}>
        <div style={styles.diceBox}>{dice}</div>
        <button 
          onClick={rollDice} 
          disabled={isRolling || position === 100}
          style={isRolling ? {...styles.actionBtn, background:'#ccc'} : styles.actionBtn}
        >
          {position === 100 ? "Game Over" : "Roll Dice"}
        </button>
      </div>
      <p style={{marginTop: '15px', fontWeight: 'bold'}}>{message}</p>
      {position === 100 && <button onClick={()=>setPosition(1)} style={styles.btn}>Play Again</button>}
    </div>
  );
};

// --- STYLES (UPDATED FOR DARK MODE COMPATIBILITY) ---
const styles = {
  container: { 
    padding: '20px', 
    textAlign: 'center', 
    fontFamily: 'Arial, sans-serif',
    color: 'var(--text-main)' // Ensures text color follows theme
  },
  header: { marginBottom: '30px' },
  grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  
  card: { 
    border: '1px solid var(--border-color)', 
    borderRadius: '10px', 
    padding: '20px', 
    width: '220px', 
    cursor: 'pointer', 
    boxShadow: 'var(--shadow-sm)', 
    background: 'var(--card-bg)', // Uses CSS variable
    color: 'var(--text-main)',    // Uses CSS variable
    transition: '0.3s' 
  },
  
  icon: { fontSize: '40px', marginBottom: '10px' },
  btn: { background: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' },
  
  // Shared Game Board
  gameBoard: { 
    maxWidth: '500px', 
    margin: '0 auto', 
    border: '1px solid var(--border-color)', 
    padding: '20px', 
    borderRadius: '10px', 
    background: 'var(--card-bg)', // Uses CSS variable
    color: 'var(--text-main)',    // Uses CSS variable
    boxShadow: 'var(--shadow-lg)' 
  },
  
  backBtn: { 
    background: 'transparent', 
    border: '1px solid var(--text-light)', 
    color: 'var(--text-main)',
    padding: '5px 10px', 
    cursor: 'pointer', 
    marginBottom: '15px', 
    borderRadius:'4px' 
  },
  
  // Word Game Specific
  scrambleText: { fontSize: '32px', letterSpacing: '8px', fontWeight: 'bold', margin: '20px 0', color: 'var(--text-main)' },
  hint: { fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '20px' },
  input: { 
    padding: '10px', 
    fontSize: '18px', 
    width: '80%', 
    textAlign: 'center', 
    borderRadius: '5px', 
    border:'1px solid var(--border-color)',
    background: 'var(--input-bg)',
    color: 'var(--text-main)'
  },
  actionBtn: { padding: '10px 20px', fontSize: '16px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },

  // Snake Board Specific
  boardGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(10, 1fr)', 
    gap: '2px', 
    margin: '20px auto', 
    border: '2px solid var(--text-main)',
    background: '#fff' // Keep board white even in dark mode for contrast with colored cells
  },
  cell: { 
    height: '35px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    fontSize: '10px', 
    border: '1px solid #eee', 
    position: 'relative',
    flexDirection: 'column',
    color: '#333' // Keep numbers inside grid dark
  },
  playerPiece: {
    position: 'absolute',
    fontSize: '24px',
    top: '-5px',
    zIndex: 10,
    textShadow: '0 0 2px white'
  },
  controls: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '20px' },
  diceBox: { 
    fontSize: '30px', 
    fontWeight: 'bold', 
    border: '2px solid var(--text-main)', 
    width: '50px', 
    height: '50px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderRadius: '8px', 
    background: 'var(--card-bg)',
    color: 'var(--text-main)'
  }
};

export default Games;