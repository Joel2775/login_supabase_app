# Contexto Completo del Proyecto


================================================
📄 ARCHIVO: .env
================================================

EXPO_PUBLIC_SUPABASE_URL=https://rncfkbqxavgqbxoqsvni.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_IahNhYn9s4mqCtxIi3wBbw_6XRS4Jfv


EXPO_PUBLIC_WEB_URL= https://auth-esfot-web-three.vercel.app


================================================
📄 ARCHIVO: .gitignore
================================================

# Learn more https://docs.github.com/en/get-started/getting-started-with-git/ignoring-files

# dependencies
node_modules/
.env

# Expo
.expo/
dist/
web-build/
expo-env.d.ts

# Native
.kotlin/
*.orig.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision

# Metro
.metro-health-check*

# debug
npm-debug.*
yarn-debug.*
yarn-error.*

# macOS
.DS_Store
*.pem

# local env files
.env*.local

# typescript
*.tsbuildinfo

example

# generated native folders
/ios
/android


================================================
📄 ARCHIVO: AGENTS.md
================================================

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md


================================================
📄 ARCHIVO: app\(auth)\forgot-password.tsx
================================================

import { ForgotPasswordPage } from "@/pages/forgot-password/ui/ForgotPasswordPage";
 
export default ForgotPasswordPage;


================================================
📄 ARCHIVO: app\(auth)\login.tsx
================================================

import { LoginPage } from "@/pages/login/ui/LoginPage";
 
export default LoginPage;


================================================
📄 ARCHIVO: app\(auth)\register.tsx
================================================

import { RegisterPage } from "@/pages/register/ui/RegisterPage";
 
export default RegisterPage;


================================================
📄 ARCHIVO: app\(auth)\_layaout.tsx
================================================

import { Stack } from "expo-router";
 
// Layout para las rutas del grupo (auth).
// Todas las pantallas de auth comparten este stack sin header.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
  );
}


================================================
📄 ARCHIVO: app\home.tsx
================================================

import { HomePage } from "@/pages/home/ui/HomePage";
 
export default HomePage;


================================================
📄 ARCHIVO: app\index.tsx
================================================

import { View, ActivityIndicator, StyleSheet } from "react-native";
 
// Esta pantalla se muestra brevemente mientras AuthGuard
// en _layout.tsx determina si el usuario tiene sesión.
export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1B3A6B" />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center",
               alignItems:"center", backgroundColor:"#F0F4FF" },
});


================================================
📄 ARCHIVO: app\_layout.tsx
================================================

import { useEffect } from "react";
import { Stack }     from "expo-router";
import { router }    from "expo-router";
import { QueryProvider } from "@/core/providers/QueryProvider";
import { useSession }    from "@/features/session/model/useSession";
 
// Componente interno que maneja la redirección basada en auth.
// Está dentro de QueryProvider para poder usar useSession.
function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();
 
  useEffect(() => {
    if (isLoading) return; // Esperar a que se cargue la sesión
 
    if (isAuthenticated) {
      // Usuario autenticado → ir a la pantalla principal
      router.replace("/home");
    } else {
      // Sin sesión → ir al login
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);
 
  return null; // Este componente no renderiza nada, solo navega
}
 
export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Grupo de rutas de autenticación */}
        <Stack.Screen name="(auth)" />
        {/* Pantalla principal */}
        <Stack.Screen name="home"  />
        {/* Ruta índice: solo redirige, no muestra nada */}
        <Stack.Screen name="index" />
      </Stack>
      <AuthGuard />
    </QueryProvider>
  );
}


================================================
📄 ARCHIVO: app.json
================================================

{
  "expo": {
    "name": "auth-esfot",
    "slug": "auth-esfot",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "authesfot",
    "userInterfaceStyle": "automatic",
    "ios": {
      "icon": "./assets/expo.icon"
    },
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#E6F4FE",
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      },
      "predictiveBackGestureEnabled": false
    },
    "web": {
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#208AEF",
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 76
        }
      ],
      "expo-secure-store"
    ],
    "experiments": {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}


================================================
📄 ARCHIVO: apps\web\.env
================================================

VITE_SUPABASE_URL=https://rncfkbqxavgqbxoqsvni.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_IahNhYn9s4mqCtxIi3wBbw_6XRS4Jfv

================================================
📄 ARCHIVO: apps\web\.env.local
================================================

# Created by Vercel CLI
VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im1yay00MzAyZWMxYjY3MGY0OGE5OGFkNjFkYWRlNGEyM2JlNyJ9.eyJpc3MiOiJodHRwczovL29pZGMudmVyY2VsLmNvbS9hY29zdGEyMDA0am9lbC04MDE3cy1wcm9qZWN0cyIsInN1YiI6Im93bmVyOmFjb3N0YTIwMDRqb2VsLTgwMTdzLXByb2plY3RzOnByb2plY3Q6YXV0aC1lc2ZvdC13ZWI6ZW52aXJvbm1lbnQ6ZGV2ZWxvcG1lbnQiLCJzY29wZSI6Im93bmVyOmFjb3N0YTIwMDRqb2VsLTgwMTdzLXByb2plY3RzOnByb2plY3Q6YXV0aC1lc2ZvdC13ZWI6ZW52aXJvbm1lbnQ6ZGV2ZWxvcG1lbnQiLCJhdWQiOiJodHRwczovL3ZlcmNlbC5jb20vYWNvc3RhMjAwNGpvZWwtODAxN3MtcHJvamVjdHMiLCJvd25lciI6ImFjb3N0YTIwMDRqb2VsLTgwMTdzLXByb2plY3RzIiwib3duZXJfaWQiOiJ0ZWFtX1pxME9mNmt0cEZ2MU5iRktyR2hYbFlBRSIsInByb2plY3QiOiJhdXRoLWVzZm90LXdlYiIsInByb2plY3RfaWQiOiJwcmpfc3Zxa25uSU5YTWV3aDdpbGFGWXdsYjBTaVRIUiIsImVudmlyb25tZW50IjoiZGV2ZWxvcG1lbnQiLCJwbGFuIjoiaG9iYnkiLCJ1c2VyX2lkIjoiTml2a2szMVpzWkhnN2lBcmd3UXlDR1ZjIiwiY2xpZW50X2lkIjoiY2xfSFl5T1BCTnRGTWZIaGFVbjlMNFFQZlRaejZUUDQ3YnAiLCJhcHBfaWQiOiJjbF9IWXlPUEJOdEZNZkhoYVVuOUw0UVBmVFp6NlRQNDdicCIsIm5iZiI6MTc5MzgyNjMwOSwiaWF0IjoxNzkzODI2MzA5LCJleHAiOjE3OTM4Njk1MDl9.fMTMC2i7pqgaPUR4KsXEyJS0_aEO1QlW_m8dMT9urKT3YkJKXkioy1T3XR53ydXovxxOXSFsLzmMNvaL4DmvrMAjxgixsemiSxsUxCVu_MUHR8jjJhYj_EbhjXkIoRILHm2cXS3HOAPqNp_wHCqmFWjH49R-n-ImZSzNQWCVaWMVTNPoz19SqCettWsC83-1CBxL662s7DWbOInciua_5t4i8pq3Cctw6TW691XnA3quUzirvVP6S4g-fVxxwsjBFTqUm6Wy0EcI7lQ_uVgbTlJv22z1Pc0JcrZLrDSGq7isLvzm0jI59-DgDbYdK2DPlfd-us_lviy4fDgj6cdJeg"


