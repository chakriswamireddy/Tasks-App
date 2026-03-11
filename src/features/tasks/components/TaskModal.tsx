import { Modal } from "antd"
import TaskForm, { type TaskFormValues } from "./TaskForm"


type Props = {
  open: boolean
  onClose: () => void
  initialValues?: TaskFormValues
  onSubmit: (values: TaskFormValues) => void
}

export default function TaskModal({
  open,
  onClose,
  initialValues,
  onSubmit
}: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title={initialValues ? "Edit Task" : "Create Task"}
      destroyOnClose
    >
      <TaskForm
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}