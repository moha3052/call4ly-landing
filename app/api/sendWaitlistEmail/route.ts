import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name,email } = await req.json();

        const data = await resend.emails.send({
            from: "Call4ly <support@mail.call4ly.com>", // din ønskede adresse
            to: email,
            subject: "Welcome to Call4ly", // neutral subject (anti-spam)
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Welcome to Call4ly</h2>
                    <p>Hi ${name},</p>
                    <p>Thank you for signing up to learn more about Call4ly.</p>
                    <p>Your registration has been received and we will notify you as soon as the product is ready.</p>
                    <p>Best regards,
                    <br/>
                    The Call4ly Team</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error });
    }
}