================================================
📄 ARCHIVO: apps\web\.gitignore
================================================

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

.vercel
.env*


================================================
📄 ARCHIVO: apps\web\.vercel\project.json
================================================

{"projectId":"prj_svqknnINXMewh7ilaFYwlb0SiTHR","orgId":"team_Zq0Of6ktpFv1NbFKrGhXlYAE","projectName":"auth-esfot-web"}

================================================
📄 ARCHIVO: apps\web\package.json
================================================

{
  "name": "web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.119.0",
    "react": "^19.3.1",
    "react-dom": "^19.3.1",
    "react-router-dom": "^7.18.5"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.19.2",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "eslint": "^10.13.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.7",
    "globals": "^17.13.0",
    "typescript": "~6.0.3",
    "typescript-eslint": "^8.72.0",
    "vite": "^8.3.5"
  }
}


================================================
📄 ARCHIVO: apps\web\src\app\App.tsx
================================================

import "./styles/global.css";
import { AppRouter } from "./router";

function App() {
  return <AppRouter />;
}

export default App; 


================================================
📄 ARCHIVO: apps\web\src\app\router.tsx
================================================

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
 

================================================
📄 ARCHIVO: apps\web\src\features\confirm-email\model\useConfirmEmail.ts
================================================

import { useState, useEffect } from "react";
import { supabase } from "@/shared/api/supabase";
 
type Status = "loading" | "success" | "error";
 
export const useConfirmEmail = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError]   = useState<string | null>(null);
 
  useEffect(() => {
    // Supabase procesa el token del hash de la URL automáticamente.
    // Escuchamos el evento de cambio de estado para saber si fue exitoso.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === "SIGNED_IN" || event === "USER_UPDATED") {
          setStatus("success");
          // Cerrar la sesión para que el usuario no quede logueado en el web
          await supabase.auth.signOut();
        }
      }
    );
 
    // Timeout: si en 8 segundos no llegó el evento, algo salió mal
    const timeout = setTimeout(() => {
      setStatus(prev => prev === "loading" ? "error" : prev);
      setError("El link de confirmación es inválido o ha expirado.");
    }, 8000);
 
    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);
 
  return { status, error };
};


================================================
📄 ARCHIVO: apps\web\src\features\reset-password\model\useResetPassword.ts
================================================

import { supabase } from "@/shared/api/supabase";
import { useEffect, useState } from "react";

type Status = "loading" | "ready" | "updating" | "success" | "error";

const hasRecoveryTokenInUrl = () => {
  if (typeof window === "undefined") return false;

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;

  const hashParams = new URLSearchParams(hash);
  const queryParams = new URLSearchParams(window.location.search);

  const type = hashParams.get("type") ?? queryParams.get("type");
  const accessToken =
    hashParams.get("access_token") ?? queryParams.get("access_token");
  const tokenHash =
    hashParams.get("token_hash") ?? queryParams.get("token_hash");

  return type === "recovery" && Boolean(accessToken || tokenHash);
};

export const useResetPassword = () => {
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const markReady = () => {
      if (!isActive) return;
      setError(null);
      setStatus("ready");
    };

    const checkRecoveryState = async () => {
      if (hasRecoveryTokenInUrl()) {
        markReady();
        return;
      }

      await supabase.auth.getSession();
      markReady();
    };

    void checkRecoveryState();

    // Supabase emite PASSWORD_RECOVERY cuando detecta el token en la URL
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        // El token puede haberse consumido antes de leer el hash.
        // Si hay sesión válida de recuperación, habilitamos el formulario.
        markReady();
      }
    });

    return () => {
      isActive = false;
      subscription.unsubscribe();
    };
  }, []);

  const updatePassword = async (newPassword: string) => {
    setStatus("updating");
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      const isExpiredOrInvalid = /expired|invalid|session|token|jwt/i.test(
        error.message,
      );

      setError(
        isExpiredOrInvalid
          ? "El link ha expirado o es inválido. Solicita uno nuevo."
          : error.message,
      );
      setStatus("ready");
      return;
    }

    // Cerrar sesión web después de actualizar (el usuario debe entrar en la app)
    await supabase.auth.signOut();
    setStatus("success");
  };

  return { status, error, updatePassword };
};


================================================
📄 ARCHIVO: apps\web\src\features\reset-password\ui\ResetPasswordForm.tsx
================================================

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { useState } from "react";
import { useResetPassword } from "../model/useResetPassword";

export const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [valError, setValError] = useState("");
  const [didSubmit, setDidSubmit] = useState(false);
  const { status, error, updatePassword } = useResetPassword();

  const handleSubmit = async () => {
    setDidSubmit(true);
    setValError("");
    if (password.length < 8) {
      setValError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setValError("Las contraseñas no coinciden.");
      return;
    }
    await updatePassword(password);
  };

  if (status === "loading") {
    return (
      <p style={{ textAlign: "center", color: "#64748B" }}>
        Verificando link...
      </p>
    );
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>✅</div>
        <h3 style={{ color: "#059669", marginBottom: "8px" }}>
          ¡Contraseña actualizada!
        </h3>
        <p style={{ color: "#64748B" }}>
          Regresa a la app móvil e inicia sesión con tu nueva contraseña.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        label="Nueva contraseña"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Mínimo 8 caracteres"
      />
      <Input
        label="Confirmar contraseña"
        type="password"
        value={confirm}
        onChange={setConfirm}
        placeholder="Repite tu contraseña"
      />
      {(valError || (didSubmit && error)) && (
        <p style={{ color: "#DC2626", fontSize: "14px", margin: 0 }}>
          {valError || (didSubmit ? error : null)}
        </p>
      )}
      <Button onClick={handleSubmit} isLoading={status === "updating"}>
        Actualizar contraseña
      </Button>
    </div>
  );
}; 


================================================
📄 ARCHIVO: apps\web\src\main.tsx
================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
 
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


