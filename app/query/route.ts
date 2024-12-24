import { db } from "@vercel/postgres";
import { sql } from "@vercel/postgres";
import { createClient } from '@vercel/postgres';

const client = await db.connect();

// const client = createClient();
// await client.connect();

async function listInvoices() {
  const data = await client.sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

  // const data = await client.sql`SELECT * FROM revenue`;
  // const data = await client.sql`SELECT * FROM revenue`;

  return data.rows;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
