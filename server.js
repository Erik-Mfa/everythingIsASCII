const express = require('express');
const multer = require('multer');
const path = require('path');
const convertToAscii = require('./imageASCII');
const Jimp = require('jimp');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.render('index', { asciiArt: '' });
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.redirect('/');
    }

    try {
        const image = await Jimp.read(req.file.buffer);
        const asciiArt = await convertToAscii(image);

        res.render('index', { asciiArt });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});