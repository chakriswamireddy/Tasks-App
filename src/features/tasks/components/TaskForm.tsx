import { Form, Input, Select, Button } from "antd"
import {
  EditOutlined,
  TagOutlined,
  ThunderboltOutlined,
  CheckOutlined,
} from "@ant-design/icons"
import '../styles/taskForm.css'
import { statusOptions } from "../config/statusOptions"


const { TextArea } = Input

export type TaskFormValues = {
  title: string
  description: string
  status: "todo" | "inprogress" | "done"
}

type Props = {
  initialValues?: TaskFormValues
  loading?: boolean
  onSubmit: (values: TaskFormValues) => void
}





export default function TaskForm({ initialValues, loading, onSubmit }: Props) {
  const [form] = Form.useForm()

  const handleFinish = (values: TaskFormValues) => {
    onSubmit(values)
    form.resetFields()
  }

  const isEdit = !!initialValues

  return (
    <>

    
      <div style={{ marginBottom: 0 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: "#6366f1",
          letterSpacing: 2,
          textTransform: "uppercase",
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.2)",
          padding: "4px 12px",
          borderRadius: 20,
          marginBottom: 12,
        }}>
          <ThunderboltOutlined style={{ fontSize: 9 }} />
          {isEdit ? "Edit Task" : "New Task"}
        </div>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 26,
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: -0.5,
          lineHeight: 1.1,
        }}>
          {isEdit ? "Update your task" : "Create a task"}
        </div>
      </div>

      <div className="tf-divider" />

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues || { title: "", description: "", status: "todo" }}
        onFinish={handleFinish}
        className="tf-wrap"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Task title is required" }]}
        >
          <Input
            prefix={<EditOutlined />}
            placeholder="What needs to be done?"
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea
            rows={4}
            placeholder="Add details, context, or notes..."
          />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true }]}
        >
          <Select
            options={statusOptions}
            suffixIcon={<TagOutlined style={{ fontSize: 12 }} />}
          />
        </Form.Item>

        <div className="tf-divider" />

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="tf-submit-btn"
            icon={isEdit ? <CheckOutlined /> : <ThunderboltOutlined />}
          >
            {isEdit ? "Save Changes" : "Create Task"}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}