import {
  Layout,
  Typography,
  Button,
  Card,
  Popconfirm,
  Space,
 
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
 
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { createTask, getTasks, updateTask } from "../taskSlice";
import { logout } from "../../auth/authSlice";
import { type TaskFormValues } from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import type { Task } from "../types";
import '../styles/dbStyles.css'
import StatsRow from "../components/StatsRow";
import LogoutBtn from "../components/LogoutBtn";
import { statusConfig } from "../config/statusConfig";
 

const { Header, Content } = Layout;
const { Title, Text } = Typography;
 

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tasks } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [open, setOpen] = useState(false);

  const handleCreate = async (values: TaskFormValues) => {
    await dispatch(createTask(values));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getTasks());

    console.log("tasks state:", tasks)
console.log("is array:", Array.isArray(tasks))
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const counts = {
    todo: safeTasks.filter((t) => t.status === "todo").length,
    inprogress: safeTasks.filter((t) => t.status === "inprogress").length,
    done: safeTasks.filter((t) => t.status === "done").length,
  };

  return (
    <>
      
      <Layout className="dash-root">
        <TaskModal
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleCreate}
        />
        <div className="grid-bg" />

        <Header className="dash-header">
          <div className="brand">
            <div className="brand-icon">
              <ThunderboltOutlined />
            </div>
            <Title className="brand-name">TaskFlow</Title>
          </div>

          <Space size={10}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="btn-new-task"
              onClick={() => setOpen(true)}
            >
              New Task
            </Button>
            <LogoutBtn handleLogout={handleLogout} />
          </Space>
        </Header>

        <Content className="dash-content">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="page-heading">
              <div className="page-heading-label">
                <ThunderboltOutlined style={{ fontSize: 10 }} />
                Dashboard
              </div>
              <Title className="page-title">Your Workspace</Title>
              <Text className="page-subtitle">
                {tasks.length} task{tasks.length !== 1 ? "s" : ""} in your
                pipeline
              </Text>
            </div>

            <StatsRow counts={counts} />

            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">⚡</div>
                <Title className="empty-title">No tasks yet</Title>
                <Text className="empty-sub">
                  Hit "New Task" to fire things up
                </Text>
              </div>
            ) : (
              <div className="task-grid">
             
                { tasks.length> 0 &&  tasks.map((task, i) => {
                  const cfg = statusConfig[task.status] ?? statusConfig["todo"];
                  return (
                    <Card
                      key={task.id}
                      className="task-card"
                      style={
                        { "--accent-color": cfg.color } as React.CSSProperties
                      }
                      bordered={false}
                    >
                      <div className="task-number">
                        #{String(i + 1).padStart(3, "0")}
                      </div>

                      <Title className="task-title">{task.title}</Title>
                      <Text className="task-desc">{task.description}</Text>

                      <div className="task-footer">
                        <div
                          className="status-pill"
                          style={{
                            color: cfg.color,
                            background: cfg.bg,
                            borderColor: cfg.border,
                          }}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </div>

                        <div className="task-actions">
                          <TaskModal
                            open={!!editingTask}
                            initialValues={editingTask || undefined}
                            onClose={() => setEditingTask(null)}
                            onSubmit={async (values) => {
                              if (!editingTask) return;

                              await dispatch(
                                updateTask({ ...editingTask, ...values })
                              );

                              setEditingTask(null);
                            }}
                          />
                          <Button
                            className="action-btn"
                            onClick={() => setEditingTask(task)}
                            icon={<EditOutlined />}
                          />
                          <Popconfirm
                            title="Delete this task?"
                            okButtonProps={{ danger: true }}
                          >
                            <Button
                              className="action-btn danger"
                              icon={<DeleteOutlined />}
                            />
                          </Popconfirm>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Content>
      </Layout>
    </>
  );
}
