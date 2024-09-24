import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import "./DocsDetail.scss";

const SAVE_DOCS_INTERVAL = 20000;

const DocsDetail = ({ user, token }) => {
  const textareaRef = useRef();
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState(null); // Ensured initial null value
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [userList, setUserList] = useState([]);
  const [isMine, setIsMine] = useState(false);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const handleChangeContent = (e) => {
    setContent(e.target.value);
    const { selectionStart, selectionEnd } = e.target;
    socket.emit("change-position", selectionStart, selectionEnd);
    socket.emit("send-changes", e.target.value);
  };

  const saveDocs = () => {
    socket.emit("save-document", { title, content, documentId });
  };

  // Set up socket connection
  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_SOCKET_URL, {
      auth: { token }
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [token]);

  // Handle document loading and joining
  useEffect(() => {
    if (!socket) return;

    socket.once("load-document", (document) => {
      setIsMine(user.uniqueId === document.userId);
      setTitle(document.title);
      setContent(document.content);
    });

    socket.emit("get-document", documentId, user.uniqueId);
    socket.emit("user-join", user);
  }, [socket, documentId, user]);

  // Autosave every 20 seconds
  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      saveDocs();
    }, SAVE_DOCS_INTERVAL);

    return () => clearInterval(interval);
  }, [socket, title, content, documentId]);

  // Listen for document changes from other users
  useEffect(() => {
    if (!socket) return;

    const handleReceiveChanges = (delta) => {
      setContent(delta);
    };
    socket.on("receive-changes", handleReceiveChanges);

    return () => {
      socket.off("receive-changes", handleReceiveChanges);
    };
  }, [socket]);

  // Handle selection changes from other users
  useEffect(() => {
    if (!socket) return;

    const handlePositionChange = ({ displayName, selectionStart, selectionEnd }) => {
      console.log("Changed position:", { displayName, selectionStart, selectionEnd });
    };
    socket.on("changed-position", handlePositionChange);

    return () => {
      socket.off("changed-position", handlePositionChange);
    };
  }, [socket]);

  // Handle new user joining the document
  useEffect(() => {
    if (!socket) return;

    const handleUserJoin = ({ displayName }) => {
      alert(`${displayName} has joined!`);
      setUserList((prevList) => [...new Set([...prevList, displayName])]);
    };
    socket.on("user-joined", handleUserJoin);

    return () => {
      socket.off("user-joined", handleUserJoin);
    };
  }, [socket]);

  return (
    <div className="editor-container">
      <div className="user-list-wrap">
        <h2>Participants</h2>
        <ul>
          {userList.length > 0 &&
            userList.map((user, index) => (
              <li key={`${user}_${index}`}>{user}</li>
            ))}
        </ul>
      </div>
      <input
        type="text"
        value={title}
        onChange={handleChangeTitle}
        placeholder="Enter a title"
        disabled={!isMine}
      />
      <textarea
        cols="30"
        rows="10"
        value={content}
        onChange={handleChangeContent}
        ref={textareaRef}
        placeholder="Enter content"
        disabled={!isMine}
      />
      <button onClick={saveDocs} disabled={!isMine}>
        SAVE
      </button>
    </div>
  );
};

export default DocsDetail;
