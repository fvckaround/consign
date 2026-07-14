import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Hardcoded hash — avoids Windows .env $ mangling issues.
// Generated with: node hash.js YourPassword
const ADMIN_EMAIL = "admin@consigndrop.com";
const ADMIN_PASSWORD_HASH = "$2b$10$mFYSHM.Vi4XX6aZu3TXjg.1q6wNHHk6AmUL9zSfO4fnCr4WwbjS1u";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const emailMatch =
          credentials.email.trim().toLowerCase() === ADMIN_EMAIL;
        if (!emailMatch) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          ADMIN_PASSWORD_HASH
        );
        if (!passwordMatch) return null;

        return {
          id: "admin",
          name: "Admin",
          email: ADMIN_EMAIL,
          role: "admin",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin-login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};