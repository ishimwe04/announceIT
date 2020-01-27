const Joi=require('joi')
const express=require ('express');
const app=express();

app.use(express.Json());

app.get('/', (req, res)=>{
    res.status('success').send('{data}');
})

