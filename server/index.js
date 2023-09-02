import { Server } from "socket.io";

const PORT = 5000;

const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("recieve-changes", delta);
  });
});
