import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdPositions() {
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
    console.log("mudei a hora do dia");
    if (userData.age && userData.gender && userData.history && userData.device) {
      fetchAdData(); //sempre que mudar a hora do dia, atualiza os dados
    }
  }, [userData.timeOfDay]);

  const fetchAdData = async () => {
    //console.log(userData, timeOfDay);
    try {
      console.log("fazendo uma requisição passando", userData);
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

  const getIcon = (percentage) => {
    console.log(percentage);
    return percentage > 50 ? "🟢" : "🔴"; // Using green and red circle emojis
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="ad-positions-container">
      <div className="ad-positions-left-container">
        <h2 className="bold">Selecione a hora do dia</h2>
        <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
          <option value="Morning">Manhã</option>
          <option value="Afternoon">Tarde</option>
          <option value="Evening">Final de Tarde</option>
          <option value="Night">Noite</option>
        </select>

        <div className="ad-positions-user-data">
          <h2 className="bold">Dados do usuário</h2>
          {userData && (
            <div>
              <p>Idade: {userData.age}</p>
              <p>Gênero: {userData.gender}</p>
              <p>Histórico: {userData.history}</p>
              <p>Dispositivo: {userData.device}</p>
            </div>
          )}
        </div>
      </div>


      <div className="ad-positions">
        <h2>Anúncios exibidos</h2>
        <h3>🟢 - Existem maiores chances do usuário clicar</h3>
        <h3>🔴 - Há uma maior probabilidade do usuário não clicar</h3>
        <div className="ad-top">
          {getIcon(adData.top)} {adData.top.toFixed(3)}% Superior
        </div>
        <div className="ad-left">
          {getIcon(adData.left)} {adData.left.toFixed(3)}% Esquerda
        </div>
        <div className="ad-bottom">
          {getIcon(adData.bottom)} {adData.bottom.toFixed(3)}% Inferior
        </div>
        <div className="ad-right">
          {getIcon(adData.right)} {adData.right.toFixed(3)}% Direita
        </div>
      </div>
    </div>
    </main>
  );
}