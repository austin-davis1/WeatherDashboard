import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

// Import the generated route tree
import { routeTree } from "./routeTree.gen"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "./components/ThemeProvider"

// Create a new router instance
const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
