import { NextResponse } from "next/server";
import { searchPortfolio } from "@/lib/brain/search";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  return NextResponse.json(searchPortfolio(q));
}
