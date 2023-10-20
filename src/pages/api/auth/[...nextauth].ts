import NextAuth from "next-auth";

import { authOptions } from "~/server/auth";

export default NextAuth({
  providers: [
  ],
  callbacks: {
  },
  secret: process.env.NEXTAUTH_SECRET,
});
