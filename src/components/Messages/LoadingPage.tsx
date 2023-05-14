import { Header } from "../Header/Header"
import { BodyContainer } from "../Layout/BodyMainContainer"
import { MainContainer } from "../Layout/MainContainer"
import { LoadingSpinnerSVG } from "./LoadingMessage"

export const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-primary text-text">
      <Header />
      <MainContainer>
        <div className="mt-4 flex min-h-[33rem] items-center justify-center rounded-lg bg-secondary p-6 shadow-md ring-1 ring-black/[.15] sm:min-h-[42rem] lg:min-h-[47rem]">
          <div className="flex h-full items-center justify-center">
            <LoadingSpinnerSVG />
          </div>
        </div>
      </MainContainer>
    </div>
  )
}
