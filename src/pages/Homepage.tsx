import { Header } from "../components/Header/Header"
import { Home } from "../components/Homepage/Home"

export const Homepage = () => {
  return (
    <>
      <div className="min-h-screen bg-primary text-text">
        <Header />
        <Home />
      </div>
    </>
  )
}
