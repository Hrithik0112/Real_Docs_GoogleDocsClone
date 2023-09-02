import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const shouldLog = useRef(true);

  useEffect(() => {
    if (shouldLog.current) {
      shouldLog.current = false;
      const quillserver = new Quill("#container", {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      setQuill(quillserver);
    }
  }, []);

  useEffect(() => {
    const socketServer = io("http://localhost:5000");
    setSocket(socketServer);

    return () => {
      socketServer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleChange = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket && socket.emit("send-changes", delta);
    };
    quill && quill.on("text-change", handleChange);

    return () => {
      quill && quill.off("text-changes", handleChange);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket === null || quill === null) return;
    const handleChange = (delta) => {
      quill.updateContents(delta);
    };
    socket && socket.on("recieve-changes", handleChange);

    return () => {
      socket && socket.off("recieve-changes", handleChange);
    };
  }, [socket, quill]);

  return <Box id="container"></Box>;
};

export default Editor;
