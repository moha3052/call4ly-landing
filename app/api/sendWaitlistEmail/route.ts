import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name,email } = await req.json();

        const data = await resend.emails.send({
            from: "Call4ly <team@call4ly.com>", // skal være dit domæne, der er godkendt
            to: email,
            subject: "Thank you for signing up for Call4ly 🚀",
            html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Thank you for joining the Call4ly waitlist!</h2>
          <p>Hi ${name},</p>
          <p>We're excited to show you how Call4ly can help businesses with AI-powered conversations.</p>
          <p>Here's what you can expect next:</p>
          <ul>
            <li>Exclusive updates about our launch</li>
            <li>Early access to Call4ly before public release</li>
            <li>Special pricing for early adopters</li>
          </ul>
          <p>- The Call4ly Team</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error });
    }
}
