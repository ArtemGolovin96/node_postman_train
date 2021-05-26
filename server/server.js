const express = require('express');
const app = express();
const fs = require('fs');
const Papa = require('papaparse');
var bodyParser = require('body-parser');





const file = fs.createReadStream('./Fishing.csv')
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.all('*', function (req, res, next) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next()
})

let dataFromPapa = [];

Papa.parse(file, {
    header: true,
    download: true,
    dynamicTyping: true,
    worker: true,
    complete: function(res) {
    console.log('RES Все готово');
    // console.log(res.data)
    dataFromPapa = res.data;
    return dataFromPapa
    },
    error: function(res) {
        console.log(res)
    }
}) 



app.get('/allfish', function (req, res) {
    // const count = parseInt(req.query.count);
    // const offset = parseInt(req.query.offset);
    if(!dataFromPapa) {
        res.status(503).json('ОШИБКА 503');
        return;
    }
    // if(offset < dataFromPapa.length - 1) {
        res.status(200).json(dataFromPapa);   
        // return
        // .slice(offset, offset + count)
    // }
        // res.status(404).json("ОШИБКА 404")
})

app.get('/cater', function (req, res) {
    const cater = dataFromPapa.filter((el) => el.mode === 'boat')
    if(!cater) {
        res.status(503).json('ОШИБКА 503');
        return;
    }
        res.status(200).json(cater);   
        // res.status(404).json("ОШИБКА 404")
})

app.get('/pier', function (req, res) {
    const pier = dataFromPapa.filter((el) => el.mode === 'pier')
    if(!pier) {
        res.status(503).json('ОШИБКА 503');
        return;
    }
        res.status(200).json(pier);   
        // res.status(404).json("ОШИБКА 404")
})

app.get('/beach', function (req, res) {
    const beach = dataFromPapa.filter((el) => el.mode === 'beach')
    if(!beach) {
        res.status(503).json('ОШИБКА 503');
        return;
    }
        res.status(200).json(beach);   
        // res.status(404).json("ОШИБКА 404")
})

app.get('/fraht', function (req, res) {
    const fraht = dataFromPapa.filter((el) => el.mode === 'charter')
    if(!fraht) {
        res.status(503).json('ОШИБКА 503');
        return;
    }
        res.status(200).json(fraht);   
        // res.status(404).json("ОШИБКА 404")
})

app.delete('/:id', function(req, res) {
    console.log(req.params.id)
    const id = +req.params.id;
    dataFromPapa = dataFromPapa.filter((el) => {
        if(el[''] !== id) {
            return el;
        }
        
    })
    res.status(200).json(dataFromPapa)
})

app.post('/:id', function(req, res) {
    console.log(req.params.id)
    console.log(req.body.data);
    const objToPapa = {
        '': +req.body.data[0],
        mode: req.body.data[1],
        price: +req.body.data[2],
    }
    // res.send(200)
    dataFromPapa.push(objToPapa)
    // if(req.body) {
        
    //     return;
    // }
    // res.status(400).json("ОШИБКА");
    
})

app.listen(7777, () => {
    console.log('СЕРВЕР ЗАПУСИЛСЯ')
    // console.log(dataFromPapa)
})