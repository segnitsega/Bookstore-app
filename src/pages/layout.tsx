import Footer from "@/components/footer"
import NavBar from "@/components/navBar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <>
        <NavBar />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    </div>
  )
}

export default Layout