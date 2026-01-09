import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

async function createTransporter() {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      accessToken: accessToken.token!,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, subject, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = await createTransporter();

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_RECEIVER_EMAIL, // ej: ir@wom.cl
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: buildContactTemplate({
        name: fullName,
        email,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Email send failed" },
      { status: 500 }
    );
  }
}

function buildContactTemplate({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .header {
      background: linear-gradient(90deg, #4b1c6b, #2e004f);
      padding: 30px;
      text-align: center;
    }
    .content {
      padding: 40px;
      font-size: 14px;
      line-height: 1.6;
    }
    .label {
      font-weight: bold;
      margin-top: 20px;
    }
    .message-box {
      margin-top: 10px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 6px;
      background: #fafafa;
    }
  </style>
</head>
<body>

  <div class="header">
    <img src="https://tu-dominio.com/assets/wom_empresas_logo.png" width="160" />
  </div>

  <div class="content">
    <p>You have received a new contact request from the WOM Investor Relations web page.</p>

    <p class="label">Name</p>
    <p>${name}</p>

    <p class="label">Email</p>
    <p>${email}</p>

    <p class="label">Message</p>
    <div class="message-box">
      ${message.replace(/\n/g, "<br />")}
    </div>
  </div>

</body>
</html>
`;
}
