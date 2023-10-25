import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    const result =
      await sql`CREATE TABLE Users (Name varchar(255), LastName varchar(255), Email varchar(255) UNIQUE, Business varchar(255), Image varchar(255), HashedPassword varchar(255), Role varchar(255) DEFAULT 'USER');`;
    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}
