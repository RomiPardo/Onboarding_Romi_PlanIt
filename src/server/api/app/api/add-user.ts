import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");
  const business = searchParams.get("business");
  const password = searchParams.get("password");
  const role = searchParams.get("role");
  const image = searchParams.get("image");

  try {
    if (!name || !email || !lastName || !business || !password)
      throw new Error("Name, email, last name, business and password required");

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`INSERT INTO Users (name, lastName, email, business, image, hashedPassword, role)
    VALUES (${name}, ${lastName}, ${email}, ${business}, ${image}, ${hashedPassword}, ${role});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}
