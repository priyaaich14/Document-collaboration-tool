import { documentService } = from "../services");

import getDocuments = async (req, res, next) => {
  try {
    import { skip = 0, limit = 10 } = req.query;
    import { id: userId } = req.user;
    import documents = await documentService.getDocuments({
      skip,
      limit,
      userId,
    });

    return res.status(200).json(documents);
  } catch (err) {
    return next(err);
  }
};

import getDocument = async (req, res, next) => {
  try {
    import { id } = req.params;
    import document = await documentService.getDocumentById(id);

    return res.status(200).json(document.lean());
  } catch (err) {
    return next(err);
  }
};

import createDocument = async (req, res, next) => {
  try {
    import document = await documentService.createDocument(req.body);

    return res.status(201).json(document);
  } catch (err) {
    return next(err);
  }
};

import updateDocument = async (req, res, next) => {
  try {
    import { id } = req.params;
    import document = await documentService.updateDocumentById(id, req.body);

    return res.status(200).json(document);
  } catch (err) {
    return next(err);
  }
};

import deleteDocument = async (req, res, next) => {
  try {
    import { id } = req.params;
    await documentService.deleteDocumentById(id);

    return res.sendstatus(204);
  } catch (err) {
    return next(err);
  }
};

export default {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};
