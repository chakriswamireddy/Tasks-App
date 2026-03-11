
export const statusOptions = [
  {
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#f59e0b",
            display: "inline-block",
          }}
        />
        To Do
      </span>
    ),
    value: "todo",
  },
  {
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#38bdf8",
            display: "inline-block",
          }}
        />
        In Progress
      </span>
    ),
    value: "inprogress",
  },
  {
    label: (
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        />
        Done
      </span>
    ),
    value: "done",
  },
]