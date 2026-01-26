'use server';

import { sanityClient, sanityWriteClient } from "@/sanity/lib/sanity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest } from "next/server";

const client = sanityWriteClient;

//pridobi posamezen oglas
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const oglas = await client.getDocument(id);
  return Response.json(oglas);
}

//posodobi oglas
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

//izbriše oglas
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
