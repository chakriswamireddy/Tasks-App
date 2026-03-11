import { Button, Popconfirm } from "antd"
import { LogoutOutlined } from "@ant-design/icons"


 

interface LogoutBtnProps {
    handleLogout: () => void
  }

function LogoutBtn({handleLogout}:  LogoutBtnProps) {
  return (
    <Popconfirm
  title="Logout"
  description="Are you sure you want to logout?"
  onConfirm={handleLogout}
  okText="Yes"
  cancelText="Cancel"
  placement="bottomRight"
>
  <Button
    icon={<LogoutOutlined />}
    className="btn-logout"
  >
    Logout
  </Button>
</Popconfirm>
  )
}

export default LogoutBtn