================================================
📄 ARCHIVO: apps\web\src\pages\confirm-email\ui\ConfirmEmailPage.tsx
================================================

import { useConfirmEmail } from "@/features/confirm-email/model/useConfirmEmail";
import type { CSSProperties } from "react";
 
export const ConfirmEmailPage = () => {
  const { status, error } = useConfirmEmail();
 
  const content = () => {
    if (status === "loading") return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"16px" }}>⏳</div>
        <h2 style={{ color:"#1B3A6B" }}>Confirmando tu cuenta...</h2>
        <p style={{ color:"#64748B" }}>Un momento por favor.</p>
      </div>
    );
    if (status === "error") return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"48px", marginBottom:"16px" }}>❌</div>
        <h2 style={{ color:"#DC2626" }}>Link inválido</h2>
        <p style={{ color:"#64748B" }}>{error}</p>
      </div>
    );
    return (
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:"72px", marginBottom:"20px" }}>🎉</div>
        <h2 style={{ color:"#059669", marginBottom:"12px" }}>
          ¡Cuenta confirmada!
        </h2>
        <p style={{ color:"#334155", marginBottom:"8px" }}>
          Tu cuenta ha sido verificada exitosamente.
        </p>
        <p style={{ color:"#64748B", fontWeight:"600" }}>
          Regresa a la aplicación móvil e inicia sesión.
        </p>
      </div>
    );
  };
 
  return (
    <main style={layout}>
      <div style={card}>
        <div style={header}>
          <span style={{ fontSize:"42px" }}>🔐</span>
          <h1 style={{ color:"#fff", margin:"8px 0 4px", fontSize:"22px" }}>
            ESFOT Auth
          </h1>
          <p style={{ color:"rgba(255,255,255,0.7)", margin:0, fontSize:"14px" }}>
            Confirmación de cuenta
          </p>
        </div>
        <div style={{ padding:"36px 32px" }}>{content()}</div>
      </div>
    </main>
  );
};
 
const layout: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "24px",
};
const card: CSSProperties = {
  background: "#fff", borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(27,58,107,0.15)",
  width: "100%", maxWidth: "420px", overflow: "hidden",
};
const header: CSSProperties = {
  background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
  padding: "28px 32px", textAlign: "center",
};


================================================
📄 ARCHIVO: apps\web\src\pages\reset-password\ui\ResetPasswordPage.tsx
================================================

import { ResetPasswordForm } from "@/features/reset-password/ui/ResetPasswordForm";
import type { CSSProperties } from "react";
 
export const ResetPasswordPage = () => (
  <main style={layout}>
    <div style={card}>
      <div style={header}>
        <span style={{ fontSize:"42px" }}>🔑</span>
        <h1 style={{ color:"#fff", margin:"8px 0 4px", fontSize:"22px" }}>
          Nueva contraseña
        </h1>
        <p style={{ color:"rgba(255,255,255,0.7)", margin:0, fontSize:"14px" }}>
          ESFOT Auth — Recuperación de acceso
        </p>
      </div>
      <div style={{ padding:"36px 32px" }}>
        <ResetPasswordForm />
      </div>
    </div>
  </main>
);
 
const layout: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #F0F4FF 0%, #E0EAFF 100%)",
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "24px",
};
const card: CSSProperties = {
  background: "#fff", borderRadius: "20px",
  boxShadow: "0 20px 60px rgba(27,58,107,0.15)",
  width: "100%", maxWidth: "420px", overflow: "hidden",
};
const header: CSSProperties = {
  background: "linear-gradient(135deg, #1B3A6B 0%, #2563EB 100%)",
  padding: "28px 32px", textAlign: "center",
};


================================================
📄 ARCHIVO: apps\web\src\shared\api\supabase.ts
================================================

import { createClient } from "@supabase/supabase-js";
 
const supabaseUrl     = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
 
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno. Revisa tu archivo .env"
  );
}
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


================================================
📄 ARCHIVO: apps\web\src\shared\ui\Button.tsx
================================================

import { ReactNode, CSSProperties } from "react";
 
interface ButtonProps {
  children:  ReactNode;
  onClick?:  () => void;
  type?:     "button" | "submit" | "reset";
  variant?:  "primary" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
}
 
export const Button = ({
  children, onClick, type = "button",
  variant = "primary", disabled, isLoading,
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
 
  const base: CSSProperties = {
    display: "flex", alignItems: "center", justifyContent: "center",
    gap: "8px", padding: "13px 24px", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: isDisabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease", border: "none", width: "100%",
    opacity: isDisabled ? 0.6 : 1,
  };
 
  const styles: Record<string, CSSProperties> = {
    primary: { background: "#1B3A6B", color: "#fff" },
    ghost:   { background: "transparent", color: "#1B3A6B",
               border: "2px solid #1B3A6B" },
  };
 
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{ ...base, ...styles[variant] }}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
};


================================================
📄 ARCHIVO: apps\web\src\shared\ui\Input.tsx
================================================

interface InputProps {
  label:       string;
  type?:       string;
  value:       string;
  onChange:    (v: string) => void;
  placeholder?: string;
  error?:      string;
}
 
export const Input = ({
  label, type = "text", value, onChange, placeholder, error
}: InputProps) => (
  <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
    <label style={{ fontSize:"14px", fontWeight:"500", color:"#334155" }}>
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        padding: "12px 16px",
        border: `1.5px solid ${error ? "#DC2626" : "#CBD5E1"}`,
        borderRadius: "10px",
        fontSize: "15px",
        color: "#0F172A",
        background: "#F8FAFC",
        outline: "none",
        fontFamily: "inherit",
      }}
    />
    {error && (
      <span style={{ fontSize:"12px", color:"#DC2626" }}>{error}</span>
    )}
  </div>
);


================================================
📄 ARCHIVO: apps\web\tsconfig.app.json
================================================

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

================================================
📄 ARCHIVO: apps\web\tsconfig.json
================================================

{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "vite-env.d.ts"]
}

================================================
📄 ARCHIVO: apps\web\tsconfig.node.json
================================================

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}


================================================
📄 ARCHIVO: apps\web\tsconfig.tsbuildinfo
================================================

{"root":["./src/main.tsx","./src/app/app.tsx","./src/app/router.tsx","./src/features/confirm-email/model/useconfirmemail.ts","./src/features/reset-password/model/useresetpassword.ts","./src/features/reset-password/ui/resetpasswordform.tsx","./src/pages/confirm-email/ui/confirmemailpage.tsx","./src/pages/reset-password/ui/resetpasswordpage.tsx","./src/shared/api/supabase.ts","./src/shared/ui/button.tsx","./src/shared/ui/input.tsx","./vite-env.d.ts"],"version":"6.0.3"}

================================================
📄 ARCHIVO: apps\web\vercel.json
================================================

