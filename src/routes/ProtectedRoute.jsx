import React from "react";
export function ProtectedRoute({ children }) {
    // En el futuro, agrega aquí la lógica de verificación de sesión/token.
    return <>{children}</>;
}
