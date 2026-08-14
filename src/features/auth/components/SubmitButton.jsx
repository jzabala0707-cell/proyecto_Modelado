import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
export function SubmitButton({ loading, children, loadingText, className = "w-full", type = "submit", disabled, ...props }) {
    return (<Button type={type} className={className} disabled={loading || disabled} {...props}>
      {loading ? (<>
          <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
          {loadingText ?? children}
        </>) : (children)}
    </Button>);
}
