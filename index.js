const { nextTick } = require("process");

function requireHTTPS(req, res, next) {
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    nextTick();
}

const express = require('express');
const app = express();

//penerapan middleware
app.use(requireHTTPS);
app.use(express.static('./dist/test-angular-deployment'));


//handle request
//method GET
app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/test-angular-deployment' }),
);

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})