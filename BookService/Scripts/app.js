var ViewModel = function() {
    var self = this;
    self.books = ko.observableArray();
    self.error = ko.observable();
    self.detail = ko.observable();

    var booksUri = '/api/books/';

    function ajaxHelper(uri,method,data){
        self.error('');  // clear out errors
        return $.ajax({
            type: method,
            url:uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data): null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
        });
    }

    function getAllBooks() {
        ajaxHelper(booksUri, 'GET').done(function (data) {
            self.books(data);
        });
    }

    self.getBookDetail = function (item) {
        ajaxHelper(booksUri + item.Id, 'GET').done(function (data) {
            self.detail(data);
        });
    }

    // fetch the initial data
    getAllBooks();

};

ko.applyBindings(new ViewModel());