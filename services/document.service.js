import createError from "http-errors";
import { Document } from "../models";
import ERROR from "../constants/error"; // Corrected the import of ERROR

const getDocuments = ({ skip = 0, limit = 10, userId }) => {
  return Document.find({ userId })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .lean();
};

const getDocumentById = async (id) => {
  try {
    const document = await Document.findById(id); // Corrected to use const for document

    if (!document) {
      throw createError(404, ERROR.NOT_FOUND);
    }

    return document;
  } catch (err) {
    throw createError(500, ERROR.INTERNAL_SERVER_ERROR);
  }
};

const createDocument = ({ id, title, content, userId }) => {
  if (!title && !content) {
    throw createError(428, ERROR.REQUIRED_OPTIONS);
  }

  if (!id) {
    throw createError(428, ERROR.REQUIRED_ID);
  }

  return Document.create({ _id: id, title, content, userId });
};

const updateDocumentById = async (id, updateDocument) => {
  const document = await getDocumentById(id); // Corrected to use const for document

  if (!document) {
    throw createError(404, ERROR.NOT_FOUND);
  }

  Object.assign(document, updateDocument);
  await document.save();

  return document;
};

const deleteDocumentById = async (id) => {
  const document = await getDocumentById(id); // Corrected to use const for document

  if (!document) {
    throw createError(404, ERROR.NOT_FOUND);
  }

  await document.remove();

  return document;
};

const findOrCreateDocument = async (id, userId) => {
  if (!id) return;

  const document = await Document.findById(id); // Corrected to use const for document

  if (document) return document;

  return Document.create({ _id: id, title: "", content: "", userId });
};

export default {
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocumentById,
  deleteDocumentById,
  findOrCreateDocument,
};
