import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";
import { saveContactMessage } from "@/lib/db-content";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { isValid, errors } = validateContactForm(body);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: Object.values(errors)[0] || "Invalid form input.",
          errors,
        },
        { status: 400 }
      );
    }

    // Persist message directly into MongoDB Atlas
    await saveContactMessage({
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject?.trim() || "Portfolio Inquiry",
      message: body.message.trim(),
    });

    console.log("[Contact Message Received & Saved]:", {
      name: body.name,
      email: body.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message was received successfully.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while processing your message. Please try again.",
      },
      { status: 500 }
    );
  }
}
