import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Building2 } from "lucide-react";
export function AuthCard({ title, description, icon, children, footer, maxWidth = "max-w-md", }) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className={`w-full ${maxWidth} shadow-xl`}>
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {icon ?? <Building2 className="h-8 w-8 text-primary"/>}
          </div>
          <div>
            <CardTitle className="text-3xl">{title}</CardTitle>
            <CardDescription className="text-base mt-2">{description}</CardDescription>
          </div>
        </CardHeader>
        {children && <CardContent className="space-y-4">{children}</CardContent>}
        {footer && <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>}
      </Card>
    </div>);
}
export function AuthCardForm({ onSubmit, content, footer, ...cardProps }) {
    return (<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className={`w-full ${cardProps.maxWidth ?? "max-w-md"} shadow-xl`}>
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            {cardProps.icon ?? <Building2 className="h-8 w-8 text-primary"/>}
          </div>
          <div>
            <CardTitle className="text-3xl">{cardProps.title}</CardTitle>
            <CardDescription className="text-base mt-2">{cardProps.description}</CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">{content}</CardContent>
          <CardFooter className="flex flex-col space-y-4">{footer}</CardFooter>
        </form>
      </Card>
    </div>);
}
