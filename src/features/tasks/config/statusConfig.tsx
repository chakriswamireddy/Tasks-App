import {
    ClockCircleOutlined,
    FireOutlined,
    CheckCircleOutlined
  } from "@ant-design/icons"
  
  import type { ReactNode } from "react"
  
  export type StatusConfig = {
    color: string
    bg: string
    border: string
    icon: ReactNode
    label: string
  }
  
  export const statusConfig: Record<string, StatusConfig> = {
    todo: {
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.08)",
      border: "rgba(245,158,11,0.25)",
      icon: <ClockCircleOutlined />,
      label: "To Do",
    },
  
    inprogress: {
      color: "#38bdf8",
      bg: "rgba(56,189,248,0.08)",
      border: "rgba(56,189,248,0.25)",
      icon: <FireOutlined />,
      label: "In Progress",
    },
  
    done: {
      color: "#4ade80",
      bg: "rgba(74,222,128,0.08)",
      border: "rgba(74,222,128,0.25)",
      icon: <CheckCircleOutlined />,
      label: "Done",
    },
  }