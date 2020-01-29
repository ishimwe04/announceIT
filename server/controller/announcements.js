import express from'express';
import Joi from 'joi';

const app=express();

app.use(express.json());

const announcements=[];

const getAllAnnounce= ((req, res)=>{
    res.send(announcements);
});

const postAnnounce = ((req, res) =>{
    
    const { error }=validateAnnouncement(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }
    const announcement={
        id: announcements.length + 1,
       owner: req.body.owner,
        status: req.body.status,
        text: req.body.text,
        start_date:req.body.start_date,
        end_date: req.body.end_date,
    };
    announcements.push(announcement);
    res.send(announcement);
});

  const getSpecificAnnounce = ((req, res)=>{
    const announcement=announcements.find(c => c.id === parseInt(req.params.id));
    if(!announcement) res.status(404).send('announcement with the given ID not found');

    res.send(announcement);
});

  const updateAnnounce= ((req, res) =>{
    const announcement=announcements.find(c => c.id === parseInt(req.params.id));
    if(!announcement) res.status(404).send('announcement with the given ID not found');
    
    const { error }=validateAnnouncement(req.body);
    if(error){
        res.status(400).send(error.details[0].message);
        return;
    }

        announcement.owner= req.body.owner;
       announcement.status= req.body.status;
        announcement.text= req.body.text;
       announcement.start_date=req.body.start_date;
       announcement.end_date= req.body.end_date;

    res.send(announcement);

});

  const deleteAnnounce = ((req, res) =>{ 
    const announcement=announcements.find(c => c.id === parseInt(req.params.id));
    if(!announcement) res.status(404).send('announcement with the given ID not found');

    const index=announcements.indexOf(announcement);
    announcements.splice(index, 1);

    res.send(announcement);
});



function validateAnnouncement(announcement){
    const schema={
      owner: Joi.string().required(),
      status: Joi.string().valid('pending', 'accepted', 'declined', 'activated', 'deactivated').required(),
      text: Joi.string().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
}
return Joi.validate(announcement, schema);

}


export default {deleteAnnounce, postAnnounce,getSpecificAnnounce,updateAnnounce,getAllAnnounce};