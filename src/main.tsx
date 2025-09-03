import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

import { ThemeProvider } from "./components/ThemeProvider"
import App from "./app"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
