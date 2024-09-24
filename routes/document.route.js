import express from "express";
import documentController from "../controllers/document.controller.js";
import { validateToken } from "../middleware/validate.js";

const documentRouter = express.Router();

documentRouter.get("/", validateToken, documentController.getDocuments);
documentRouter.get("/:id", documentController.getDocument);

documentRouter.post("/", validateToken, documentController.createDocument);

documentRouter.put("/:id", validateToken, documentController.updateDocument);

documentRouter.delete("/:id", validateToken, documentController.deleteDocument);

export default documentRouter;
