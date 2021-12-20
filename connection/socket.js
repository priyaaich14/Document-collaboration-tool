const createError = require("http-errors");

const { documentService } = require("../services");
const { verifyToken } = require("../lib/token");

const init = () => {
  const io = require("socket.io")(process.env.SOCKET_PORT, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication error"));
    }

    try {
      const verifiedToken = await verifyToken(token);

      if (verifiedToken) {
        next();
      }

      return next(new Error("Authentication error"));
    } catch (err) {
      return next(err);
    }
  });

  io.on("connection", (socket) => {
    socket.on("get-document", async (documentId, userId) => {
      const document = await documentService.findOrCreateDocument(
        documentId,
        userId
      );

      socket.join(documentId);
      socket.documentId = documentId;

      socket.emit("load-document", document);
    });

    socket.on("user-join", (user) => {
      socket.displayName = user.displayName;
      socket.selectionStart = 0;
      socket.selectionEnd = 0;

      socket.emit("user-joined", {
        displayName: socket.displayName,
      });
    });

    socket.on("change-position", (selectionStart, selectionEnd) => {
      socket.selectionStart = selectionStart;
      socket.selectionEnd = selectionEnd;

      socket.emit("changed-position", {
        displayName: socket.displayName,
        selectionStart: socket.selectionStart,
        selectionEnd: socket.selectionEnd,
      });
    });

    socket.on("save-document", async ({ title, content, documentId }) => {
      await documentService.updateDocumentById(documentId, { title, content });
    });

    socket.on("send-changes", (delta) => {
      socket.emit("receive-changes", delta);
    });
  });
};

module.exports = {
  socketInit: init,
};
