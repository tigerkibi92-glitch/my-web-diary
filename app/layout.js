export const metadata = { title: "나의 웹 다이어리", description: "n8n 연동 웹 다이어리" };

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, fontFamily: "system-ui, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif", background: "#f5f3ef", color: "#222" }}>
        {children}
      </body>
    </html>
  );
}
