"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSpecificDcoumentWithFilename = exports.getAllDocumentData = exports.getSpecificDocumentWIthFilename = exports.uploadTextDocument = void 0;
const text_document_services_1 = require("../services/text-document-services");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const uploadTextDocument = (req, res) => {
    upload.single('document')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(500).json({ message: "File upload failed", error: err });
        }
        try {
            const { filename } = req.body;
            const fileContent = req.file;
            const textDocumentService = new text_document_services_1.TextDocumentServices();
            textDocumentService.validateDocumentFilenameAndFilecontent(filename, fileContent);
            const savedDocument = yield textDocumentService.uploadNewTextDocument(filename, fileContent);
            res.status(201).json({ message: "Document uploaded successfully", data: savedDocument });
        }
        catch (error) {
            console.error("Error uploading document:", error);
            res.status(500).json({ message: "Internal server error", error });
        }
    }));
};
exports.uploadTextDocument = uploadTextDocument;
const getSpecificDocumentWIthFilename = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    try {
        const textDocumentService = new text_document_services_1.TextDocumentServices();
        const document = yield textDocumentService.getSpecificDocument(filename);
        // Check if the document exists
        if (!document) {
            return res.status(404).json({ message: `File with filename '${filename}' not found.` });
        }
        const decodedContent = Buffer.from(document.content, 'base64').toString('utf-8');
        return res.status(200).json({
            filename: document.filename,
            content: decodedContent
        });
    }
    catch (error) {
        console.error("Error reading document:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getSpecificDocumentWIthFilename = getSpecificDocumentWIthFilename;
const getAllDocumentData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const textDocumentService = new text_document_services_1.TextDocumentServices();
        const allDocumentsData = yield textDocumentService.getAllDocuments();
        return res.status(200).json({
            allDocumentsData
        });
    }
    catch (error) {
        console.error("Error reading document:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getAllDocumentData = getAllDocumentData;
const deleteSpecificDcoumentWithFilename = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename } = req.params;
    try {
        const textDocumentService = new text_document_services_1.TextDocumentServices();
        const document = yield textDocumentService.deleteSpecificDocument(filename);
        // Check if the document exists and was deleted
        if (!document) {
            return res.status(404).json({ message: `Document with filename '${filename}' not found.` });
        }
        return res.status(200).json({
            message: `Document with filename '${filename}' successfully deleted.`,
            deletedDocument: document
        });
    }
    catch (error) {
        console.error("Error deleting document:", error);
        return res.status(500).json({ message: "Internal server error", error });
    }
});
exports.deleteSpecificDcoumentWithFilename = deleteSpecificDcoumentWithFilename;
