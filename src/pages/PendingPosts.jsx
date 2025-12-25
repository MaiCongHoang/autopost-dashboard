import { useEffect, useMemo, useState } from "react";
import { Button, Modal, Form, Input, DatePicker, InputNumber, Space, Table, message } from "antd";
import dayjs from "dayjs";
import { http } from "../api/http";

export default function PendingPosts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await http.get("/api/posts", { params: { status: "pending" } });
      setRows(res.data || []);
    } catch {
      message.error("Không tải được pending posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const columns = useMemo(() => [
    { title: "ID", dataIndex: "id", width: 70 },
    {
      title: "Date",
      dataIndex: "schedule_date",
      render: (v) => v ? dayjs(v).format("YYYY-MM-DD") : "",
      width: 140,
    },
    {
      title: "Raw Content",
      dataIndex: "raw_content",
      render: (v) => <div style={{ whiteSpace: "pre-wrap", maxWidth: 600 }}>{v}</div>,
    },
    {
      title: "Actions",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
        </Space>
      ),
    },
  ], []);

  const onAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({
      schedule_date: dayjs(),
    });
    setOpen(true);
  };

  const onEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      schedule_date: dayjs(record.schedule_date),
      raw_content: record.raw_content,
    });
    setOpen(true);
  };

  const onDelete = async (id) => {
    Modal.confirm({
      title: "Xóa bài?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xóa",
      okButtonProps: { danger: true },
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await http.delete(`/api/posts/${id}`);
          message.success("Đã xóa");
          fetchData();
        } catch {
          message.error("Xóa thất bại");
        }
      },
    });
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    const payload = {
      schedule_date: values.schedule_date.format("YYYY-MM-DD"),
      raw_content: values.raw_content,
    };

    try {
      if (editing) {
        await http.put(`/api/posts/${editing.id}`, payload);
        message.success("Đã cập nhật");
      } else {
        await http.post("/api/posts", payload);
        message.success("Đã tạo");
      }
      setOpen(false);
      fetchData();
    } catch {
      message.error("Lưu thất bại");
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={onAdd}>+ Add Pending Post</Button>
        <Button onClick={fetchData}>Refresh</Button>
      </Space>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={rows}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editing ? `Edit Post #${editing.id}` : "Add Pending Post"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onSubmit}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="schedule_date"
            label="Schedule Date"
            rules={[{ required: true, message: "Chọn ngày" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="raw_content"
            label="Raw Content"
            rules={[{ required: true, message: "Nhập nội dung" }]}
          >
            <Input.TextArea rows={6} placeholder="Nội dung đầu vào cho AI..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
