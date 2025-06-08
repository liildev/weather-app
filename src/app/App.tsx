import type React from "react"
import { ThemeProvider } from "./providers"
import { ErrorBoundary } from "@/shared/ui/ErrorBoundary"
import { WeatherWidget } from "@/widgets/WeatherWidget"

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <WeatherWidget />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
