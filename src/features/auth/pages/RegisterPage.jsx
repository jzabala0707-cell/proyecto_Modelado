import { AuthCardForm } from "../components/AuthCard";
import { FormField } from "../components/FormField";
import { PasswordInput } from "../components/PasswordInput";
import { SubmitButton } from "../components/SubmitButton";
import { Check, X } from "lucide-react";
import { useFormState, useLoading } from "../hooks/useAuthForm";
import { authServices } from "../authServices";
const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};
function PasswordHint({ ok, children }) {
    return (<div className="flex items-center gap-2 text-xs">
      {ok ? <Check className="h-3 w-3 text-success"/> : <X className="h-3 w-3 text-destructive"/>}
      <span className={ok ? "text-success" : "text-destructive"}>{children}</span>
    </div>);
}
export function RegisterPage() {
    const { values, setField } = useFormState(initialForm);
    const { loading, runWithLoading } = useLoading();
    const passwordStrong = authServices.validatePasswordStrength(values.password);
    const passwordsMatch = authServices.validatePasswordsMatch(values.password, values.confirmPassword);
    const formValid = passwordsMatch && passwordStrong;
    const handleRegister = (e) => {
        e.preventDefault();
        if (!formValid)
            return;
        void runWithLoading(() => authServices.register(values));
    };
    const content = (<>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Nombre" id="firstName" name="firstName" placeholder="Juan" value={values.firstName} onChange={(e) => setField("firstName", e.target.value)} required/>
        <FormField label="Apellido" id="lastName" name="lastName" placeholder="Pérez" value={values.lastName} onChange={(e) => setField("lastName", e.target.value)} required/>
      </div>
      <FormField label="Correo Electrónico" id="email" name="email" type="email" placeholder="usuario@ejemplo.com" value={values.email} onChange={(e) => setField("email", e.target.value)} required/>
      <FormField label="Teléfono" id="phone" name="phone" type="tel" placeholder="+57 300 123 4567" value={values.phone} onChange={(e) => setField("phone", e.target.value)} required/>
      <FormField label="Contraseña" id="password" name="password" required hint={values.password ? (<PasswordHint ok={passwordStrong}>Mínimo 8 caracteres</PasswordHint>) : undefined}>
        <PasswordInput id="password" name="password" value={values.password} onChange={(e) => setField("password", e.target.value)} required/>
      </FormField>
      <FormField label="Confirmar Contraseña" id="confirmPassword" name="confirmPassword" required hint={values.confirmPassword ? (<PasswordHint ok={passwordsMatch}>
              Las contraseñas {passwordsMatch ? "coinciden" : "no coinciden"}
            </PasswordHint>) : undefined}>
        <PasswordInput id="confirmPassword" name="confirmPassword" value={values.confirmPassword} onChange={(e) => setField("confirmPassword", e.target.value)} required/>
      </FormField>
    </>);
    const footer = (<>
      <SubmitButton loading={loading} disabled={!formValid} loadingText="Creando cuenta...">
        Crear Cuenta
      </SubmitButton>
      <div className="text-sm text-center text-muted-foreground">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login" className="text-primary hover:underline font-medium">
          Inicia sesión aquí
        </a>
      </div>
    </>);
    return (<AuthCardForm title="Crear Cuenta" description="Regístrate en Arte Tours" maxWidth="max-w-2xl" onSubmit={handleRegister} content={content} footer={footer}/>);
}