{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}


================================================
📄 ARCHIVO: apps\web\vite-env.d.ts
================================================

/// <reference types= "vite/client" />

interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

================================================
📄 ARCHIVO: apps\web\vite.config.ts
================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});


================================================
📄 ARCHIVO: babel.config.js
================================================

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            ["module-resolver", {root: ["/.src"], alias: {"@": "./src"}}]
        ]
    }
}

================================================
📄 ARCHIVO: example\scripts\reset-project.js
================================================

#!/usr/bin/env node

/**
 * This script is used to reset the project to a blank state.
 * It deletes or moves the /src and /scripts directories to /example based on user input and creates a new /src/app directory with an index.tsx and _layout.tsx file.
 * You can remove the `reset-project` script from package.json and safely delete this file after running it.
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const root = process.cwd();
const oldDirs = ["src", "scripts"];
const exampleDir = "example";
const newAppDir = "src/app";
const exampleDirPath = path.join(root, exampleDir);

const indexContent = `import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const moveDirectories = async (userInput) => {
  try {
    if (userInput === "y") {
      // Create the app-example directory
      await fs.promises.mkdir(exampleDirPath, { recursive: true });
      console.log(`📁 /${exampleDir} directory created.`);
    }

    // Move old directories to new app-example directory or delete them
    for (const dir of oldDirs) {
      const oldDirPath = path.join(root, dir);
      if (fs.existsSync(oldDirPath)) {
        if (userInput === "y") {
          const newDirPath = path.join(root, exampleDir, dir);
          await fs.promises.rename(oldDirPath, newDirPath);
          console.log(`➡️ /${dir} moved to /${exampleDir}/${dir}.`);
        } else {
          await fs.promises.rm(oldDirPath, { recursive: true, force: true });
          console.log(`❌ /${dir} deleted.`);
        }
      } else {
        console.log(`➡️ /${dir} does not exist, skipping.`);
      }
    }

    // Create new /src/app directory
    const newAppDirPath = path.join(root, newAppDir);
    await fs.promises.mkdir(newAppDirPath, { recursive: true });
    console.log("\n📁 New /src/app directory created.");

    // Create index.tsx
    const indexPath = path.join(newAppDirPath, "index.tsx");
    await fs.promises.writeFile(indexPath, indexContent);
    console.log("📄 src/app/index.tsx created.");

    // Create _layout.tsx
    const layoutPath = path.join(newAppDirPath, "_layout.tsx");
    await fs.promises.writeFile(layoutPath, layoutContent);
    console.log("📄 src/app/_layout.tsx created.");

    console.log("\n✅ Project reset complete. Next steps:");
    console.log(
      `1. Run \`npx expo start\` to start a development server.\n2. Edit src/app/index.tsx to edit the main screen.\n3. Put all your application code in /src, only screens and layout files should be in /src/app.${
        userInput === "y"
          ? `\n4. Delete the /${exampleDir} directory when you're done referencing it.`
          : ""
      }`
    );
  } catch (error) {
    console.error(`❌ Error during script execution: ${error.message}`);
  }
};

rl.question(
  "Do you want to move existing files to /example instead of deleting them? (Y/n): ",
  (answer) => {
    const userInput = answer.trim().toLowerCase() || "y";
    if (userInput === "y" || userInput === "n") {
      moveDirectories(userInput).finally(() => rl.close());
    } else {
      console.log("❌ Invalid input. Please enter 'Y' or 'N'.");
      rl.close();
    }
  }
);


================================================
📄 ARCHIVO: example\src\app\explore.tsx
================================================

import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable style={({ pressed }) => pressed && styles.pressed}>
              <ThemedView type="backgroundElement" style={styles.linkButton}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </ThemedView>

        <ThemedView style={styles.sectionsWrapper}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              the tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.imageTutorial}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText type="small">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </ThemedView>
        {Platform.OS === 'web' && <WebBadge />}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
  },
  titleContainer: {
    gap: Spacing.three,
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  centerText: {
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: 'center',
    gap: Spacing.one,
    alignItems: 'center',
  },
  sectionsWrapper: {
    gap: Spacing.five,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  collapsibleContent: {
    alignItems: 'center',
  },
  imageTutorial: {
    width: '100%',
    aspectRatio: 296 / 171,
    borderRadius: Spacing.three,
    marginTop: Spacing.two,
  },
  imageReact: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});


================================================
📄 ARCHIVO: example\src\app\index.tsx
================================================

import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});


================================================
📄 ARCHIVO: example\src\app\_layout.tsx
================================================

import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}


================================================
📄 ARCHIVO: example\src\components\animated-icon.tsx
================================================

import { Image } from 'expo-image';
import * as SplashScreen from 'expo-splash-screen';
import { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    20: {
      opacity: 1,
    },
    70: {
      opacity: 0,
      easing: Easing.elastic(0.7),
    },
    100: {
      opacity: 0,
      transform: [{ scale: 1 }],
      easing: Easing.elastic(0.7),
    },
  });

  const image = <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />;

  return animate ? (
    <Animated.View
      entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
        'worklet';
        if (finished) {
          scheduleOnRN(setVisible, false);
        }
      })}
      style={styles.splashOverlay}>
      {image}
    </Animated.View>
  ) : (
    <View
      onLayout={() => {
        SplashScreen.hideAsync().finally(() => {
          setAnimate(true);
        });
      }}
      style={styles.splashOverlay}>
      {image}
    </View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View entering={keyframe.duration(DURATION)} style={styles.background} />
      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
    width: 128,
    height: 128,
    position: 'absolute',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});


================================================
📄 ARCHIVO: example\src\components\animated-icon.web.tsx
================================================

import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import Animated, { Keyframe, Easing } from 'react-native-reanimated';

import classes from './animated-icon.module.css';
const DURATION = 300;

export function AnimatedSplashOverlay() {
  return null;
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: 0 }],
  },
  60: {
    transform: [{ scale: 1.2 }],
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(1.2),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    opacity: 0,
  },
  60: {
    transform: [{ scale: 1.2 }],
    opacity: 0,
    easing: Easing.elastic(1.2),
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(1.2),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '-180deg' }, { scale: 0.8 }],
    opacity: 0,
  },
  [DURATION / 1000]: {
    transform: [{ rotateZ: '0deg' }, { scale: 1 }],
    opacity: 1,
    easing: Easing.elastic(0.7),
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <Image style={styles.glow} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View style={styles.background} entering={keyframe.duration(DURATION)}>
        <div className={classes.expoLogoBackground} />
      </Animated.View>

      <Animated.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    zIndex: 1000,
    position: 'absolute',
    top: 128 / 2 + 138,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 201,
    height: 201,
    position: 'absolute',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    width: 128,
    height: 128,
    position: 'absolute',
  },
});


================================================
📄 ARCHIVO: example\src\components\app-tabs.tsx
================================================

import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{ selected: { color: colors.text } }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/home.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/explore.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}


================================================
📄 ARCHIVO: example\src\components\app-tabs.web.tsx
================================================

import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import { Pressable, useColorScheme, View, StyleSheet } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors, MaxContentWidth, Spacing } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButtonView}>
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.innerContainer}>
        <ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.externalPressable}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: Spacing.three,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  innerContainer: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.five,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: Spacing.two,
    maxWidth: MaxContentWidth,
  },
  brandText: {
    marginRight: 'auto',
  },
  pressed: {
    opacity: 0.7,
  },
  tabButtonView: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
  },
  externalPressable: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.one,
    marginLeft: Spacing.three,
  },
});


================================================
📄 ARCHIVO: example\src\components\external-link.tsx
================================================

import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          event.preventDefault();
          // Open the link in an in-app browser.
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    />
  );
}


================================================
📄 ARCHIVO: example\src\components\hint-row.tsx
================================================

import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }: HintRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedText type="small">{title}</ThemedText>
      <ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <ThemedText themeColor="textSecondary">{hint}</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});


================================================
📄 ARCHIVO: example\src\components\themed-text.tsx
================================================

import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 500,
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 700,
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 500,
  },
  title: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 52,
  },
  subtitle: {
    fontSize: 32,
    lineHeight: 44,
    fontWeight: 600,
  },
  link: {
    lineHeight: 30,
    fontSize: 14,
  },
  linkPrimary: {
    lineHeight: 30,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: 700 }) ?? 500,
    fontSize: 12,
  },
});


================================================
📄 ARCHIVO: example\src\components\themed-view.tsx
================================================

import { View, type ViewProps } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: ThemeColor;
};

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}


================================================
📄 ARCHIVO: example\src\components\ui\collapsible.tsx
================================================

import { SymbolView } from 'expo-symbols';
import { PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  return (
    <ThemedView>
      <Pressable
        style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]}
        onPress={() => setIsOpen((value) => !value)}>
        <ThemedView type="backgroundElement" style={styles.button}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={14}
            weight="bold"
            tintColor={theme.text}
            style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}
          />
        </ThemedView>

        <ThemedText type="small">{title}</ThemedText>
      </Pressable>
      {isOpen && (
        <Animated.View entering={FadeIn.duration(200)}>
          <ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </ThemedView>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  pressedHeading: {
    opacity: 0.7,
  },
  button: {
    width: Spacing.four,
    height: Spacing.four,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});


================================================
📄 ARCHIVO: example\src\components\web-badge.tsx
================================================

import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import { useColorScheme, StyleSheet } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Spacing } from '@/constants/theme';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.versionText}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badgeImage}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.five,
    alignItems: 'center',
    gap: Spacing.two,
  },
  versionText: {
    textAlign: 'center',
  },
  badgeImage: {
    width: 123,
    aspectRatio: 123 / 24,
  },
});


================================================
📄 ARCHIVO: example\src\constants\theme.ts
================================================

/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;


================================================
📄 ARCHIVO: example\src\hooks\use-color-scheme.ts
================================================

export { useColorScheme } from 'react-native';


================================================
📄 ARCHIVO: example\src\hooks\use-color-scheme.web.ts
================================================

import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}


================================================
📄 ARCHIVO: example\src\hooks\use-theme.ts
================================================

/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useTheme() {
  const scheme = useColorScheme();
  const theme = scheme === 'unspecified' ? 'light' : scheme;

  return Colors[theme];
}


================================================
📄 ARCHIVO: expo-env.d.ts
================================================

/// <reference types="expo/types" />

// NOTE: This file should not be edited and should be in your git ignore

================================================
📄 ARCHIVO: package.json
================================================

{
  "name": "auth-esfot",
  "main": "expo-router/entry",
  "version": "1.0.0",
  "dependencies": {
    "@expo/ui": "~57.0.26",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@supabase/supabase-js": "^2.119.0",
    "@tanstack/react-query": "^5.106.0",
    "expo": "~57.0.31",
    "expo-constants": "~57.0.22",
    "expo-device": "~57.0.2",
    "expo-font": "~57.0.4",
    "expo-glass-effect": "~57.0.4",
    "expo-image": "~57.0.5",
    "expo-linking": "~57.0.13",
    "expo-router": "~57.0.29",
    "expo-secure-store": "~57.0.4",
    "expo-splash-screen": "~57.0.10",
    "expo-status-bar": "~57.0.1",
    "expo-symbols": "~57.0.3",
    "expo-system-ui": "~57.0.4",
    "expo-web-browser": "~57.0.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-native": "0.86.3",
    "react-native-gesture-handler": "~2.32.0",
    "react-native-reanimated": "4.5.1",
    "react-native-safe-area-context": "~5.7.0",
    "react-native-screens": "~4.26.0",
    "react-native-web": "~0.21.0",
    "react-native-worklets": "0.10.1"
  },
  "devDependencies": {
    "@types/react": "~19.2.2",
    "babel-plugin-module-resolver": "^5.0.3",
    "typescript": "~6.0.3"
  },
  "scripts": {
    "start": "expo start",
    "reset-project": "node ./scripts/reset-project.js",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "expo lint"
  },
  "private": true
}


================================================
📄 ARCHIVO: README.md
================================================

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


================================================
📄 ARCHIVO: src\core\providers\QueryProvider.tsx
================================================

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
 
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:               1,           // Reintentar 1 vez si falla
      staleTime:           5 * 60*1000, // Datos frescos por 5 minutos
      refetchOnWindowFocus: true,       // Refetch al volver a la app
    },
    mutations: {
      retry: 0, // No reintentar mutaciones (login, register, etc.)
    },
  },
});
 
interface Props { children: ReactNode; }
 
export const QueryProvider = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);


================================================
📄 ARCHIVO: src\core\styles\theme.ts
================================================

// Token de diseño centralizado.
// Importar desde aquí en todos los StyleSheet.create()
export const theme = {
  colors: {
    primary:     "#1B3A6B",
    primaryDark: "#142D54",
    accent:      "#2563EB",
    success:     "#059669",
    danger:      "#DC2626",
    warning:     "#D97706",
    bg:          "#F0F4FF",
    card:        "#FFFFFF",
    text:        "#0F172A",
    textMid:     "#334155",
    textMuted:   "#64748B",
    border:      "#CBD5E1",
    inputBg:     "#F8FAFC",
  },
  radius: {
    sm: 8, md: 12, lg: 16, xl: 20, full: 9999,
  },
  spacing: {
    xs:4, sm:8, md:16, lg:24, xl:32,
  },
  shadow: {
    card: {
      shadowColor: "#1B3A6B",
      shadowOpacity: 0.12,
      shadowRadius: 20,
      shadowOffset: { width:0, height:8 },
      elevation: 8,
    },
  },
};


================================================
📄 ARCHIVO: src\entities\user\model\types.ts
================================================

import type { User } from "@supabase/supabase-js";
 
// Re-exportamos el tipo User de Supabase para que el resto de la app
// no dependa directamente de @supabase/supabase-js en todas partes.
// Si algún día cambiamos de proveedor, solo cambiamos este archivo.
export type { User };
 
// Tipo de perfil extendido (cuando tengas tabla profiles en Supabase)
export interface UserProfile {
  id:         string;
  email:      string;
  fullName?:  string;
  avatarUrl?: string;
  createdAt:  string;
}


================================================
📄 ARCHIVO: src\features\auth\model\useForgotPassword.ts
================================================

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
 
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          // URL de la página de reset en Vercel.
          // Supabase construye el email con este redirectTo + el token.
          redirectTo:
            `${process.env.EXPO_PUBLIC_WEB_URL}/reset-password`,
        }
      );
      if (error) throw error;
    },
  });
};


================================================
📄 ARCHIVO: src\features\auth\model\useLogin.ts
================================================

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/features/session/model/useSession";
 
interface LoginCredentials {
  email:    string;
  password: string;
}
 
export const useLogin = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Actualización optimista: ponemos la sesión en caché inmediatamente.
      // El listener de onAuthStateChange también la actualizará,
      // pero esta línea garantiza que sea instantáneo.
      queryClient.setQueryData(SESSION_QUERY_KEY, data.session);
    },
  });
};


================================================
📄 ARCHIVO: src\features\auth\model\useRegister.ts
================================================

import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
 
interface RegisterCredentials {
  email:    string;
  password: string;
}
 
export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password }: RegisterCredentials) => {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          // URL de la página de confirmación en Vercel.
          // Supabase incrustará esta URL en el email de confirmación.
          emailRedirectTo:
            `${process.env.EXPO_PUBLIC_WEB_URL}/confirm-email`,
        },
      });
      if (error) throw error;
      return data;
    },
  });
};


================================================
📄 ARCHIVO: src\features\session\model\useSession.ts
================================================

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/shared/api/supabase";
import type { Session } from "@supabase/supabase-js";
 
// Clave canónica de la sesión en TanStack Query.
// Al usar la misma clave en cualquier componente de la app,
// TanStack garantiza que todos lean del mismo caché.
export const SESSION_QUERY_KEY = ["auth", "session"] as const;
 
export const useSession = () => {
  const queryClient = useQueryClient();
 
  // Query que obtiene la sesión actual.
  // TanStack Query la cachea y la comparte con todos los suscriptores.
  const { data: session, isLoading } = useQuery<Session | null>({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
    // La sesión se considera "fresca" por 2 minutos.
    // Después, TanStack la re-fetcha en background automáticamente.
    staleTime: 2 * 60 * 1000,
  });
 
  // Listener de Supabase: cuando el estado de auth cambia
  // (login, logout, token refresh), actualizamos la caché de TanStack.
  // Esto garantiza que la UI se actualice INMEDIATAMENTE sin esperar
  // al siguiente ciclo de refetch.
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        queryClient.setQueryData(SESSION_QUERY_KEY, newSession);
      }
    );
    return () => subscription.unsubscribe();
  }, [queryClient]);
 
  const signOut = async () => {
    await supabase.auth.signOut();
    // Limpiar toda la caché de TanStack al cerrar sesión.
    // Esto evita que datos del usuario anterior persistan.
    queryClient.clear();
  };
 
  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    user: session?.user ?? null,
    signOut,
  };
};


================================================
📄 ARCHIVO: src\pages\forgot-password\ui\ForgotPasswordPage.tsx
================================================

import { useState } from "react";
import {
  View, Text, StyleSheet, KeyboardAvoidingView,
  Platform, Alert, TouchableOpacity
} from "react-native";
import { router }            from "expo-router";
import { useForgotPassword } from "@/features/auth/model/useForgotPassword";
import { Input }             from "@/shared/ui/Input";
import { Button }            from "@/shared/ui/Button";
import { theme }             from "@/core/styles/theme";
 
export const ForgotPasswordPage = () => {
  const [email,   setEmail]   = useState("");
  const [success, setSuccess] = useState(false);
  const forgotPassword = useForgotPassword();
 
  const handleSend = async () => {
    if (!email) {
      Alert.alert("Campo requerido", "Ingresa tu correo electrónico.");
      return;
    }
    try {
      await forgotPassword.mutateAsync(email);
      setSuccess(true);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };
 
  if (success) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.icon}>📧</Text>
        <Text style={styles.successTitle}>¡Email enviado!</Text>
        <Text style={styles.successText}>
          Revisa tu bandeja de entrada en{" "}
          <Text style={{ fontWeight:"700" }}>{email}</Text>.
          {"  "}Haz clic en el link del email para
          establecer tu nueva contraseña.
          {"  "}Una vez cambiada, regresa aquí e inicia sesión.
        </Text>
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text style={styles.link}>← Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
    >
      <View style={styles.inner}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
 
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.logo}>🔑</Text>
            <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
            <Text style={styles.subtitle}>
              Te enviaremos un email para restablecerla
            </Text>
          </View>
          <View style={styles.form}>
            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="tu@correo.com"
            />
            <Button
              onPress={handleSend}
              isLoading={forgotPassword.isPending}
              label="Enviar instrucciones"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  container:        { flex:1, backgroundColor: theme.colors.bg },
  inner:            { flex:1, justifyContent:"center", padding:24 },
  backBtn:          { marginBottom:16 },
  backText:         { color: theme.colors.accent, fontSize:16 },
  card:             { backgroundColor: theme.colors.card, borderRadius:20,
                      overflow:"hidden", ...theme.shadow.card },
  header:           { backgroundColor: theme.colors.primary, padding:32,
                      alignItems:"center" },
  logo:             { fontSize:52, marginBottom:12 },
  title:            { color:"#fff", fontSize:22, fontWeight:"700",
                      textAlign:"center", marginBottom:8 },
  subtitle:         { color:"rgba(255,255,255,0.75)", fontSize:13,
                      textAlign:"center" },
  form:             { padding:28, gap:16 },
  successContainer: { flex:1, backgroundColor: theme.colors.bg,
                      justifyContent:"center", alignItems:"center", padding:32 },
  icon:             { fontSize:72, marginBottom:24 },
  successTitle:     { fontSize:26, fontWeight:"700",
                      color: theme.colors.primary, marginBottom:16 },
  successText:      { fontSize:16, color: theme.colors.textMid,
                      textAlign:"center", lineHeight:24, marginBottom:32 },
  link:             { color: theme.colors.accent, fontSize:15, fontWeight:"600" },
});


================================================
📄 ARCHIVO: src\pages\home\ui\HomePage.tsx
================================================

import {
  View, Text, StyleSheet, SafeAreaView,
  TouchableOpacity, Alert
} from "react-native";
import { useSession } from "@/features/session/model/useSession";
import { Button }     from "@/shared/ui/Button";
import { theme }      from "@/core/styles/theme";
 
export const HomePage = () => {
  const { user, signOut } = useSession();
 
  const handleSignOut = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas salir?",
      [
        { text:"Cancelar", style:"cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => signOut(),
        },
      ]
    );
  };
 
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
 
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>🎓</Text>
          <Text style={styles.headerTitle}>ESFOT</Text>
          <Text style={styles.headerSub}>Tecnología Superior en Desarrollo de Software</Text>
        </View>
 
        {/* Mensaje principal */}
        <View style={styles.card}>
          <Text style={styles.welcomeIcon}>🚀</Text>
          <Text style={styles.welcomeTitle}>¡Bienvenido, lo lograste,{" "}tecnólogo de la ESFOT!</Text>
          <View style={styles.divider} />
          <Text style={styles.challengeText}>
            ¿No fue tan difícil... o sí? 😄
          </Text>
          <Text style={styles.emailText}>{user?.email}</Text>
        </View>
 
        {/* Logros */}
        <View style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>Lo que implementaste:</Text>
          {[
            "✅ Autenticación con Supabase Auth",
            "✅ Tokens persistidos con SecureStore",
            "✅ Estado de sesión con TanStack Query",
            "✅ Arquitectura Feature-Sliced Design",
            "✅ App web en Vercel para auth flows",
          ].map(item => (
            <Text key={item} style={styles.achievement}>{item}</Text>
          ))}
        </View>
 
        {/* Botón de logout */}
        <Button
          onPress={handleSignOut}
          label="Cerrar sesión"
          variant="ghost"
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  safe:              { flex:1, backgroundColor: theme.colors.bg },
  container:         { flex:1, padding:24, gap:20 },
  header:            { backgroundColor: theme.colors.primary, borderRadius:16,
                       padding:24, alignItems:"center", ...theme.shadow.card },
  headerIcon:        { fontSize:48, marginBottom:8 },
  headerTitle:       { color:"#fff", fontSize:28, fontWeight:"800" },
  headerSub:         { color:"rgba(255,255,255,0.75)", fontSize:12,
                       textAlign:"center", marginTop:4 },
  card:              { backgroundColor: theme.colors.card, borderRadius:16,
                       padding:28, alignItems:"center", ...theme.shadow.card },
  welcomeIcon:       { fontSize:56, marginBottom:16 },
  welcomeTitle:      { fontSize:22, fontWeight:"800", color: theme.colors.primary,
                       textAlign:"center", lineHeight:30, marginBottom:16 },
  divider:           { width:"100%", height:1,
                       backgroundColor: theme.colors.border, marginVertical:12 },
  challengeText:     { fontSize:18, color: theme.colors.textMid,
                       fontWeight:"600", marginBottom:8 },
  emailText:         { fontSize:13, color: theme.colors.textMuted },
  achievementsCard:  { backgroundColor: theme.colors.card, borderRadius:16,
                       padding:20, gap:8, ...theme.shadow.card },
  achievementsTitle: { fontSize:15, fontWeight:"700",
                       color: theme.colors.primary, marginBottom:8 },
  achievement:       { fontSize:14, color: theme.colors.textMid },
});


