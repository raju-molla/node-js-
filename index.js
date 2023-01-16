const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/templatesReplace.js')

//=========================
//=========================
// ======== File=========


// const fileIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// // console.log(fileIn);
// const textOut = `This is small about avocado: ${fileIn}.\nCreated on: ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textOut);

// asynchronous

// fs.readFile('./txt/start.txt', 'utf-8', (err,data) => {
//     fs.readFile(`./txt/${data}.txt`,'utf-8', (err,data1) => {
//         fs.readFile('./txt/append.txt', 'utf-8',(err,data3) => {
//             console.log(data3);
//         })
//         fs.writeFile('./txt/final.txt', `${data1}\n${data}`, err => {
//             console.log('File written successfully');
//         })
//     })
//     // console.log(data);
// })

// console.log('Hello Bangla Institude');

// SERVER CREATE




const templeteOverview = fs.readFileSync(`${__dirname}/templates/templete-overview.html`, 'utf-8');
const templeteCard = fs.readFileSync(`${__dirname}/templates/templete-card.html`, 'utf-8');
const templeteProduct = fs.readFileSync(`${__dirname}/templates/templete-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req,res) => {

    // console.log(req.url);
    const { query, pathname} = url.parse(req.url,true);
   

    // overview
    if(pathname ==='/' || pathname === '/overview'){
        res.writeHead(200,{
            'Content-type' : 'text/html',
        })
        let cardHtml = dataObject.map(el => {
            return replaceTemplate(templeteCard,el);
        }).join('');
        // console.log(cardHtml);
        const output =  templeteOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
        res.end(output);
    }

    // product
    else if(pathname === '/product'){
        const product = dataObject[query.id];
        const output = replaceTemplate(templeteProduct,product)
        res.end(output);
    }

    // api
    else if(pathname === '/api'){
        res.writeHead(200,{
            'Content-type' : 'application/json',
        })
        res.end(data);
    }

    // not found
    else{
        res.writeHead(404, {
            'Context-type' : 'text/html',
            'my-issa' : "sorry"
        });
        res.end('<h1>This page is not found</h1>');
    }
    // res.end("Hello Bangla Institue");
})
server.listen(8000,'127.0.0.1',()=>{
    console.log('Server is running at port 8000');
})