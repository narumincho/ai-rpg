

import React, { useState } from 'react';
import groundImg from './assets/ground.svg';
import wallImg from './assets/wall.svg';
import playerImg from './assets/player.svg';
// 仮画像: 道・家・木
import roadImg from './assets/road.svg';
import houseImg from './assets/house.svg';
import treeImg from './assets/tree.svg';

const MAP_WIDTH = 12;
const MAP_HEIGHT = 8;

// 街のマップ例
const initialMap = [
  ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
  ['wall','road','road','road','road','road','road','road','road','road','road','wall'],
  ['wall','road','house','road','tree','road','road','tree','road','house','road','wall'],
  ['wall','road','road','road','road','road','road','road','road','road','road','wall'],
  ['wall','road','tree','road','house','road','road','house','road','tree','road','wall'],
  ['wall','road','road','road','road','road','road','road','road','road','road','wall'],
  ['wall','road','house','road','tree','road','road','tree','road','house','road','wall'],
  ['wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'],
];

const initialPlayer = { x: 1, y: 1 };

function App() {
  const [player, setPlayer] = useState(initialPlayer);
  const [battle, setBattle] = useState(false);


  const movePlayer = React.useCallback((dx: number, dy: number) => {
    const newX = player.x + dx;
    const newY = player.y + dy;
    // 壁以外のみ移動可能
    if (
      newX >= 0 && newX < MAP_WIDTH &&
      newY >= 0 && newY < MAP_HEIGHT &&
      initialMap[newY][newX] !== 'wall'
    ) {
      setPlayer({ x: newX, y: newY });
    }
  }, [player]);

  // WASDキーで移動
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      switch (e.key.toLowerCase()) {
        case 'w': movePlayer(0, -1); break;
        case 'a': movePlayer(-1, 0); break;
        case 's': movePlayer(0, 1); break;
        case 'd': movePlayer(1, 0); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [player, movePlayer]);

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
              let imgSrc = groundImg;
              if (cell === 'wall') imgSrc = wallImg;
              if (cell === 'road') imgSrc = roadImg;
              if (cell === 'house') imgSrc = houseImg;
              if (cell === 'tree') imgSrc = treeImg;
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