================================================
📄 ARCHIVO: src\pages\login\ui\LoginPage.tsx
================================================

import { useState } from "react";
import {
  View, Text, StyleSheet, KeyboardAvoidingView,
  Platform, Alert, TouchableOpacity, ScrollView
} from "react-native";
import { router }          from "expo-router";
import { useLogin }        from "@/features/auth/model/useLogin";
import { Input }           from "@/shared/ui/Input";
import { Button }          from "@/shared/ui/Button";
import { theme }           from "@/core/styles/theme";
 
export const LoginPage = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos requeridos", "Completa email y contraseña.");
      return;
    }
    try {
      await login.mutateAsync({ email, password });
      // La redirección ocurre automáticamente en _layout.tsx
      // cuando la sesión cambia y AuthGuard detecta isAuthenticated=true
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Credenciales incorrectas.");
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🔐</Text>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>ESFOT — Inicia sesión</Text>
          </View>
 
          {/* Formulario */}
          <View style={styles.form}>
            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="tu@correo.com"
            />
            <Input
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Tu contraseña"
            />
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              style={{ alignSelf:"flex-end" }}
            >
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <Button
              onPress={handleLogin}
              isLoading={login.isPending}
              label="Iniciar sesión"
            />
            <TouchableOpacity
              onPress={() => router.push("../(auth)/register")}
              style={{ alignItems:"center" }}
            >
              <Text style={styles.linkMuted}>
                ¿No tienes cuenta?{" "}
                <Text style={{ color: theme.colors.primary, fontWeight:"700" }}>
                  Regístrate
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: theme.colors.bg },
  scroll:    { flexGrow:1, justifyContent:"center", padding:24 },
  card:      { backgroundColor: theme.colors.card, borderRadius:20,
               overflow:"hidden", ...theme.shadow.card },
  header:    { backgroundColor: theme.colors.primary, padding:32,
               alignItems:"center" },
  logo:      { fontSize:52, marginBottom:12 },
  title:     { color:"#fff", fontSize:26, fontWeight:"700", marginBottom:4 },
  subtitle:  { color:"rgba(255,255,255,0.75)", fontSize:14 },
  form:      { padding:28, gap:16 },
  link:      { color: theme.colors.accent, fontSize:14 },
  linkMuted: { color: theme.colors.textMuted, fontSize:14 },
});


