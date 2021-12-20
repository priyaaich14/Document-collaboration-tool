import React from "react";

// export default () => <span>Home</span>; ???

const Home = () => {
  return (<span>Home</span>);
}

export default Home;
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

import "./DocsDetail.scss";

const SAVE_DOCS_INTERVAL = 20000;

const DocsDetail = ({ user, token }) => {
  const textareaRef = useRef();
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
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

  useEffect(() => {
    const socketInstance = io(process.env.REACT_APP_SOCKET_URL, {
      auth: {
        token
      }
    });
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.once("load-document", (document) => {
      setIsMine(user.uniqueId === document.userId);
    });

    socket.emit("get-document", documentId, user.uniqueId);
    socket.emit("user-join", user);
  }, [socket, documentId, user]);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      socket.emit("save-document", { title, content, documentId });
    }, SAVE_DOCS_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [socket, title, content, documentId]);

  useEffect(() => {
    if (!socket) return;

    const handler = (delta) => {
      setContent(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handler = ({ displayName, selectionStart, selectionEnd }) => {
      console.log("changed-position on", { displayName, selectionStart, selectionEnd });
    };
    socket.on("changed-position", handler);

    return () => {
      socket.off("changed-position", handler);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const handler = ({ displayName }) => {
      alert(`${displayName}님이 입장하였습니다!`);
      setUserList([...new Set(userList)]);
    };
    socket.on("user-joined", handler);

    return () => {
      socket.off("changed-position", handler);
    };
  }, [socket, userList]);

  return (
    <div className="editor-container">
      <div className="user-list-wrap">
        <h2>참여자 리스트</h2>
        <ul>
          {userList.length > 0 &&
            userList.map((user, index) => {
              return <li key={`${user}_${index}`}>{user}</li>;
            })}
        </ul>
      </div>
      <input
        type="text"
        value={title}
        onChange={handleChangeTitle}
        placeholder="타이틀을 입력하세요"
        disabled={!user}
      />
      <textarea
        cols="30"
        rows="10"
        value={content}
        onChange={handleChangeContent}
        ref={textareaRef}
        placeholder="수정사항을 입력하세요"
        disabled={!user}
      />
      <button onClick={saveDocs} disabled={!isMine}>
        SAVE
      </button>
    </div>
  );
};

export default DocsDetail;
