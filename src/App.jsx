import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PendingPosts from "./pages/PendingPosts";
import FinishedLogs from "./pages/FinishedLogs";

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<PendingPosts />} />
          <Route path="/logs" element={<FinishedLogs />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
