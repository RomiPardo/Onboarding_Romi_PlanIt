import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Users (Name varchar(255), LastName varchar(255), Email varchar(255) UNIQUE, Business varchar(255), Image varchar(255), HashedPassword varchar(255), Role varchar(255) DEFAULT 'USER');`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
