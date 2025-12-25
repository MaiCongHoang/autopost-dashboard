import { useEffect, useMemo, useState } from "react";
import { Button, Drawer, Space, Table, message } from "antd";
import dayjs from "dayjs";
import { http } from "../api/http";

export default function FinishedLogs() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await http.get("/api/logs");
      setRows(res.data || []);
    } catch {
      message.error("Không tải được logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const columns = useMemo(() => [
    { title: "ID", dataIndex: "id", width: 70 },
    { title: "Platform", dataIndex: "platform", width: 120 },
    {
      title: "Posted At",
      dataIndex: "posted_at",
      width: 180,
      render: (v) => v ? dayjs(v).format("YYYY-MM-DD HH:mm:ss") : "",
    },
    {
      title: "Short Content",
      dataIndex: "short_content",
      render: (v) => <div style={{ whiteSpace: "pre-wrap", maxWidth: 700 }}>{v}</div>,
    },
    {
      title: "Action",
      width: 120,
      render: (_, r) => (
        <Button onClick={() => { setDetail(r); setOpen(true); }}>View</Button>
      ),
    },
  ], []);

  return (
    <div>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={fetchData}>Refresh</Button>
      </Space>

<Table
  columns={columns}
  dataSource={rows}
  loading={loading}
  rowKey="id"
  size="middle"
  scroll={{ x: 1200 }}
  pagination={{ pageSize: 10 }}
/>


      <Drawer
        title={detail ? `Log #${detail.id}` : "Log"}
        open={open}
        onClose={() => setOpen(false)}
        width={720}
      >
        {detail && (
          <div style={{ whiteSpace: "pre-wrap" }}>
            <b>Platform:</b> {detail.platform}{"\n"}
            <b>Posted At:</b> {detail.posted_at}{"\n"}
            <b>Image Prompt:</b>{"\n"}{detail.image_prompt || ""}{"\n\n"}
            <b>Full Content:</b>{"\n"}{detail.full_content || ""}{"\n"}
          </div>
        )}
      </Drawer>
    </div>
  );
}
