"use client";
import { useSearchParams } from 'next/navigation';



const AdClicked = () => {
    const searchParams = useSearchParams();
    const positions = ["Superior", "Esquerda", "Inferior", "Direita"];
    let index = searchParams.get('positionIndex');
    console.log(index);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>
                {index ? `Você clicou em um anúncio exibido na parte ${positions[index]} da página!`
                        : "O parâmetro de posição está nulo."}
            </h2>
        </main>
    );
}

export default AdClicked;