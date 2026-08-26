import { useState } from "react";
import { AuthCard } from "../components/AuthCard";
import { SubmitButton } from "../components/SubmitButton";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/shared/components/ui/card";
import { Mail, Check } from "lucide-react";
import { useLoading } from "../hooks/useAuthForm";
import { authServices } from "../authServices";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../validations/authValidation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { loading, runWithLoading } = useLoading();

  const handleSubmit = (data) => {
    void runWithLoading(async () => {
      await authServices.forgotPassword(data.email);
      setSent(true);
    });
  };

  if (!sent) {
    const content = (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <CardContent className="space-y-4 px-8 pb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
            <SubmitButton loading={loading} loadingText="Enviando...">
              Enviar Enlace
            </SubmitButton>
            <div className="text-sm text-center">
              <a
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Volver a Iniciar Sesión
              </a>
            </div>
          </CardFooter>
        </form>
      </Form>
    );

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4 text-center pb-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-3xl">Recuperar Contraseña</CardTitle>
              <CardDescription className="text-base mt-2">
                Ingresa tu correo electrónico y te enviaremos un enlace
              </CardDescription>
            </div>
          </CardHeader>
          {content}
        </Card>
      </div>
    );
  }

  return (
    <AuthCard
      title="Correo Enviado"
      description="Revisa tu correo electrónico para restablecer tu contraseña"
      icon={<Check className="h-8 w-8 text-success" />}
      footer={
        <>
          <Button
            onClick={() => (window.location.href = "/login")}
            className="w-full"
          >
            Volver a Iniciar Sesión
          </Button>
          <Button
            variant="outline"
            onClick={() => setSent(false)}
            className="w-full"
          >
            Enviar Nuevamente
          </Button>
        </>
      }
    />
  );
}
