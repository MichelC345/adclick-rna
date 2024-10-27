"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShowAd from "./ShowAd";

export default function AdPositionsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <Card>
      <CardHeader>
        <CardTitle>Bem-vindo!</CardTitle>
      </CardHeader>
      <CardContent>
        <ShowAd />
      </CardContent>
    </Card>
    </main>
  );
}