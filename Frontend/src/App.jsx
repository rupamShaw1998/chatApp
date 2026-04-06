import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css'
import Chat from './pages/chat'
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  return (
    <BrowserRouter>
      <h2 style={{ textAlign: 'center' }}>RS Chat App</h2>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