================================================
📄 ARCHIVO: src\pages\register\ui\RegisterPage.tsx
================================================

import { useState } from "react";
import {
  View, Text, StyleSheet, KeyboardAvoidingView,
  Platform, Alert, TouchableOpacity, ScrollView
} from "react-native";
import { router }       from "expo-router";
import { useRegister }  from "@/features/auth/model/useRegister";
import { Input }        from "@/shared/ui/Input";
import { Button }       from "@/shared/ui/Button";
import { theme }        from "@/core/styles/theme";
 
export const RegisterPage = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [success,  setSuccess]  = useState(false);
  const register = useRegister();
 
  const handleRegister = async () => {
    if (!email || !password || !confirm) {
      Alert.alert("Campos requeridos", "Completa todos los campos.");
      return;
    }
    if (password.length < 8) {
      Alert.alert("Contraseña débil", "Mínimo 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    try {
      await register.mutateAsync({ email, password });
      setSuccess(true);
    } catch (err: any) {
      Alert.alert("Error al registrarse", err.message);
    }
  };
 
  if (success) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successIcon}>📬</Text>
        <Text style={styles.successTitle}>¡Revisa tu email!</Text>
        <Text style={styles.successText}>
          Te enviamos un link de confirmación a{" "}
          <Text style={{ fontWeight:"700" }}>{email}</Text>.
          {"  "}Confirma tu cuenta para poder iniciar sesión.
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>← Volver al login</Text>
        </TouchableOpacity>
      </View>
    );
  }
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.logo}>✨</Text>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>ESFOT — Únete ahora</Text>
          </View>
          <View style={styles.form}>
            <Input label="Correo electrónico" value={email}
              onChangeText={setEmail} keyboardType="email-address"
              placeholder="tu@correo.com" />
            <Input label="Contraseña" value={password}
              onChangeText={setPassword} secureTextEntry
              placeholder="Mínimo 8 caracteres" />
            <Input label="Confirmar contraseña" value={confirm}
              onChangeText={setConfirm} secureTextEntry
              placeholder="Repite tu contraseña" />
            <Button onPress={handleRegister}
              isLoading={register.isPending}
              label="Crear cuenta" />
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ alignItems:"center" }}
            >
              <Text style={styles.linkMuted}>
                ¿Ya tienes cuenta?{" "}
                <Text style={{ color: theme.colors.primary, fontWeight:"700" }}>
                  Inicia sesión
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  container:        { flex:1, backgroundColor: theme.colors.bg },
  scroll:           { flexGrow:1, justifyContent:"center", padding:24 },
  card:             { backgroundColor: theme.colors.card, borderRadius:20,
                      overflow:"hidden", ...theme.shadow.card },
  header:           { backgroundColor: theme.colors.primary, padding:32,
                      alignItems:"center" },
  logo:             { fontSize:52, marginBottom:12 },
  title:            { color:"#fff", fontSize:26, fontWeight:"700", marginBottom:4 },
  subtitle:         { color:"rgba(255,255,255,0.75)", fontSize:14 },
  form:             { padding:28, gap:16 },
  link:             { color: theme.colors.accent, fontSize:15,
                      fontWeight:"600", marginTop:8 },
  linkMuted:        { color: theme.colors.textMuted, fontSize:14 },
  successContainer: { flex:1, backgroundColor: theme.colors.bg,
                      justifyContent:"center", alignItems:"center", padding:32 },
  successIcon:      { fontSize:72, marginBottom:24 },
  successTitle:     { fontSize:26, fontWeight:"700",
                      color: theme.colors.primary, marginBottom:16 },
  successText:      { fontSize:16, color: theme.colors.textMid,
                      textAlign:"center", lineHeight:24, marginBottom:32 },
});


