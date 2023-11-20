import { DefaultSession } from "next-auth";

declare module "next-auth" {
  type Session = {
    user: User;
  };

  type User = {
    id: string;
    role?: string;
    lastName?: string;
    name?: string;
    email?: string;
    image?: string;
    points?: number;
    contactNumber?: string;
  };
}

declare module "next-auth/jwt" {
  type JWT = {
    id: string;
    role?: string;
    lastName?: string;
    name?: string;
    email?: string;
    image?: string;
    points?: number;
    contactNumber?: string;
  };
}
