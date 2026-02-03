"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm({ onForget }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Login successful");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Invalid credentials");
      }
    } catch {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white text-center">
        User Login
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Image src="/user.svg" alt="user" width={40} height={40} />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="inputForget"
          />
        </div>

        <div className="flex items-center gap-3">
          <Image src="/lock.svg" alt="lock" width={40} height={40} />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="inputForget"
          />
        </div>

       <div className="flex items-center justify-center sm:flex-row gap-2">
        
         <button className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          className="login-button"
          onClick={() =>
            signIn("google", {
              prompt: "select_account",
              callbackUrl: "/",
            })
          }
        >
          Google
        </button>

       </div>
       
        <p  className="text-white cursor-pointer text-center">
       
          <Link href="/forget-password" className="hover:underline">Forget Password?</Link>
        </p>

        <p className="text-lg text-white text-center">
          Don’t have an account?
          <Link href="/signup" className="ml-2 underline text-[#c82ee3]">
            Register
          </Link>
        </p>
      </form>
    </>
  );
}
