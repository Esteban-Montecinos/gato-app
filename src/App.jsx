import { useState } from "react";
const WINER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const GRID = Array.from(Array(9).keys());

const TURNS = {
  "X": "❌",
  "O": "⭕",
};

function App() {
  const [player, setPlayer] = useState(() => {
    const playerFromStorage  = window.localStorage.getItem("player");
      return playerFromStorage ? JSON.parse(playerFromStorage) : TURNS.X;
  });
  const [plays, setPlays] = useState(() =>{
    const playsFromStorage = window.localStorage.getItem("plays");
    
    return playsFromStorage ? new Map(JSON.parse(playsFromStorage)) : new Map(); 
  });
  const [points, setPoints] = useState(() => {
    const pointsFromStorage = window.localStorage.getItem("points");
    return pointsFromStorage ? JSON.parse(pointsFromStorage) : { player1: 0, player2: 0 };
  }
  );

  function handleClick(cell) {
    if (plays.has(cell)) return;

    const draf = new Map(plays);
    draf.set(cell, player);

    const winner = WINER_COMBOS.find((combo) => {
      return combo.every((cell) => draf.get(cell) === player);
    });

    if (!winner && draf.size === 9) {
      setPlays(new Map());
      return;
    }

    setPlays(draf);
    
    setPlayer((prevPlayer) => (prevPlayer === TURNS.X ? TURNS.O : TURNS.X));

    window.localStorage.setItem("plays", JSON.stringify([...plays]));
    window.localStorage.setItem("player", JSON.stringify(player));
    window.localStorage.setItem("points", JSON.stringify(points));
    if (winner) {
      if (player === TURNS.X) {
        setPoints({ player1: points.player1 + 1, player2: points.player2 });
      } else {
        setPoints({ player1: points.player1, player2: points.player2 + 1 });
      }
      setPlays(new Map());
      return;
    }
  }
  function reset() {
    setPlays(new Map());
  }

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-center text-3xl font-bold text-stone-300">Gato 😺</h1>
      <header className="flex justify-between items-center text-center text-xl font-bold text-stone-300">
        <span className={`${TURNS.X === player ? "bg-stone-500 rounded-lg p-2" : ""}`}>❌ {points.player1}</span>
        <span className={`${TURNS.O === player ? "bg-stone-500 rounded-lg p-2" : ""}`}>⭕ {points.player2}</span>
      </header>
      <section className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-stone-900 w-full h-full">
        {GRID.map((i) => (
          <button
            className="rounded-lg w-20 h-20 aspect-square border border-transparent border-solid text-center font-medium text-3xl bg-stone-500 cursor-pointer transition-colors hover:border-emerald-100"
            key={i}
            onClick={() => handleClick(i)}
          >
            {plays.get(i)}
          </button>
        ))}
      </section>
      <footer className="flex justify-center items-center text-center text-xl font-bold text-stone-300">
        <button
          className="bg-stone-900 py-2 px-4 rounded-lg"
          onClick={() => reset()}
        >
          Reiniciar partida
        </button>
      </footer>
    </main>
  );
}

export default App;
