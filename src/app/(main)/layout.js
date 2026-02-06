import NavBar from "@/components/heroComponents/navBar"
import Footer from "@/components/heroComponents/footer"

export default function MainLAyout({children}) {

    return (
        <main className="min-h-screen flex flex-col ">
            <NavBar/>
            <main className="flex-1">
                {children}
            </main>
            <Footer/>
        </main>
    )
}