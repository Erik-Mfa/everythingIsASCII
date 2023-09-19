const express = require("express");
const app = express();
const upload = require('./public/multer');

app.use(express.static('public'));

app.get('/', (req,res) => {
    res.send('Test')
});

app.post('/upload', upload.single("image") , (req,res) => {
    res.status(500)
});

app.listen(3000, () => {
    console.log("Online")
});