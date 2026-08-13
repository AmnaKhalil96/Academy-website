import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("🔹 Received Data:", body);

    const googleApiUrl = "https://script.google.com/macros/s/AKfycbzkMlvINgIeA1RIic4ycntwM0qiKHB0z0lxaQiuVI5kU7pJ0m8our40kFa6Q9xrk3k/exec";

    const response = await fetch(googleApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        message: body.message,
        source: body.source || "Other", // 🟢 Default "Other" agar source missing ho
      }),
    });

    const rawText = await response.text();
    let data: unknown = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      // The Google Apps Script endpoint did not return JSON (e.g. an
      // HTML error/permission page). Treat this as an upstream failure
      // instead of crashing on JSON.parse.
      console.error("❌ Google Sheets endpoint returned a non-JSON response:", rawText.slice(0, 300));
      return NextResponse.json(
        { error: "The contact form backend (Google Sheets) is not responding correctly. Please try again later." },
        { status: 502 }
      );
    }
    console.log("🔹 Google Sheets Response Data:", data);

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to submit form to Google Sheets" }, { status: response.status });
    }

    return NextResponse.json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("❌ Form submission error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
