import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./apps/App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./assets/css/main.css";
import { theme } from "./theme/chakra-theme.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
