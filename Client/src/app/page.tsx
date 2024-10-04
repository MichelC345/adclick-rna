"use client";
import Image from "next/image";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

const formSchema = z
  .object({
    /*emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),*/
    age: z.number(),
    gender: z.enum(["Masculino", "Feminino", "Prefiro não informar"]),
    history: z.enum(["Shopping", "Noticias", "Entretenimento", "Educação", "Redes Sociais"]),
    device: z.enum(["Desktop", "Mobile", "Tablet"]),
  })
  /*.refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    }
  )
  .refine(
    (data) => {
      if (data.accountType === "company") {
        return !!data.companyName;
      }
      return true;
    },
    {
      message: "Company name is required",
      path: ["companyName"],
    }
  );*/


export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      //gender: "",
      //passwordConfirm: "",
      //companyName: "",
    },
  });

  //const accountType = form.watch("accountType");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Idade:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Informe a idade do usuário."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Gênero</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Informe o seu gênero." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Prefiro não informar">Prefiro não dizer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="history"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Histórico de pesquisa</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Informe o histórico de pesquisa do usuário." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Shopping">Shopping</SelectItem>
                      <SelectItem value="Noticias">Notícias</SelectItem>
                      <SelectItem value="Entretenimento">Entretenimento</SelectItem>
                      <SelectItem value="Educação">Educação</SelectItem>
                      <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="device"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tipo de dispositivo</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Informe o tipo de dispositivo do usuário." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="Tablet">Tablet</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
