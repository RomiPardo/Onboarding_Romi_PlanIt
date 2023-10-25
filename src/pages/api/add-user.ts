import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";
import bcrypt from "bcryptjs";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const name = request.query.name as string;
    const lastName = request.query.lastName as string;
    const email = request.query.email as string;
    const business = request.query.business as string;
    const password = request.query.password as string;
    const role = request.query.role as string;
    const image = request.query.image as string;
    if (!name || !email || !lastName || !business || !password)
      throw new Error("Name, email, last name, business and password required");

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`INSERT INTO Users (name, lastName, email, business, image, hashedPassword, role)
    VALUES (${name}, ${lastName}, ${email}, ${business}, ${image}, ${hashedPassword}, ${role});`;
  } catch (error) {
    return response.status(500).json({ error });
  }

  const users = await sql`SELECT * FROM Users;`;
  return response.status(200).json({ users });
}
