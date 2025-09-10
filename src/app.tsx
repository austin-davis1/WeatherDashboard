import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import Landing from "./components/Landing"
import MobileHeader from "./components/MobileHeader"
import Dashboard from "./Dashboard"

export const SidePanelContext = createContext<{
  isSidePanelOpen: boolean
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}>({
  isSidePanelOpen: false,
  setIsSidePanelOpen: () => {},
})

export default function App() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  return (
    <>
      <Landing />
      <SidePanelContext value={{ isSidePanelOpen, setIsSidePanelOpen }}>
        <MobileHeader />
        <Dashboard />
      </SidePanelContext>
    </>
  )
}
