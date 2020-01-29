import myAnnouncements from '../server/controller/announcements';
import myUsers from '../server/controller/users';
import mySignup from '../server/controller/signUp';
import myLogin from '../server/controller/login';
import express from 'express';

const app=express();

app.use(express.json());

app.delete('/announcement/:id', myAnnouncements.deleteAnnounce);
app.post('/announcement', myAnnouncements.postAnnounce);
app.get('/announcement/:id', myAnnouncements.getSpecificAnnounce);
app.put('/announcement/:id', myAnnouncements.updateAnnounce);
app.get('/announcements', myAnnouncements.getAllAnnounce);

app.post('/user', myUsers.addUser);
app.get('/user/:id', myUsers.getSpecificUser);
app.put('/user/:id', myUsers.updateUser);
app.delete('/user/:id', myUsers.deleteUser);
app.get('/users', myUsers.getAllUsers);

app.post('/auth/signup', mySignup.userSignup);

app.post('/auth/signin', myLogin.userLogin);


const port=process.env.PORT || 10000;
app.listen(port, ()=> console.log(`listening is on port ${port}`));