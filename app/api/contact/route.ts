import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, service, message } = body

    // Log the form data instead of sending an email
    console.log("Contact form submission:", {
      name,
      email,
      service,
      message,
    })

    // Simulate a successful email sending
    // In production, you would use Resend or another email service here

    // Simulate a delay to mimic network request
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      message: "Form submission received successfully",
      success: true,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process form submission" }, { status: 500 })
  }
}

