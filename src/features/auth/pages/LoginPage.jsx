import { AuthCardForm } from "../components/AuthCard";
import { FormField } from "../components/FormField";
import { PasswordInput } from "../components/PasswordInput";
import { SubmitButton } from "../components/SubmitButton";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useFormState, useLoading } from "../hooks/useAuthForm";
import { authServices } from "../authServices";
export function LoginPage() {
    const { values, setField, handleChange } = useFormState({
        email: "",
        password: "",
    });
    const { loading, runWithLoading } = useLoading();
    const handleLogin = (e) => {
        e.preventDefault();
        void runWithLoading(() => authServices.login({
            email: values.email,
            password: values.password,
        }));
    };
    const content = (<>
      <FormField label="Correo Electrónico" id="email" name="email" type="email" placeholder="usuario@ejemplo.com" value={values.email} onChange={(e) => setField("email", e.target.value)} required/>
      <FormField label="Contraseña" id="password" name="password" required>
        <PasswordInput id="password" name="password" value={values.password} onChange={(e) => setField("password", e.target.value)} required/>
      </FormField>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember"/>
          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
            Recordarme
          </label>
        </div>
        <a href="/forgot-password" className="text-sm text-primary hover:underline">
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </>);
    const footer = (<>
      <SubmitButton loading={loading} loadingText="Iniciando sesión...">
        Iniciar Sesión
      </SubmitButton>
      <div className="text-sm text-center text-muted-foreground">
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-primary hover:underline font-medium">
          Regístrate aquí
        </a>
      </div>
    </>);
    return (<AuthCardForm title="Bienvenido" description="Inicia sesión en Arte Tours" onSubmit={handleLogin} content={content} footer={footer}/>);
}
