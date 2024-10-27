import UserForm from "@/components/ui/UserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Informações do usuário</CardTitle>
          <CardDescription>Insira as informações considerando que você seja um usuário efetivamente utilizando a aplicação.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm />
        </CardContent>
      </Card>
    </main>
  );
}