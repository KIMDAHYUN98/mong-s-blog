export default function AboutScreen() {
  return (
    <div style={{ padding: 6 }}>
      <h2 style={{ margin: 0 }}>About</h2>
      <p style={{ marginTop: 10 }}>
        여기부터 네 소개/경력 요약 들어갈 자리.
      </p>

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        <div style={{ padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)" }}>
          <b>한 줄 소개</b>
          <div style={{ marginTop: 6, color: "#374151" }}>레거시 유지보수 + 기능 개선을 끝까지 완성하는 개발자</div>
        </div>

        <div style={{ padding: 12, borderRadius: 14, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)" }}>
          <b>Links</b>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <a href="https://github.com/your-id" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noreferrer">Blog</a>
          </div>
        </div>
      </div>
    </div>
  );
}
