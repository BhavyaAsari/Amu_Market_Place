"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

function LoginButton({ loading }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="ml-5 w-30 text-white bg-[#560864] hover:bg-[#7e0578] hover:cursor-pointer rounded-4xl p-2 disabled:opacity-50 flex justify-center items-center"
    >
      {loading ? "Loading..." : "Login"}
    </button>
  );
}

export function LoginForm() {
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
        toast.success("Login successful!");
        router.refresh(); 
        router.push("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <h1 className="text-2xl font-bold text-white flex justify-center items-center">
        User Login
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <main className="flex flex-col gap-4 justify-center items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/user.svg"
              alt="user_logo"
              width={50}
              height={70}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-white bg-[#323044] border-gray-600 rounded-xl p-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <Image
              src="/lock.svg"
              alt="lock_logo"
              width={40}
              height={70}
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-white bg-[#323044] border-gray-600 rounded-xl p-2"
            />
          </div>
          <LoginButton loading={loading} />
        </main>
      </form>

      <p className="mt-4 text-white flex justify-center items-center text-xl">
        New User?
        <Link href="/signup" className="underline text-[#7B61FF] ml-2">
          Register
        </Link>
      </p>
    </>
  );
}
