"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const redirectToAdminPage = () => {
    router.push(`/admin`);
  };

  const redirectToUserPage = () => {
    router.push(`/user`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Bem-vindo!</CardTitle>
          <CardDescription>Selecione uma das telas para testar a aplicação.</CardDescription>
        </CardHeader>
        <CardContent className="justify-between items-center">
          <Button onClick={redirectToAdminPage}>Tela do Administrador</Button>
          <Button onClick={redirectToUserPage} className="mt-5">Tela do Usuário</Button>
        </CardContent>
      </Card>
    </main>
  );
}
