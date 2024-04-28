/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import { input } from '@inquirer/prompts';
import qr from 'qr-image';
import fs from 'fs';

var id = 0;
var done = false;

do {
    const url = await input({message: 'Enter a URL to turn into a QR code:'});
    const qr_png = qr.imageSync(url, { type: 'png' });

    id++;
    fs.writeFileSync(`qr${id}.png`, qr_png);

    const again = await input({message: 'Do you want to create another QR code? (y/n)'});
    if (again === 'y' || again === 'Y') {
        continue;
    } else {
        done = true;
        console.log('Goodbye! Rerun program to generate more QR codes.');
    }
} while (!done);
