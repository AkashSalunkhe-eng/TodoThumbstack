
import TextDocument from "../models/Tasks"

export class TextDocumentServices {
    static mockImplementation(arg0: () => { validateDocumentFilenameAndFilecontent: any; uploadNewTextDocument: any; getSpecificDocument: any; getAllDocuments: any; deleteSpecificDocument: any; }) {
      throw new Error("Method not implemented.");
    }



    async uploadNewTextDocument(filename:string, filecontent:any) {
        const convertedFileContent = this.convertFileContentToBase64(filecontent)
        const newDocument = new TextDocument({
            filename: filename,
            content: convertedFileContent,
        });
        return await newDocument.save();
    }

    convertFileContentToBase64(filecontent:any){
        return filecontent.buffer.toString('base64')
    }

    validateDocumentFilenameAndFilecontent(filename:string, filecontent:any) {
        if(!filename){
            throw new Error("Invalid or empty file name is added");
        }
        if(!filecontent){
            throw new Error("Invalid or empty file content is added");
        }
    }
    
    async getSpecificDocument(filename:string) {
        return await TextDocument.findOne({ filename });
    }

    async getAllDocuments() {
        let allDocuments = [];
        allDocuments = await TextDocument.find();
        return allDocuments;
    }
    async deleteSpecificDocument(filename:string) {
        return await TextDocument.findOneAndDelete({ filename })
    }

}