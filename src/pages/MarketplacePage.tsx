import { Header } from "../components/Header/Header"
import { Marketplace } from "../components/Marketplace/Marketplace"

export const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-primary text-text">
      <Header />
      <Marketplace />
    </div>
  )
}
