import { type GetServerSidePropsContext } from "next";
import { getServerSession, type NextAuthOptions, type User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "~/server/db";
import { LoginUserSchema } from "./schemas/userSchema";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      async authorize(credentials, req) {
        const result = LoginUserSchema.safeParse(credentials);

        if (result.success) {
          const { email, password } = result.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          const isPasswordValid = await bcrypt.compare(
            password,
            user.hashedPassword,
          );

          if (!isPasswordValid) return null;

          return user;
        } else {
          console.error("Validation errors:", result.error.issues);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          lastName: token.lastName,
          name: token.name,
          email: token.email,
          image: token.image,
        },
      };
    },

    jwt({ token, user }) {
      const currentUser = user as User;

      if (user) {
        return {
          ...token,
          id: currentUser.id,
          role: currentUser.role,
          lastName: currentUser.lastName,
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image,
        };
      }

      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
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
