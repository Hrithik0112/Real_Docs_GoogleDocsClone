import { Server } from "socket.io";
import Connection from "./database/db.js";
import { getDocument, updateDocument } from "./controllers/document-controller.js";

const PORT = 5000;
Connection();
const io = new Server(PORT, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);
    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("recieve-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await getDocument(documentId, data);
    });
  });
});
