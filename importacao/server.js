var http = require('http');
const express = require('express');
const app = express();

const baseDir = `${__dirname}/build/`
app.use(express.static(`${baseDir}`))
app.get('/app', (req, res) => res.sendfile('index.html' , { root : baseDir } ))


const port =  // Change port
app.listen(port)