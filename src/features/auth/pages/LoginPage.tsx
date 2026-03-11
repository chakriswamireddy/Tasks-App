import { Button, Card, Form, Input, Typography, Alert } from "antd"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { loginUser } from "../authSlice"
import { useNavigate } from "react-router-dom"

const { Title } = Typography

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loading, error } = useAppSelector((state) => state.auth)

  const onFinish = async (values: { username: string; password: string }) => {
    const result = await dispatch(loginUser(values))

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <Card className="w-full max-w-md shadow-lg">

        <div className="text-center mb-6">
          <Title level={3}>Task Manager</Title>
          <p className="text-gray-500">Login to continue</p>
        </div>

        {error && (
          <Alert
            type="error"
            message="Login Failed"
            description={error}
            className="mb-4"
          />
        )}

        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            <Input placeholder="test" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter password" }]}
          >
            <Input.Password placeholder="test123" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>

        </Form>

        <div className="text-center text-gray-500 text-sm">
          Demo credentials: test / test123
        </div>

      </Card>
    </div>
  )
}