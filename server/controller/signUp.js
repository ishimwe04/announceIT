import jwt from 'jsonwebtoken';
import Joi from 'joi';
import express from 'express';

const app=express();

app.use(express.json());

const accountUsers=[];


const userSignup=((req, res) =>{
    const { error }=validateUser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const accountUser={
        token: jwt.sign(req.body.email, 'secret_key'),
        id: accountUsers.length,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password:req.body.password
    };
    accountUsers.push(accountUser);

    res.status(200).json({
        status:"success",
        data: accountUser
    });
});


function validateUser(accountUser){
    const schema={
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password:Joi.string().required().min(8),
}
return Joi.validate(accountUser, schema);

}

export default {userSignup, accountUsers};