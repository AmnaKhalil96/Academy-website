import { NextRequest, NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwDZdhIcqeNEzzm4cAr3u66Qg1KtvAb1A_2ibacbgKaPBr_o7zWXzFfr1ytA4he1N7uaQ/exec";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const rawText = await response.text();
    let data: unknown = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      // The Google Apps Script endpoint did not return JSON (e.g. an
      // HTML error/permission page). Treat this as an upstream failure
      // instead of crashing on JSON.parse.
      console.error('Payment submission endpoint returned a non-JSON response:', rawText.slice(0, 300));
      return NextResponse.json(
        { status: 'error', message: 'The enrollment/payment backend (Google Sheets) is not responding correctly. Please try again later.' },
        { status: 502 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { status: 'error', message: 'Failed to submit form' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

