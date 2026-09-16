import {NextResponse} from "next/server"; import {profile} from "@/lib/portfolio"; export async function GET(){return NextResponse.json(profile)}
