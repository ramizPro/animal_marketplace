'use server';

import { createClient } from "@sanity/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const client = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// GET /api/oglasi/[id]
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const oglas = await client.getDocument(id);
  return Response.json(oglas);
}

// PUT /api/oglasi/[id]
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const oglas: any = await client.getDocument(id);

  const isOwner = oglas?.avtor === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  const data = await request.json();
  const updated = await client.patch(id).set(data).commit();

  return Response.json(updated);
}

// DELETE /api/oglasi/[id]
export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const oglas: any = await client.getDocument(id);

  const isOwner = oglas?.avtor === session.user.id;
  const isAdmin = session.user.role === "admin";

  if (!isOwner && !isAdmin) {
    return new Response("Forbidden", { status: 403 });
  }

  await client.delete(id);
  return new Response("Deleted", { status: 200 });
}
