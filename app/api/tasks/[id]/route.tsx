import { pool } from "@/db/pg_pool";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "ID required" }, { status: 400 });
  }

  await pool.query<Task>('DELETE FROM "tasks" WHERE id = $1', [id]);
  return Response.json({ message: "Success!" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();

  if (!id) {
    return Response.json({ error: "ID required" }, { status: 400 });
  }

  const task = (
    await pool.query<Task>('SELECT * FROM "tasks" WHERE id = $1', [id])
  ).rows[0];

  if (!task) {
    return Response.json({ status: "Task not found" }, { status: 404 });
  }

  await pool.query<Task>('UPDATE "tasks" SET title = $1 WHERE id = $2', [
    body.title,
    id,
  ]);

  return Response.json({
    status: `Task ${id} was successfully edited!`,
  });
}

export async function PATCH({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "ID required" }, { status: 400 });
  }

  const task = (
    await pool.query<Task>('SELECT * FROM "tasks" WHERE id = $1', [id])
  ).rows[0];

  if (!task) {
    return Response.json({ status: "Task not found" }, { status: 404 });
  }

  await pool.query<Task>('UPDATE "tasks" SET completed = $1 WHERE id = $2', [
    !task.completed,
    id,
  ]);

  return Response.json(task);
}
