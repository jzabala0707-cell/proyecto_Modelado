import { useState } from "react";
import { AuthCard, AuthCardForm } from "../components/AuthCard";
import { FormField } from "../components/FormField";
import { SubmitButton } from "../components/SubmitButton";
import { Button } from "@/shared/components/ui/button";
import { Mail, Check } from "lucide-react";
import { useFormState, useLoading } from "../hooks/useAuthForm";
import { authServices } from "../authServices";
export function ForgotPasswordPage() {
    const [sent, setSent] = useState(false);
    const { values, setField } = useFormState({ email: "" });
    const { loading, runWithLoading } = useLoading();
    const handleSubmit = (e) => {
        e.preventDefault();
        void runWithLoading(async () => {
            await authServices.forgotPassword(values.email);
            setSent(true);
        });
    };
    if (!sent) {
        const content = (<FormField label="Correo Electrónico" id="email" name="email" type="email" placeholder="usuario@ejemplo.com" value={values.email} onChange={(e) => setField("email", e.target.value)} required/>);
        const footer = (<>
        <SubmitButton loading={loading} loadingText="Enviando...">
          Enviar Enlace
        </SubmitButton>
        <div className="text-sm text-center">
          <a href="/login" className="text-primary hover:underline font-medium">
            Volver a Iniciar Sesión
          </a>
        </div>
      </>);
        return (<AuthCardForm title="Recuperar Contraseña" description="Ingresa tu correo electrónico y te enviaremos un enlace" icon={<Mail className="h-8 w-8 text-primary"/>} onSubmit={handleSubmit} content={content} footer={footer}/>);
    }
    return (<AuthCard title="Correo Enviado" description="Revisa tu correo electrónico para restablecer tu contraseña" icon={<Check className="h-8 w-8 text-success"/>} footer={<>
          <Button onClick={() => (window.location.href = "/login")} className="w-full">
            Volver a Iniciar Sesión
          </Button>
          <Button variant="outline" onClick={() => setSent(false)} className="w-full">
            Enviar Nuevamente
          </Button>
        </>}/>);
}
