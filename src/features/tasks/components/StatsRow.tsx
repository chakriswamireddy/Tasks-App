import {
 
    CheckCircleOutlined,
    ClockCircleOutlined,
    FireOutlined,
  } from "@ant-design/icons";


function StatsRow({counts}: any) {
  return (
    <div>
      <div className="stats-row">
        {[
          {
            key: "todo",
            count: counts.todo,
            label: "To Do",
            color: "#f59e0b",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.2)",
            icon: <ClockCircleOutlined />,
          },
          {
            key: "inprogress",
            count: counts.inprogress,
            label: "In Progress",
            color: "#38bdf8",
            bg: "rgba(56,189,248,0.08)",
            border: "rgba(56,189,248,0.2)",
            icon: <FireOutlined />,
          },
          {
            key: "done",
            count: counts.done,
            label: "Completed",
            color: "#4ade80",
            bg: "rgba(74,222,128,0.08)",
            border: "rgba(74,222,128,0.2)",
            icon: <CheckCircleOutlined />,
          },
        ].map((s) => (
          <div
            key={s.key}
            className="stat-chip"
            style={{
              color: s.color,
              background: s.bg,
              borderColor: s.border,
            }}
          >
            {s.icon}
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</span>
            <span
              style={{
                background: s.color,
                color: "#000",
                borderRadius: "6px",
                padding: "1px 7px",
                fontWeight: 700,
                fontSize: 11,
              }}
            >
              {s.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsRow;
