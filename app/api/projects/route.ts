import {NextResponse} from "next/server"; import {projects} from "@/lib/portfolio"; export async function GET(){return NextResponse.json(projects)}
