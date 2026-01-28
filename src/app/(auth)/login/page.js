import { LoginForm } from "@/components/authComponents/loginForm";





export default function UserLogin() {

    return (
        <>
      <main
  className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/security.svg')" }}
>
  <div className="w-full max-w-3xl  rounded-2xl overflow-hidden shadow-2xl bg-[#1C1B29]/90">

    {/* Video / Image Banner */}
    

    {/* Login Section */}
    <div className="p-6 sm:p-8 md:p-10">
      <LoginForm />
    </div>

  </div>
</main>

        
        
        </>
    )


}