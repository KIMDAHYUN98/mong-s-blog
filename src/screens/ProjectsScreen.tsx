import projects from "../data/projects.json";

type P = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export default function ProjectsScreen() {
  const list = projects as P[];

  return (
    <div style={{ padding: 6 }}>
      <h2 style={{ margin: 0 }}>Projects</h2>
      <p style={{ marginTop: 10 }}>카드 클릭하면 GitHub로 이동(일단은 단순하게)</p>

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {list.map((p) => (
          <a
            key={p.id}
            href={p.link}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
              padding: 14,
              borderRadius: 16,
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(0,0,0,0.08)"
            }}
          >
            <div style={{ fontWeight: 700 }}>{p.title}</div>
            <div style={{ marginTop: 6, color: "#374151" }}>{p.description}</div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {p.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.1)",
                    background: "rgba(255,255,255,0.6)"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
