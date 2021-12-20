const express = require("express");
const { documentController } = require("../controllers/document.controller");
const { validateToken } = require("../middleware/validate");

const documentRouter = express.Router();

documentRouter.get("/", validateToken, documentController.getDocuments);
documentRouter.get("/:id", documentController.getDocument);

documentRouter.post("/", validateToken, documentController.createDocument);

documentRouter.put("/:id", validateToken, documentController.updateDocument);

documentRouter.delete("/:id", validateToken, documentController.deleteDocument);

module.exports = documentRouter;
