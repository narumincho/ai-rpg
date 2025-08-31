

import React, { useState } from 'react';
import groundImg from './assets/ground.svg';
import wallImg from './assets/wall.svg';
import playerImg from './assets/player.svg';

const MAP_WIDTH = 10;
const MAP_HEIGHT = 6;

const initialMap = Array.from({ length: MAP_HEIGHT }, (_, y) =>
  Array.from({ length: MAP_WIDTH }, (_, x) => (y === 0 || y === MAP_HEIGHT - 1 || x === 0 || x === MAP_WIDTH - 1 ? 'wall' : 'ground'))
);

const initialPlayer = { x: 1, y: 1 };

function App() {
  const [player, setPlayer] = useState(initialPlayer);
  const [battle, setBattle] = useState(false);

  const movePlayer = (dx: number, dy: number) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (
      newX > 0 && newX < MAP_WIDTH - 1 &&
      newY > 0 && newY < MAP_HEIGHT - 1
    ) {
      setPlayer({ x: newX, y: newY });
    }
  };

  const handleBattle = () => {
    setBattle(true);
    setTimeout(() => setBattle(false), 1000);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#eee',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}>
      <h1 style={{ marginBottom: 16 }}>RPGサンプル</h1>
      <div style={{
        flex: '0 0 auto',
        width: '80vw',
        maxWidth: 640,
        height: '60vh',
        maxHeight: 384,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 24,
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${MAP_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${MAP_HEIGHT}, 1fr)`,
          width: '100%',
          height: '100%',
        }}>
          {initialMap.flatMap((row, y) =>
            row.map((cell, x) => {
              let imgSrc = cell === 'wall' ? wallImg : groundImg;
              if (x === player.x && y === player.y) imgSrc = playerImg;
              return <img key={`${x}-${y}`} src={imgSrc} alt={cell} style={{ width: '100%', height: '100%' }} />;
            })
          )}
        </div>
      </div>
      <div style={{ margin: '16px 0' }}>
        <button onClick={() => movePlayer(0, -1)}>↑</button>
        <button onClick={() => movePlayer(-1, 0)}>←</button>
        <button onClick={() => movePlayer(1, 0)}>→</button>
        <button onClick={() => movePlayer(0, 1)}>↓</button>
      </div>
      <button onClick={handleBattle} disabled={battle} style={{ marginBottom: 16 }}>
        戦う
      </button>
      {battle && <div style={{ color: 'red', fontWeight: 'bold' }}>戦闘中！</div>}
    </div>
  );
}

export default App;
