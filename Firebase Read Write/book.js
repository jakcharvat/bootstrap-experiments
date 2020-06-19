function bookOnload() {
    if (window.location.pathname != "/book.html") return;

    initBook();
}

async function initBook() {
    const bookId = getBookId()
    let book = await fetchBook(bookId);
    showBook(bookId, book);
}

function getBookId() {
    const params = window.location.search.substring(1);
    const splitParams = params.split("&");
    const parameters = {};

    splitParams.forEach(param => {
        param = param.split("=");
        const key = param[0];
        const value = param[1];
        parameters[key] = value;
    })

    return parameters.id;
}

async function fetchBook(id) {

    if (id == null) {
        window.location = "/";
    }

    const db = firebase.firestore();

    let book;

    try {
        const doc = await db.collection("Notes").doc(id).get();
        book = doc.data();
    } catch (e) {
        console.error(e);
    }

    return book;
}

function showBook(id, book) {
    $("#bookName").val(book.Book);
    $("#bookChapter").val(book.Chapter);
    $("#bookTags").text(book.Tags);

    $("#bookName").bind("input", (e) => updateBook(id, book));
    $("#bookChapter").bind("input", (e) => updateBook(id, book));

    $("#bookCard").removeClass("hide");
    $("#loadingSpinner").addClass("hide");
}

function updateBook(id, book) {
    const db = firebase.firestore();

    db.collection("Notes").doc(id).set({
        Book: $("#bookName").val(),
        Chapter: $("#bookChapter").val(),
        Tags: book.Tags,
    })
}