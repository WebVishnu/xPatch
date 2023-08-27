import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
    const { Name, Email, Number, Description } =
      await request.json();
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      privateKey,
      [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ]
    );
    await auth.authorize();
    const sheets = await google.sheets({
      version: "v4",
      auth,
    });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A3:F",
      insertDataOption: "INSERT_ROWS",
      valueInputOption: "RAW",
      requestBody: {
        values: [[Name, Email, Number, Description]],
      },
    });
    return new Response({
      response,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (e) {
    console.log(e.message);
    return new Response({
      error: true,
      message: e.message,
      status: 403,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }
}
