import { Database } from "../components/Database/Database"
import { Header } from "../components/Header/Header"

export const DatabasePage = () => {
  return (
    <div className="min-h-screen bg-primary text-text">
      <Header />
      <Database />
    </div>
  )
}
