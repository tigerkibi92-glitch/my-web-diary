// Next.js API Route: 브라우저 → /api/diary → (서버에서) n8n Webhook
export async function POST(request) {
  const { title, content } = await request.json();

  if (!title || !content) {
    return Response.json({ ok: false, error: "title과 content를 모두 입력하세요." }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return Response.json({ ok: false, error: "서버에 N8N_WEBHOOK_URL 환경변수가 없습니다." }, { status: 500 });
  }

  const n8nRes = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, createdAt: new Date().toISOString() }),
  });

  if (!n8nRes.ok) {
    return Response.json({ ok: false, error: `n8n 응답 오류 (${n8nRes.status})` }, { status: 502 });
  }
  return Response.json({ ok: true });
}
