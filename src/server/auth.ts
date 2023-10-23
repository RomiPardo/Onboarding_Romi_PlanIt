import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import {z} from 'zod';
import bcrypt from 'bcryptjs';
import prisma from "~/server/db";

const loginUserSchema = z.object({
  email: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid email"),
  password: z.string().min(5, "Password should be minimum of 5 characters"),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "domain-login",
      name: "Domain Account",

      credentials: {
        email: { label: "Mail", type: "mail"},
        password: { label: "Password", type: "password"}
      },

      async authorize(credentials, req) {

        const {email, password} = loginUserSchema.parse(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user) return null

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

        if (!isPasswordValid) return null;

        return user;
      }
    })
  ],

  callbacks: {
    async session({session, token}) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id
        }
      };
    },

    async jwt({token, user}) {
      if (user) {
        return {
          ...token,
          id: user.id,
        }
      }

      return token;
    }
  },

  pages: {
    signIn: "/login"
  },

  session: {
    strategy: "jwt"
  },

  secret: process.env.JWT_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};


