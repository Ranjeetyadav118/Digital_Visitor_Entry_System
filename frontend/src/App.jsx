import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateVisitorPage from "./pages/CreateVisitorPage";
import VisitorDetailPage from "./pages/VisitorDetailPage";

function App() {

  return (
 <div data-theme="luxury">
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />

        <Route path="/create" element={<CreateVisitorPage />} />

        <Route path="/edit/:id" element={<CreateVisitorPage />} />

        <Route path="/visitors/:id" element={<VisitorDetailPage />} />

      </Routes>

      <Toaster position="top-right" />

    </BrowserRouter>

    </div>

  );

}

export default App;