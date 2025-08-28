import { createFileRoute } from "@tanstack/react-router"
import CustomLookup from "../pages/CustomLookup"

export const Route = createFileRoute("/lookup")({
  component: CustomLookup,
})
