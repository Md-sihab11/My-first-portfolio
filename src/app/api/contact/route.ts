import { NextResponse } from "next/server";
import { validateContactForm } from "@/lib/validations";

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

    // Log the contact message (extend with email service like Resend if needed)
    console.log("[Contact Message Received]:", {
      name: body.name.trim(),
      email: body.email.trim(),
      subject: body.subject?.trim() || "Portfolio Inquiry",
      message: body.message.trim(),
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you for reaching out! Your message was received successfully.",
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An error occurred while processing your message. Please try again.",
      },
      { status: 500 }
    );
  }
}
