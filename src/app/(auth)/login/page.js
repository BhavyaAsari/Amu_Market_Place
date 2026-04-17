import LoginForm from "@/components/authComponents/loginForm"
import { Suspense } from "react";
export default function UserLogin() {

    return (
        <>
      <main
  className="min-h-screen flex items-center justify-center px-4  bg-center bg-fill bg-no-repeat"
  style={{ backgroundImage: "url('/login.gif')" }}
>
  <div className="w-full max-w-md sm:max-w-lg
                   rounded-2xl overflow-hidden
                   bg-[#1C1B29]/50 
                   border border-white/10
                   shadow-2xl
                   p-6 sm:p-8 md:p-10">

    {/* Video / Image Banner */}
    

    {/* Login Section */}
    
     <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
     <div className="p-6 sm:p-8 md:p-10">
      <LoginForm />
    </div>
    </Suspense>

  </div>
</main>

        
        
        </>
    )


}