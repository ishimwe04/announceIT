import express from'express';
import Joi from 'joi';

const app=express();

app.use(express.json());

const users=[];

const getAllUsers=((req,res)=>{
     res.send(users);
});
const addUser = ((req, res) =>{
    
    const { error }=validateUser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const user={
        id: users.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        phoneNumber:req.body.phoneNumber,
        email: req.body.email,
        address: req.body.address,
        is_admin: req.body.is_admin
    };
    users.push(user);
    res.send(user);
});

const getSpecificUser= ((req, res)=>{
    const user=users.find(c => c.id === parseInt(req.params.id));
    if(!user) res.status(404).send('user with the given ID not found');

    res.send(user);
});

 const updateUser=((req, res) =>{
    const user=users.find(c => c.id === parseInt(req.params.id));
    if(!user) res.status(404).send('user with the given ID not found');
    
    const { error }=validateUser(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

        user.first_name= req.body.first_name;
        user.last_name= req.body.last_name;
        user.password= req.body.password;
        user.phoneNumber=req.body.phoneNumber;
        user.email= req.body.email;
        user.address= req.body.address;
        user.is_admin= req.body.is_admin;
    res.send(user);

});


 const deleteUser =((req, res) =>{ 
    const user=users.find(c =>c.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('user with the given ID not found');

    const index=users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

function validateUser(user){
    const schema={
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: Joi.string().required(),
        phoneNumber: Joi.number().integer().positive().required(),
        email:Joi.string().email().required(),
        address: Joi.string().required(),
        is_admin: Joi.boolean().valid('true', 'false').required()
}
return Joi.validate(user, schema);

}

export default {addUser,getSpecificUser,updateUser,deleteUser,getAllUsers};