const Jimp = require('jimp');

function convertToAscii(imageBuffer) {
    return new Promise (async (resolve, reject) => {

        try {
            const image = await Jimp.read(imageBuffer);

            // Resize the image to a suitable width
            const width = 200; // Adjust the width as needed
            image.resize(width, Jimp.AUTO);

            let asciiArt = '';

            // Define the ASCII characters to use
            const asciiChars = ['@', '#', 'S', '%', '?', '*', '+', ';', ':', ',', '.'];

            // Loop through each pixel in the resized image and map it to an ASCII character
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
                const red = image.bitmap.data[idx];
                const green = image.bitmap.data[idx + 1];
                const blue = image.bitmap.data[idx + 2];

                const grayscale = (red + green + blue) / 3;

                const asciiIndex = Math.floor((grayscale / 255) * (asciiChars.length - 1));
                asciiArt += asciiChars[asciiIndex];//choose the char by the result of the gray tone of the color multiplied by the lenght of the char array minus 

                if (x === image.bitmap.width - 1) {
                    asciiArt += '\n'; // Start a new line for each row
                }
            });

            resolve (asciiArt);
        } catch (error) {
            console.error('Error converting image to ASCII:', error);
            reject(error); ''; // Return an empty string on error
        };
    });

}


    

module.exports = convertToAscii;