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
exports.TextDocumentServices = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
class TextDocumentServices {
    static mockImplementation(arg0) {
        throw new Error("Method not implemented.");
    }
    uploadNewTextDocument(filename, filecontent) {
        return __awaiter(this, void 0, void 0, function* () {
            const convertedFileContent = this.convertFileContentToBase64(filecontent);
            const newDocument = new Tasks_1.default({
                filename: filename,
                content: convertedFileContent,
            });
            return yield newDocument.save();
        });
    }
    convertFileContentToBase64(filecontent) {
        return filecontent.buffer.toString('base64');
    }
    validateDocumentFilenameAndFilecontent(filename, filecontent) {
        if (!filename) {
            throw new Error("Invalid or empty file name is added");
        }
        if (!filecontent) {
            throw new Error("Invalid or empty file content is added");
        }
    }
    getSpecificDocument(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Tasks_1.default.findOne({ filename });
        });
    }
    getAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            let allDocuments = [];
            allDocuments = yield Tasks_1.default.find();
            return allDocuments;
        });
    }
    deleteSpecificDocument(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Tasks_1.default.findOneAndDelete({ filename });
        });
    }
}
exports.TextDocumentServices = TextDocumentServices;
