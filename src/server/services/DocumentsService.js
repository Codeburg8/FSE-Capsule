const Document = require('../Models/Documents');

class DocumentsService {

    async create(docDetails) {
        try {
            delete docDetails.document_id;
            delete docDetails.file_id; 
            const doc =  await  Document.create(docDetails);
            return doc;
        } catch(err) {
            console.log(`DocumentService.create(${JSON.stringify(docDetails)}): err`, {err});
            return null;
        }
    }

    async update(id, docDetails) {
        try {
            const tmp = Object.assign({}, docDetails);
            delete tmp.doc_id;
            const Document = await Document.findOneAndUpdate({document_id: id}, tmp);
            return Document;
        } catch(err) {
            console.log(`DocumentService.delete(${id}, ${JSON.stringify(docDetails)}): err`, {err});
            return null;
        }
    }

    async delete(id) {
        try {
            const res = await Document.deleteOne({document_id: id});
            return true;
        } catch(err) {
            console.log(`DocumentService.delete(${id}): err`, {err});
            return false;
        }
    }

    async findAll() {
        try {
            const res = await Document.find();
            return res;
        } catch(err) {
            console.log(`DocumentService.findAll(): err`, {err});
            return null;
        }
    }

    async findById(id) {
        try {
            const res = await Document.findOne({document_id: id});
            return res;
        } catch(err) {
            console.log(`DocumentService.findAll(${id}): err`, {err});
            return null;
        }
    }
}

module.exports = new DocumentsService();
