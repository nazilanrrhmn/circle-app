import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./apps/App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./assets/css/main.css";
import { theme } from "./theme/chakra-theme.tsx";

// Membuat instance QueryClient
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
<QueryClientProvider client={queryClient}>
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
</QueryClientProvider>
);
