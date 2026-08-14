import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
export function FormField({ label, id, hint, fieldClassName = "space-y-2", className, children, ...inputProps }) {
    return (<div className={fieldClassName}>
      <Label htmlFor={id}>{label}</Label>
      {children ?? <Input id={id} className={className} {...inputProps}/>}
      {hint}
    </div>);
}
