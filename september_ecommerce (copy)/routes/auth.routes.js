//login signup verification for all user
import express from 'express';
import { getUserLogin, getUserSignup, postUserLogin, postUserSingup } from '../controller/auth.controller.js';

const routes = express();


routes.get('/signup', getUserSignup);
routes.get("/login", getUserLogin);

routes.post('/post-signup', postUserSingup);
routes.post('/post-login', postUserLogin);

export default routes;