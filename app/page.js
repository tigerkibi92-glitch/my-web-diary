"use client";
import { useState } from "react";

export default function DiaryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState(null); // null | "saving" | "ok" | "error"
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("saving");
    try {
      // 브라우저는 n8n을 직접 부르지 않고, 우리 서버의 API Route(/api/diary)로만 보냅니다.
      const res = await fetch("/api/diary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "저장 실패");
      setStatus("ok");
      setMessage(`✅ 저장 완료! "${title}" 일기가 저장되었습니다.`);
    } catch (err) {
      setStatus("error");
      setMessage(`❌ 저장 실패: ${err.message}`);
    }
  }

  const box = { width: "100%", boxSizing: "border-box", padding: 12, fontSize: 16, border: "1px solid #ccc", borderRadius: 8, marginTop: 6 };

  return (
    <main style={{ maxWidth: 560, margin: "48px auto", padding: "0 16px" }}>
      <h1 style={{ fontSize: 28 }}>📔 나의 웹 다이어리</h1>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
        <label style={{ fontWeight: 600 }}>
          제목 (title)
          <input name="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="오늘의 제목" style={box} />
        </label>
        <label style={{ display: "block", marginTop: 16, fontWeight: 600 }}>
          내용 (content)
          <textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} required rows={8} placeholder="오늘 있었던 일을 적어 보세요" style={box} />
        </label>
        <button type="submit" disabled={status === "saving"}
          style={{ marginTop: 16, width: "100%", padding: 14, fontSize: 16, fontWeight: 700, color: "#fff", background: "#1f7a6d", border: 0, borderRadius: 8, cursor: "pointer" }}>
          {status === "saving" ? "저장 중..." : "Submit (저장)"}
        </button>
      </form>
      {(status === "ok" || status === "error") && (
        <div role="status" style={{ marginTop: 16, padding: 16, borderRadius: 8, fontWeight: 600,
          background: status === "ok" ? "#e3f4ea" : "#fde8e8", color: status === "ok" ? "#17603a" : "#9b1c1c" }}>
          {message}
        </div>
      )}
    </main>
  );
}
