
import { useState } from 'react';
import './App.css';

const MAP_WIDTH = 10;
const MAP_HEIGHT = 6;

const initialMap = Array.from({ length: MAP_HEIGHT }, (_, y) =>
  Array.from({ length: MAP_WIDTH }, (_, x) => (y === 0 || y === MAP_HEIGHT - 1 || x === 0 || x === MAP_WIDTH - 1 ? '■' : ' '))
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
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h1>RPGサンプル</h1>
      <div style={{ fontFamily: 'monospace', display: 'inline-block', background: '#eee', padding: 16 }}>
        {initialMap.map((row, y) => (
          <div key={y}>
            {row.map((cell, x) =>
              x === player.x && y === player.y ? <span key={x} style={{ color: 'blue' }}>＠</span> : <span key={x}>{cell}</span>
            )}
          </div>
        ))}
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
