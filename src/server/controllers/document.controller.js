const documentService = require('../services/DocumentsService');

class DocumentController {

    create(req, res, next) {
        const docDetails = req.body;

        documentService.create(DocumentController.convertToMongo(docDetails))
            .then(doc => {
                res.json({
                    status: (doc!==null)?"OK": "ERR",
                    doc: DocumentController.convertFromMongo(doc)
                });
                res.sendStatus = (doc!==null)?200: 500;
            });
    }

    update(req, res, next) {
        const docDetails = req.body;
        const id = req.params.id;

        documentService.update(id, DocumentController.convertToMongo(docDetails))
            .then(doc => {
                if(doc === null) {
                    res.json({
                        status: "ERR",
                        result: {}
                    });
                    res.sendStatus = 500;
                } else {
                    documentService.findById(id)
                        .then(result => {
                            res.json({
                                status: (res!==null)?"OK": "ERR",
                                result: DocumentController.convertFromMongo(result)
                            });
                            res.sendStatus = (res!==null)?200: 500;
                        });
                }
            });
    }

    delete(req, res, next) {
        const id = req.params.id;

        documentService.delete(id)
            .then(status => {
                res.json({
                    status: (status)?"OK": "ERR"
                });
                res.sendStatus = (status)?200: 500;
            });
    }

    findAll(req, res, next) {
        console.log('docController.findAll()');
        documentService.findAll()
            .then(results => {
                res.json({
                    status: (results!==null)?"OK": "ERR",
                    results : DocumentController.mapResultsFromMongo(results)
                });
                res.sendStatus = (results!==null)?200: 500;
            });
    }

    findById(req, res, next) {
        const id = req.params.id;

        documentService.findById(id)
            .then(result => {
                res.json({
                    status: (res!==null)?"OK": "ERR",
                    result: DocumentController.convertFromMongo(result)
                });
                res.sendStatus = (res!==null)?200: 500;
            });
    }

    static convertToMongo(doc) {
        if(!doc || doc === null) {
            return {};
        }
        return {
            document_id: doc.id,
            file_name: doc.fileName,
            file_id: doc.ref,
            type: doc.type,
            desc: doc.desc
        }
    }

    static convertFromMongo(doc) {
        if(!doc || doc === null) {
            return {};
        }
        return {
            id: doc.document_id,
            fileName: doc.file_name,
            ref: doc.file_id,
            type: doc.type,
            desc: doc.desc
        }
    }

    static mapResultsFromMongo(docs) {
        if(!docs || docs === null || docs.length<1) {
            return [];
        }
        return docs.map(doc=>this.convertFromMongo(doc));
    }
}

module.exports = new DocumentController();