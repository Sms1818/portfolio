import {NextResponse} from "next/server"; import {experience} from "@/lib/portfolio"; export async function GET(){return NextResponse.json(experience)}
