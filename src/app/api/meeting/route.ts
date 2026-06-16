import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper to format date strings to ICS format (YYYYMMDDTHHMMSS)
function formatICSDate(dateStr: string, timeStr: string) {
  const d = new Date(`${dateStr}T${timeStr}`);
  if (isNaN(d.getTime())) return null;
  
  // Format to local time format: YYYYMMDDTHHMMSS
  const pad = (n: number) => n.toString().padStart(2, '0');
  
  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = '00';

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

// Calculate end time (1 hour later)
function formatICSEndDate(dateStr: string, timeStr: string) {
  const d = new Date(`${dateStr}T${timeStr}`);
  if (isNaN(d.getTime())) return null;
  
  d.setHours(d.getHours() + 1); // 1 hour meeting
  
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
}

// Current UTC timestamp for ICS DTSTAMP
function getICSNow() {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, date, time } = data;

    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const startDateTime = formatICSDate(date, time);
    const endDateTime = formatICSEndDate(date, time);

    if (!startDateTime || !endDateTime) {
       return NextResponse.json(
        { error: 'Invalid date or time' },
        { status: 400 }
      );
    }

    // Generate ICS content
    const uuid = `${Date.now()}@aaconsultancy.com`;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//A&A Consultancy//Meeting Request System//EN',
      'METHOD:REQUEST',
      'BEGIN:VEVENT',
      `UID:${uuid}`,
      `DTSTAMP:${getICSNow()}`,
      `DTSTART:${startDateTime}`,
      `DTEND:${endDateTime}`,
      `SUMMARY:Meeting Request: ${name}`,
      `DESCRIPTION:Requested by: ${name}\\nEmail: ${email}\\nPhone: ${phone || 'Not provided'}`,
      `ORGANIZER;CN="${name}":mailto:${email}`,
      `ATTENDEE;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=TRUE:mailto:${process.env.EMAIL_USER}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\\r\\n');

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email HTML structure
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Meeting Request: ${name} (${date} at ${time})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #8b5cf6;">Meeting Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Requested Date:</strong> ${date}</p>
          <p><strong>Requested Time:</strong> ${time}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #555;">An iCalendar invite (.ics) has been attached to this email. You can add it directly to your calendar.</p>
        </div>
      `,
      attachments: [
        {
          filename: 'invite.ics',
          content: Buffer.from(icsContent, 'utf-8'),
          contentType: 'text/calendar; method=REQUEST'
        },
      ],
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending meeting email:', error);
    return NextResponse.json(
      { error: 'Failed to schedule meeting' },
      { status: 500 }
    );
  }
}
