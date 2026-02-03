import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [joinRoomId, setJoinRoomId] = useState("");
  const [joining, setJoining] = useState(false);

  const fetchRooms = async () => {
    const res = await axios.get(`${API_URL}/rooms`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
      }
    });
    setRooms(res.data.data);
  };

  const createRoom = async () => {
    await axios.post(
      `${API_URL}/createroom`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
        }
      }
    );
    fetchRooms();
  };

  const joinRoom = async () => {
    if (!joinRoomId.trim()) return;

    try {
      setJoining(true);
      await axios.post(
        `${API_URL}/${joinRoomId}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwttoken")}`
          }
        }
      );
      navigate(`/room/${joinRoomId}`);
    } catch {
      alert("Invalid room ID or access denied");
    } finally {
      setJoining(false);
      setJoinRoomId("");
    }
  };

  useEffect(() => {
    if (!user) return;

    fetchRooms();
  }, [user]);

  useEffect(() => {
    if (rooms.length === 0) return;

    rooms.forEach(r => {
      socket.emit("join-room", r.roomId);
    });
  }, [rooms]);

  useEffect(() => {
    const handler = ({ roomId }) => {
      setRooms(prev =>
        prev.map(r =>
          r.roomId === roomId
            ? {
                ...r,
                participants: [...r.participants, "_"]
              }
            : r
        )
      );
    };

    socket.on("participant-updated", handler);

    return () => socket.off("participant-updated", handler);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back, {user?.name}
            </p>
          </div>

          <button
            onClick={createRoom}
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/20"
          >
            Create Room
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 mb-10 flex gap-3">
          <input
            value={joinRoomId}
            onChange={e => setJoinRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            onClick={joinRoom}
            disabled={joining}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition px-6 rounded-xl font-medium"
          >
            {joining ? "Joining..." : "Join"}
          </button>
        </div>

        {rooms.length === 0 && (
          <div className="text-center text-slate-400 mt-24">
            No rooms yet. Create one or join using a Room ID.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map(room => (
            <div
              key={room._id}
              onClick={() => navigate(`/room/${room.roomId}`)}
              className="cursor-pointer bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20 transition-all"
            >
              <div className="text-slate-400 text-xs mb-1">ROOM ID</div>

              <div className="text-blue-300 font-semibold break-all text-lg">
                {room.roomId}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>Participants</span>
                <span className="font-medium text-white">
                  {room.participants?.length || 0}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
