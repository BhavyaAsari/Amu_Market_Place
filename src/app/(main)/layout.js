import NavBar from "@/components/heroComponents/navBar"
import Footer from "@/components/heroComponents/footer"
export const dynamic = "force-dynamic";
export default function MainLAyout({children}) {

    return (
        <main className="min-h-screen flex flex-col ">
            <NavBar/>
            {children}
            <Footer/>
        </main>
    )
}