import express from 'express';
import canLog from './signUp';
import jwt from 'jsonwebtoken';

const app=express();

 app.use(express.json());

const userLogin= ((req, res) =>{
     canLog.accountUsers.forEach(already => {
         if(req.body.email == already.email){
            if(req.body.password == already.password){
                res.status(200).json({
                    status:"success",
                    data:already
                })
                }
                else{
                   res.status(403).json({
                       status:"error",
                       error:"password doesn't match"
                   })
            } 
             }
             else{
                res.status(403).json({
                    status:"error",
                    error:"not registered"
                })
         }
     })
     
})

 export default {userLogin};