"use client";
import {useState, useEffect} from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ShowAd() {

  const getTimeOfDay = () => {
    const d = new Date();
    const h = d.getHours() + (d.getMinutes() / 60);
    console.log("horas", h);
    if (h >= 6 && h < 12) {
      return "Morning";
    }else if (h >= 12 && h < 17) {
      return "Afternoon";
    }else if (h >= 17 && h <= 21) {
      return "Evening";
    }else {
      return "Night";
    }
  }

  const renameGender = (gender) => {
    switch (gender) {
      case "Masculino":
        return "Male";
      case "Feminino":
        return "Female";
      default:
        return "Non-Binary";
    }
  }

  const renameHistory = (history) => {
    switch (history) {
      case "Shopping":
        return "Shopping";
      case "Notícias":
        return "News";
      case "Entretenimento":
        return "Entertainment";
      case "Educação":
        return "Education";
      default:
        return "Social Media";
    }
  }

  const adPositions = ["top", "left", "bottom", "right"];
  let index = Math.floor(Math.random() * 4); //define aleatoriamente a posição onde o anúncio será exibido

  const searchParams = useSearchParams();
  //declara a estrutura para armazenar os dados do usuário com as variáveis já inicializadas
  const [adClickData, setAdClickData] = useState({
    age: searchParams.get('age'),
    //gênero e histórico serão renomeados para armazenar os dados de uma forma similar com a base original de dados
    gender: renameGender(searchParams.get('gender')),
    history: renameHistory(searchParams.get('history')),
    device: searchParams.get('device'),
    timeOfDay: getTimeOfDay(),
    adPosition: adPositions[index],
  });


  const storeAdData = async (clickFlag) => {
    try { //envia uma requisição para armazenar os dados do usuário
        console.log("fazendo uma requisição de armazenamento passando", {...adClickData, click: clickFlag});
        const response = await fetch(`http://localhost:8000/store-ad`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...adClickData, click: clickFlag}),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching ad data:", error);
    }
  };

  const router = useRouter();
  const handleAdClick = () => {
    storeAdData(true);
    router.push(`/ad-clicked?positionIndex=${index}`)
  }

  const returnToUserForm = () => {
    storeAdData(false);
    router.push(`/user`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <div className="ad-positions-container">
      <div className="ad-positions-left-container">
        <div className="ad-positions-user-data">
          <h2 className="bold">Seus dados</h2>
          {adClickData && (
            <div>
              <p>Idade: {adClickData.age}</p>
              <p>Gênero: {adClickData.gender}</p>
              <p>Histórico: {adClickData.history}</p>
              <p>Dispositivo: {adClickData.device}</p>
            </div>
          )}
        </div>
      </div>


      <div className="ad-positions">
        <h2>Exibição de anúncio</h2>
        <Button className={"ad-" + adClickData.adPosition} onClick={() => handleAdClick()}>
            Anúncio exibido
        </Button>
      </div>
    </div>
    <Button className="ad-positions-return-btn w-full" onClick={() => returnToUserForm()}>
          Voltar ao formulário
      </Button>
    </main>
  );
}