import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  try {
    const { name, email, message, company } = req.body || {}
    if (company) return res.status(200).json({ ok: true })
    if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' })

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.eu',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const html = `<div style="font-family:Inter,Arial,sans-serif;font-size:16px;color:#0f172a">
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p style="white-space:pre-line;"><strong>Message:</strong><br/>${message}</p>
    </div>`

    await transporter.sendMail({
      from: `"Ovidiu Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || process.env.SMTP_USER,
      replyTo: email,
      subject: `New lead from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    })
    res.status(200).json({ ok: true })
  } catch (e) {
    console.error(e)
    res.status(500).json({ error: 'Send failed' })
  }
}
