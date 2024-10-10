"use client";
import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdPositions() {
  //const router = useRouter();
  const [userData, setUserData] = useState({
    age: 0,
    gender: "",
    history: "",
    device: "",
    timeOfDay: ""
  });

  /*useEffect(() => {
    if (router.isReady) {
      const { age, gender, history, device } = router.query;
      setUserData({ age, gender, history, device });
    }
  }, [router.isReady, router.query]); */
  const searchParams = useSearchParams();

  const age = searchParams.get('age');
  const gender = searchParams.get('gender');
  const history = searchParams.get('history');
  const device = searchParams.get('device');
  const [timeOfDay, setTimeOfDay] = useState("Afternoon");
  useEffect(() => {
    setUserData({ age, gender, history, device, timeOfDay });
  }, [age, gender, history, device, timeOfDay]);

  const [adData, setAdData] = useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    fetchAdData(); //sempre que mudar a hora do dia, atualiza os dados
  }, [userData.timeOfDay]);

  const fetchAdData = async () => {
    //console.log(userData, timeOfDay);
    try {
      const response = await fetch(`http://localhost:8000/ad-positions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });
      const data = await response.json();
      console.log(data);
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
      {userData && (
        <div>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>History: {userData.history}</p>
          <p>Device: {userData.device}</p>
        </div>
      )}
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