import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

/**
 * Email Service for Tansh Immigration
 * Uses Resend API to dispatch consultation inquiry notifications
 */

/**
 * Sends a notification email to RECEIVER_EMAIL for incoming client inquiries
 * @param {Object} inquiry - The consultation inquiry data
 * @returns {Promise<{success: boolean, id?: string, error?: string, skipped?: boolean}>}
 */
export const sendInquiryNotification = async (inquiry) => {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const receiverEmail = (process.env.RECEIVER_EMAIL || process.env.NOTIFICATION_EMAIL || '').trim();
  const fromEmail = (
    process.env.RESEND_FROM_EMAIL || "Tansh Immigration <notifications@noreply.tanshimmigration.com>"
  ).trim();

  if (!apiKey) {
    console.warn('[EmailService] ⚠️ RESEND_API_KEY is not configured in .env. Email skipped.');
    return { skipped: true, reason: 'RESEND_API_KEY missing' };
  }

  if (!receiverEmail) {
    console.warn('[EmailService] ⚠️ RECEIVER_EMAIL is not configured in .env. Email skipped.');
    return { skipped: true, reason: 'RECEIVER_EMAIL missing' };
  }

  try {
    const resend = new Resend(apiKey);

    const formattedDate = new Date(inquiry.createdAt || Date.now()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const subject = `🔔 New Consultation Request: ${inquiry.name} (${inquiry.visaType || 'Visa'}${inquiry.destination ? ` - ${inquiry.destination}` : ''}) - ${inquiry.timeSlot || 'Anytime'}`;

    const textContent = `🔔 NEW CONSULTATION INQUIRY - TANSH IMMIGRATION
===============================================
Inquiry ID: ${inquiry.id || 'N/A'}
Received: ${formattedDate} (IST)

CLIENT CONTACT:
- Full Name: ${inquiry.name}
- Phone Number: ${inquiry.phone}
- Preferred Call Time Slot: ${inquiry.timeSlot || 'Anytime'}
- Email: ${inquiry.email || 'Not provided'}

APPLICATION DETAILS:
- Visa Type: ${inquiry.visaType || 'Not specified'}
- Which Country Visa: ${inquiry.destination || 'Not specified'}
- Education: ${inquiry.education || 'Not provided'}
- Experience: ${inquiry.experience || 'Not provided'}

CLIENT MESSAGE / NOTES:
${inquiry.message || 'No additional message provided'}

-----------------------------------------------
Tansh Immigration Client Notification System
C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad`;

    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f8fb; margin: 0; padding: 24px; color: #0f2a43;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #d6e2fb; overflow: hidden; box-shadow: 0 4px 16px rgba(15,42,67,0.06);">
    <div style="background: linear-gradient(135deg, #0a2a66 0%, #1d6bff 100%); color: #ffffff; padding: 28px 24px;">
      <h1 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff;">🔔 New Consultation Request</h1>
      <p style="margin: 0; opacity: 0.9; font-size: 14px; color: #dbeafe;">A candidate has submitted a consultation request and is expecting a call.</p>
      <div style="display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; margin-top: 12px; color: #ffffff;">
        ID: ${inquiry.id || 'N/A'} &bull; ${formattedDate} IST
      </div>
    </div>
    
    <div style="padding: 24px;">
      <div style="background: #eef5ff; border-left: 4px solid #1d6bff; padding: 14px 18px; border-radius: 6px; margin-bottom: 22px;">
        <div style="font-weight: 700; color: #0a2a66; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Primary Candidate Contact</div>
        <div style="font-size: 19px; font-weight: 800; color: #0a2a66; margin-bottom: 4px;">${inquiry.name}</div>
        <div style="font-size: 16px; margin-bottom: 6px;">
          📞 <a href="tel:${encodeURIComponent(inquiry.phone)}" style="font-weight: 700; color: #1d6bff; text-decoration: none;">${inquiry.phone}</a>
        </div>
        <div style="font-size: 14px; color: #41567c;">
          ⏰ <b>Preferred Call Slot:</b> <span style="background: #dbeafe; color: #0a2a66; font-weight: 700; padding: 2px 8px; border-radius: 4px;">${inquiry.timeSlot || 'Anytime'}</span>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tbody>
          <tr>
            <td style="width: 38%; padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Visa Category</td>
            <td style="width: 62%; padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43; font-weight: 600;">${inquiry.visaType || 'Not specified'}</td>
          </tr>
          ${inquiry.destination ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Which Country Visa</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43; font-weight: 700;">${inquiry.destination}</td>
          </tr>` : ''}
          ${inquiry.email ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;"><a href="mailto:${inquiry.email}" style="color: #1d6bff; text-decoration: none;">${inquiry.email}</a></td>
          </tr>` : ''}
          ${inquiry.education ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Education</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;">${inquiry.education}</td>
          </tr>` : ''}
          ${inquiry.experience ? `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 13px; font-weight: 600; color: #41567c; background-color: #f8fafc;">Work Experience</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #edf2f7; font-size: 14px; color: #0f2a43;">${inquiry.experience}</td>
          </tr>` : ''}
        </tbody>
      </table>

      ${inquiry.message ? `
      <div style="margin-top: 20px;">
        <div style="font-size: 13px; font-weight: 700; color: #41567c; text-transform: uppercase; margin-bottom: 6px;">Client Message / Notes</div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 14px; line-height: 1.5; color: #1e293b; white-space: pre-wrap;">${inquiry.message}</div>
      </div>` : ''}
    </div>

    <div style="padding: 18px 24px; background: #f8fafc; border-top: 1px solid #edf2f7; text-align: center; font-size: 12px; color: #64748b;">
      <p style="margin: 0 0 4px 0;"><b>Tansh Immigration</b> &bull; C-46 BPS Tower, RDC, Raj Nagar, Ghaziabad</p>
      <p style="margin: 0;">Automated consultation lead alert via Resend.</p>
    </div>
  </div>
</body>
</html>`;

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: receiverEmail,
      replyTo: inquiry.email && inquiry.email.includes('@') ? inquiry.email.trim() : undefined,
      subject,
      text: textContent,
      html: htmlContent
    });

    if (emailResponse?.error) {
      console.error('[EmailService] ❌ Resend returned an error:', emailResponse.error.message || emailResponse.error);
      return { success: false, error: emailResponse.error.message || emailResponse.error };
    }

    console.log(`[EmailService] ✅ Email sent to ${receiverEmail} (ID: ${emailResponse?.data?.id || 'OK'})`);
    return { success: true, id: emailResponse?.data?.id };
  } catch (err) {
    console.error('[EmailService] ❌ Failed to send email:', err.message || err);
    return { success: false, error: err.message || err };
  }
};
