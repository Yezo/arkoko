import { Guides } from "../components/Guides.tsx/Guides"
import { Header } from "../components/Header/Header"

export const GuidesPage = () => {
  return (
    <div className="min-h-screen bg-primary text-text">
      <Header />
      <Guides />
    </div>
  )
}