================================================
📄 ARCHIVO: src\shared\api\supabase.ts
================================================

import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
 
const supabaseUrl     = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
 
/**
 * Adaptador que conecta el sistema de storage de Supabase Auth
 * con SecureStore de Expo (encriptado con el KeyStore de Android).
 * Cada clave se guarda como una entrada independiente encriptada.
 */
const SecureStoreAdapter = {
  getItem: (key: string): Promise<string | null> =>
    SecureStore.getItemAsync(key),
 
  setItem: (key: string, value: string): Promise<void> =>
    SecureStore.setItemAsync(key, value),
 
  removeItem: (key: string): Promise<void> =>
    SecureStore.deleteItemAsync(key),
};
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage:           SecureStoreAdapter,
    autoRefreshToken:  true,   // Renueva el access_token automáticamente
    persistSession:    true,   // Persiste la sesión entre reinicios de la app
    detectSessionInUrl: false, // En React Native NO hay URL; deshabilitar
  },
});


================================================
📄 ARCHIVO: src\shared\ui\Button.tsx
================================================

import {
  TouchableOpacity, Text, ActivityIndicator, StyleSheet
} from "react-native";
 
interface ButtonProps {
  onPress:    () => void;
  label:      string;
  isLoading?: boolean;
  variant?:   "primary" | "ghost" | "danger";
  disabled?:  boolean;
}
 
