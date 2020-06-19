window.onload = () => {
    const pathName = window.location.pathname;

    switch (pathName) {
        case "/":
            firebaseOnload();
            break;
        case "/book.html":
            bookOnload();
            break;
        default:
    }
}

window.onfocus = () => {
    const pathName = window.location.pathname;

    switch (pathName) {
        case "/book.html":
            bookOnload();
            break;
        default:
    }
}