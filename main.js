const fs = require('fs');
const express = require('express');
const { send } = require('process');
const app = express();


const templateHTML = (title, list_, body) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
    </head>
    <body>
    <h1>${title}</h1>
    ${list_}
    ${description}
    </body>
    </html>
    `;
};

app.get('/',(req, res) =>{
    fs.readdir('./data','utf-8',(err, files) => {
        let list_ = '<ol>';
        for(let i =0; i < files.length; i++){
            list_ += `<li><a href='/page/${files[i]}/'>${files[i]}</a></li>`
        }
        list_ += '</ol>'
        let title = 'Welcome';
        let description;
        let html =`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>${title}</title>
                    </head>
                    <body>
                    <h1>${title}</h1>
                    ${list_}
                    ${description}
                    </body>
                    </html>`;

        res.send(html);
    });
});

app.get('/page/:id',(req, res) => {
    fs.readdir('./data', 'utf-8', (err, files) => {
        let list_ = '<ol>';
        for (let i = 0; i < files.length; i++) {
            list_ += `<li><a href="/page/${files[i]}">${files[i]}</a></li>`
        }
        list_ += '</ol>'
        let title = req.params.id;
        let description;
        fs.readFile(`./data/${req.params.id}`, 'utf-8', (err, data) => {
            description = data;
        });
        let html = templateHTML(title, list_, `${description}`);
            res.send(html);
    });
});

app.get('/create/', (req, res) => {

});

app.listen(3000);