export const Button = ({
  onPress, label, isLoading, variant = "primary", disabled
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.base, styles[variant], isDisabled && styles.disabled]}
      activeOpacity={0.8}
    >
      {isLoading
        ? <ActivityIndicator color="#fff" />
        : <Text style={[styles.label, variant === "ghost" && styles.labelGhost]}>{label}</Text>
      }
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  base:        { borderRadius:12, paddingVertical:14, paddingHorizontal:24,
                 alignItems:"center", justifyContent:"center" },
  primary:     { backgroundColor:"#1B3A6B" },
  ghost:       { backgroundColor:"transparent", borderWidth:2, borderColor:"#1B3A6B" },
  danger:      { backgroundColor:"#DC2626" },
  disabled:    { opacity:0.5 },
  label:       { color:"#fff", fontSize:16, fontWeight:"600" },
  labelGhost:  { color:"#1B3A6B" },
});


================================================
📄 ARCHIVO: src\shared\ui\Input.tsx
================================================

import { View, Text, TextInput, StyleSheet } from "react-native";
 
interface InputProps {
  label:           string;
  value:           string;
  onChangeText:    (t: string) => void;
  placeholder?:    string;
  secureTextEntry?: boolean;
  keyboardType?:   "default" | "email-address" | "numeric";
  error?:          string;
  autoCapitalize?: "none" | "sentences" | "words";
}
 
export const Input = ({
  label, value, onChangeText, placeholder,
  secureTextEntry, keyboardType = "default", error,
  autoCapitalize = "none",
}: InputProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      style={[styles.input, error ? styles.inputError : null]}
    />
    {error && <Text style={styles.error}>{error}</Text>}
  </View>
);
 
const styles = StyleSheet.create({
  wrapper:    { gap:6 },
  label:      { fontSize:14, fontWeight:"500", color:"#334155" },
  input:      { borderWidth:1.5, borderColor:"#CBD5E1", borderRadius:10,
                paddingHorizontal:16, paddingVertical:13, fontSize:15,
                color:"#0F172A", backgroundColor:"#F8FAFC" },
  inputError: { borderColor:"#DC2626" },
  error:      { fontSize:12, color:"#DC2626" },
});


================================================
📄 ARCHIVO: tsconfig.json
================================================

{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.d.ts",
    "expo-env.d.ts",
    ".expo/types/**/*.ts"
  ],
  "exclude": [
    "apps/**"
  ]
}
