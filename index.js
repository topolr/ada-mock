let app = require("./server");

let server = app.listen(8080, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log(`listen at http://${host}:${port}`);
});