import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name,email } = await req.json();

        const data = await resend.emails.send({
            from: "Call4ly <support@mail.call4ly.com>", // din ønskede adresse
            to: email,
            subject: "Velkommen til Call4ly", // neutral subject (anti-spam)
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Velkommen til Call4ly</h2>
                    <p>Hej ${name},</p>
                    <p>Tak fordi du tilmeldte dig for at lære mere om Call4ly.</p>
                    <p>Din tilmelding er blevet modtaget, og vi vil kontakte dig, så snart produktet er klar.</p>
                    <p>Venlig hilsen,
                    <br/>
                    Call4ly-teamet</p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error });
    }
}
