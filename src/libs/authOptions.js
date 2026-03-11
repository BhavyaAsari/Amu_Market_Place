import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/Users";
import { mergeCart } from "./cartMergefunction";
import { connectDB } from "@/libs/db";
import { cookies } from "next/headers";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  providers: [

    /* ---------------- GOOGLE ---------------- */
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    /* ---------------- CREDENTIALS ---------------- */
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {

        await connectDB();

        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) return null;

        //  Prevent blocked users
        if (user.status === "blocked") {
          throw new Error("Your account has been blocked");
        }

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          role: user.role,
          status: user.status
        };
      },
    }),
  ],

  callbacks: {

    /* ---------------- SIGN IN ---------------- */
    async signIn({ user, account }) {

      await connectDB();

      try {

        if (account.provider === "google") {

          let existingUser = await User.findOne({ email: user.email });

          //  prevent blocked google users
          if (existingUser?.status === "blocked") {
            return false;
          }

          if (!existingUser) {
            existingUser = await User.create({
              username: user.email.split("@")[0],
              email: user.email,
              provider: "google",
            });
          }

          user.id = existingUser._id.toString();
          user.role = existingUser.role;
          user.status = existingUser.status;
        }

        /*  MERGE GUEST CART */
        const cookieStore = cookies();
        const guestId = cookieStore.get("guest_id")?.value;

        if (guestId && user.id) {
          await mergeCart(user.id, guestId);
        }

      } catch (error) {
        console.error("Error during signIn:", error);
      }

      return true;
    },

    /* ---------------- JWT ---------------- */
    async jwt({ token, user }) {

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }

      return token;
    },

    /* ---------------- SESSION ---------------- */
    async session({ session, token }) {

      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
      }

      return session;
    },
  },
};