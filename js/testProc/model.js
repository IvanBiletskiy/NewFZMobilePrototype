module = (function() {
    var server = {
        getDocumentsList: function() {
            return [
                {
                    id: 123,
                    creator: "Vasya Pupkin"
                },
                {
                    id: 16723,
                    creator: "Bill Gates"
                }
            ];
        },
        getDocumentLines: function(documentId) {
            if (documentId === 123) {
                return [
                    {
                        id: 123,
                        name: "Milk",
                        count: 4
                    },
                    {
                        id: 234,
                        name: "Bread",
                        count: 2
                    }
                ];
            } else {
                return [
                    {
                        id: 666,
                        name: "Beer",
                        count: 0.5
                    },
                    {
                        id: 1,
                        name: "Fish",
                        count: 3
                    }
                ];
            }
        },
        getLagerInfo: function(lagerId) {
            var lagerInfo;
            switch (lagerId) {
                case 666:
                    lagerInfo = "Delicious beer in the world!"
                case 1:
                    lagerInfo = "This fish smells bad..."
                case 123:
                    lagerInfo = "This milk made by cow"
                default:
                    lagerInfo = {
                        hasError: true,
                        errorMessage: "INFO NOT FOUND"
                    }
            };
            return lagerInfo;
        }
    };

    return {
        getDocumentList: function() {
            var documentsList = server.getDocumentsList();
            //...что-то можем сделать, где-то сохранить ссылку, как-то обработать
            return documentsList;
        },

        getDocument: function(documentId) {
            var currentDocument = {
                id: documentId,
                lines: server.getDocumentLines(documentId)
            }
            return currentDocument;
        },

        getLager: function(lagerId) {
            var lagerInfo = server.getLagerInfo(lagerId);
            var textInfo;
            if (lagerInfo.hasError) {
                textInfo = lagerInfo.errorMessage;
            } 
            else {
                textInfo = lagerInfo;
            };
            return {
                id: lagerId,
                textInfo: textInfo
            }
        },

        getLagerByBarcode: function(barcode){},
        closeDocumentOnServer: function(documentId){},
        commitDocument: function(documentId){}
    }
})()
