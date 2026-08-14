import { BrowserRouter } from "react-router";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "@/shared/components/ui/sonner";
export default function App() {
    return (<BrowserRouter>
      <AppRoutes />
      <Toaster />
    </BrowserRouter>);
}
