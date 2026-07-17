import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "USE_ACCOUNT_LOGIN", loginUrl: "/login?next=/admin" }, { status: 410 });
}
