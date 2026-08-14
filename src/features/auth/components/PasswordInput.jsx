import { Input } from "@/shared/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { usePasswordVisibility } from "../hooks/useAuthForm";
import { forwardRef } from "react";
export const PasswordInput = forwardRef(function PasswordInput({ id, placeholder = "••••••••", className, ...props }, ref) {
    const { visible, toggle } = usePasswordVisibility(false);
    return (<div className="relative">
        <Input ref={ref} id={id} type={visible ? "text" : "password"} placeholder={placeholder} className={className} {...props}/>
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
          {visible ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
        </button>
      </div>);
});
