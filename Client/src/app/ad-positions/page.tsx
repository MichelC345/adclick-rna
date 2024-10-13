"use client";
import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdPositions() {
  const router = useRouter();

  const returnToUserForm = () => {
    router.push(`/`);
  };
  
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

  const getIcon = (percentage) => {
    console.log(percentage);
    return percentage > 50 ? "🟢" : "🔴"; // Using green and red circle emojis
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="ad-positions-container">
      <div className="ad-positions-left-container">
        <h2>Selecione a hora do dia</h2>
        <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
          <option value="Morning">Manhã</option>
          <option value="Afternoon">Tarde</option>
          <option value="Evening">Final de Tarde</option>
          <option value="Night">Noite</option>
        </select>

        <div className="ad-positions-user-data">
          <h2>Dados do usuário</h2>
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
        <div className="ad-top">
          {getIcon(adData.top)} {adData.top}% Superior
        </div>
        <div className="ad-left">
          {getIcon(adData.left)} {adData.left}% Esquerda
        </div>
        <div className="ad-bottom">
          {getIcon(adData.bottom)} {adData.bottom}% Inferior
        </div>
        <div className="ad-right">
          {getIcon(adData.right)} {adData.right}% Direita
        </div>
      </div>
    </div>

    <Button type="submit" className="ad-positions-return-btn w-full" onClick={returnToUserForm}>
      Voltar ao início
    </Button>
    </main>
  );
}