import { Button, Form, Input, Typography, Alert } from "antd"
import {
  ThunderboltOutlined,
  UserOutlined,
  LockOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { loginUser } from "../authSlice"
import { useNavigate } from "react-router-dom"

import '../styles/login.css'

const { Title } = Typography



export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)

  const onFinish = async (values: { username: string; password: string }) => {
    const result = await dispatch(loginUser(values))
    if (loginUser.fulfilled.match(result)) navigate("/dashboard")
  }

  return (
    <>
      <div className="lp-root">
        <div className="lp-grid" />
        <div className="lp-corner lp-corner-tl" />
        <div className="lp-corner lp-corner-br" />

        <div className="lp-card">
          <div className="lp-brand">
            <div className="lp-icon">
              <ThunderboltOutlined />
            </div>
            <div>
              <Title className="lp-title">TaskFlow</Title>
              <div className="lp-subtitle" style={{ marginTop: 6 }}>
                Sign in to your workspace
              </div>
            </div>
          </div>

          <div className="lp-divider" />

          {error && (
            <Alert
              type="error"
              showIcon
              message="Authentication Failed"
              description={error}
              className="lp-alert"
            />
          )}

          <Form layout="vertical" onFinish={onFinish} className="lp-form">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Username is required" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="lp-submit"
                icon={!loading && <ArrowRightOutlined />}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="lp-demo">
            <span className="lp-demo-label">Demo</span>
            <div className="lp-demo-cred">
              <span className="lp-demo-chip">test</span>
              <span className="lp-demo-sep">/</span>
              <span className="lp-demo-chip">test123</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}