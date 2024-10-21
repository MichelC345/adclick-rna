import HypotheticalUserForm from "@/components/ui/HypotheticalUserForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card>
        <CardHeader>
          <CardTitle>Informações de um usuário hipotético</CardTitle>
          <CardDescription>Insira as informações de um usuário hipotético para observar as predições relacionadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <HypotheticalUserForm />
        </CardContent>
      </Card>
    </main>
  );
}