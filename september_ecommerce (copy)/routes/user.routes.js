import express from 'express';
import { homePage } from '../controller/user.controller.js';

const routes = express.Router();

routes.get('/', homePage);

export default routes;