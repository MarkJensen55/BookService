var ViewModel = function() {
    var self = this;
    self.books = ko.obervableArray();

    self.error = ko.observable();

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

    // fetch the initial data
    getAllBooks();

};

ko.applyBindings(new ViewModel());