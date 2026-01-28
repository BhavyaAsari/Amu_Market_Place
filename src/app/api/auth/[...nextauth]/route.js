import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/Users";
import { connectDB } from "@/libs/db";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge:  60 * 60, 
  },

  providers: [
    //  GOOGLE LOGIN
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    //  EMAIL / PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({ email: credentials.email });

          if (!user || !user.password) return null;

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) return null;

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.username,
          };
        } catch (error) {
          console.error("Credentials Authorize Error:", error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    //  RUNS ON EVERY SIGN-IN
    async signIn({ user, account }) {
      try {
        await connectDB();

        // Only auto-create user for GOOGLE login
        if (account.provider === "google") {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              username: user.email.split("@")[0],
              email: user.email,
              provider: "google",
            });
          }
        }

        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },

    // STORE USER ID IN JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    //  HYDRATE FULL USER DATA INTO SESSION
    async session({ session, token }) {
      if(token?.id) {

        session.user.id = token.id;
      }

      return session;
    },
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
