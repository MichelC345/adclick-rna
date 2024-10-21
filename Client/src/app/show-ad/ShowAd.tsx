import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ShowAd() {
  const [userData, setUserData] = useState({
    age: 0,
    gender: "",
    history: "",
    device: "",
    timeOfDay: ""
  });

  const adPositions = ["ad-top", "ad-left", "ad-bottom", "ad-right"];

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

  /*useEffect(() => {
    console.log("mudei a hora do dia");
    if (userData.age && userData.gender && userData.history && userData.device) {
      storeAdData(); //sempre que mudar a hora do dia, atualiza os dados
    }
  }, [userData.timeOfDay]);*/

  /*const storeAdData = async () => {
    //console.log(userData, timeOfDay);
    try { //envia uma requisição para armazenar os dados do usuário
            
        console.log("fazendo uma requisição passando", userData);
        const response = await fetch(`http://localhost:8000/show-ad`, {
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
  };*/

  const randomAdPosition = () => {
    let index = Math.floor(Math.random() * 4); //n° aleatório de 0-3
    return adPositions[index]; 
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="ad-positions-container">
      <div className="ad-positions-left-container">
        <div className="ad-positions-user-data">
          <h2 className="bold">Seus dados</h2>
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
        <h2>Exibição de anúncio</h2>
        <Button className={randomAdPosition()}>
            Anúncio exibido
        </Button>
      </div>
    </div>
    </main>
  );
}