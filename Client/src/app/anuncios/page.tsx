"use client";
import {useState, useEffect} from 'react';

export default function Anuncio({userData}) {
  const [timeOfDay, setTimeOfDay] = useState("Afternoon");
  const [adData, setAdData] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    fetchAdData();
  }, [timeOfDay]);

  const fetchAdData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/ad-positions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData, timeOfDay }),
      });
      const data = await response.json();
      setAdData(data.positions);
    } catch (error) {
      console.error("Error fetching ad data:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Selecione a hora do dia</h2>
      <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
        <option value="Morning">Manhã</option>
        <option value="Afternoon">Tarde</option>
        <option value="Evening">Final de Tarde</option>
        <option value="Night">Noite</option>
      </select>

      <h2>Anúncios exibidos</h2>
      <div className="ad-positions">
        {['top', 'bottom', 'left', 'right'].map((position) => (
          <div key={position} className={`ad-position ${position}`}>
            <p>{position.toUpperCase()}: {adData[position]}%</p>
            {adData[position] > 50 ? (
              <span className="icon green">✔️</span>
            ) : (
              <span className="icon red">❌</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}