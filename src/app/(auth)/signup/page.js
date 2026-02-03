import Link from "next/link";
import Image from "next/image";
import { SignupForm } from "@/components/authComponents/signupForm";
export default function UserSignUp() {
  return (
     <main
      className="min-h-screen flex items-center justify-center px-4 bg-fill bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/Signup.gif')" }}
    >
      <div
        className="w-full max-w-md sm:max-w-lg
                   rounded-2xl overflow-hidden
                   bg-[#1C1B29]/50 
                   border border-white/10
                   shadow-2xl
                   p-6 sm:p-8 md:p-10"
      >
        <SignupForm />
      </div>
    </main>
  );
}