import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ResetPasswordPage }  from "@/pages/reset-password/ui/ResetPasswordPage";
import { ConfirmEmailPage } from "@/pages/confirm-email/ui/ConfirmEmailPage"; 
 
export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/confirm-email"  element={<ConfirmEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Ruta por defecto: redirige al confirm-email */}
      <Route path="*" element={<Navigate to="/confirm-email" replace />} />
    </Routes>
  </BrowserRouter>
);
 