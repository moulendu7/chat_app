import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";
import { Users, Home } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [allowed, setAllowed] = useState(false);
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  useEffect(() => {
  const validateRoom = async () => {
    try {
      await axios.get(
        `${API_URL}/rooms/${roomId}/validate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          }
        }
      );
      setAllowed(true);
    } catch {
      navigate("/dashboard", { replace: true });
    }
  };

  validateRoom();
}, [roomId, navigate]);
  useEffect(() => {
    axios.get(`${API_URL}/${roomId}/getmsg`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwttoken")}` }
    }).then(res => setMessages(res.data));

    axios.get(`${API_URL}/rooms/${roomId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwttoken")}` }
    }).then(res => setParticipants(res.data.data.participants));

    socket.emit("join-room", roomId);

    socket.on("receive-message", msg => {
      setMessages(prev => [...prev, msg]);
    });

    socket.on("participant-updated", ({ roomId: rId }) => {
      if (rId === roomId) {
        axios.get(`${API_URL}/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwttoken")}` }
        }).then(res => setParticipants(res.data.data.participants));
      }
    });

    return () => {
      socket.off("receive-message");
      socket.off("participant-updated");
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    const res = await axios.post(
      `${API_URL}/${roomId}/sendmsg`,
      { text },
      { headers: { Authorization: `Bearer ${localStorage.getItem("jwttoken")}` } }
    );

    socket.emit("send-message", res.data);
    setText("");
  };
  if (!allowed) return null;
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      <div className="flex-1 flex flex-col">

        <div className="h-16 border-b border-slate-700
                        flex items-center justify-between px-6">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <Home size={18} />
            Dashboard
          </button>

          <div className="text-blue-400 font-semibold">
            Room ID: {roomId}
          </div>

          <div className="w-24" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map((m, i) => {
            const mine = m.username === user.name;

            return (
              <div
                key={i}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl
                    ${mine
                      ? "bg-blue-500 rounded-br-sm"
                      : "bg-slate-800 rounded-bl-sm"
                    }`}
                >
                  <div className="text-xs text-slate-300 mb-1">
                    {m.username}
                  </div>
                  <div className="wrap-break-word">{m.message}</div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-slate-700 p-4">
          <div className="flex gap-3">
            <input
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-slate-800
                         border border-slate-700
                         rounded-xl px-4 py-3
                         outline-none focus:border-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700
                         px-6 rounded-xl font-medium"
            >
              Send
            </button>
          </div>
        </div>

      </div>

      <div className="w-64 border-l border-slate-700
                      bg-slate-800 p-4 overflow-y-auto">
        <div className="flex items-center gap-2 text-slate-400 mb-4">
          <Users size={16} />
          Participants ({participants.length})
        </div>

        {participants.map(p => (
          <div
            key={p._id}
            className="bg-slate-900 px-3 py-2
                       rounded-lg mb-2 text-sm"
          >
            {p.name}
          </div>
        ))}
      </div>

    </div>
  );
}
