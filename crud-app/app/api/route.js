import { connectDB } from "@/lib/config/db";
import todo from "@/lib/model/TodoModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
  await connectDB();
};
loadDB();

export async function POST(req) {
  const { title, description } = await req.json();
  await todo.create({
    title,
    description,
  });
  return NextResponse.json({ msg: "Task Created" });
}

export async function GET(req) {
  const todos = await todo.find({});
  return NextResponse.json({ todos });
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  await todo.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Task Deleted" });
}

export async function PUT(req) {
  const id = req.nextUrl.searchParams.get("id");
  await todo.findByIdAndUpdate(id,{
    $set:{
      isComplete : true
    }
  });
  return NextResponse.json({ msg: "Task Updated" });
}

