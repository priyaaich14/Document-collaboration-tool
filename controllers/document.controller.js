const { documentService } = require("../services");

const getDocuments = async (req, res, next) => {
  try {
    const { skip = 0, limit = 10 } = req.query;
    const { id: userId } = req.user;
    const documents = await documentService.getDocuments({
      skip,
      limit,
      userId,
    });

    return res.status(200).json(documents);
  } catch (err) {
    return next(err);
  }
};

const getDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);

    return res.status(200).json(document.lean());
  } catch (err) {
    return next(err);
  }
};

const createDocument = async (req, res, next) => {
  try {
    const document = await documentService.createDocument(req.body);

    return res.status(201).json(document);
  } catch (err) {
    return next(err);
  }
};

const updateDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await documentService.updateDocumentById(id, req.body);

    return res.status(200).json(document);
  } catch (err) {
    return next(err);
  }
};

const deleteDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    await documentService.deleteDocumentById(id);

    return res.sendstatus(204);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
};
