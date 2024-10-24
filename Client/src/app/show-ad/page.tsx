"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShowAd from "./ShowAd";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdPositionsPage() {
  const router = useRouter();

  const returnToUserForm = () => {
    router.push(`/user`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card>
      <CardHeader>
        <CardTitle>Bem-vindo!</CardTitle>
      </CardHeader>
      <CardContent>
        <ShowAd />
      </CardContent>
      <CardFooter>
        <Button type="submit" className="ad-positions-return-btn w-full" onClick={returnToUserForm}>
          Voltar ao formulário
        </Button>
      </CardFooter>
    </Card>
    </main>
  );
}