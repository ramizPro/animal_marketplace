import { createClient } from "@sanity/client";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/lib/auth";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

function getUser(session: Session | null) {
  if (!session?.user) return null;
  return session.user as {
    id: string;
    role: "user" | "admin";
  };
}

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const oglas = await client.getDocument(params.id);
  return Response.json(oglas);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const user = getUser(session);   


  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const oglas: any = await client.getDocument(params.id);

  const isOwner = oglas?.avtor === user.id;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  const data = await req.json();

  const updated = await client
    .patch(params.id)
    .set(data)
    .commit();

  return Response.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const user = getUser(session);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const oglas: any = await client.getDocument(params.id);

  const isOwner = oglas?.avtor === user.id;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  await client.delete(params.id);
  return new Response("Deleted", { status: 200 });
}
