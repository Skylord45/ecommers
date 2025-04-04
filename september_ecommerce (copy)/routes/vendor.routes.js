//protect routes for vendor
import express from 'express';
import { fetchnotificationsforvendorreaded, fetchnotificationsforvendorunreaded, getcontacttoadmin, getnotifications, getVendorDashboard, postcontacttoadmin, postmarkasread, postmarkasreadall } from '../controller/vendor.controller.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
const routes = express();

routes.get("/dashboard", getVendorDashboard);
routes.get('/contact-to-admin',getcontacttoadmin)
routes.post('/contacttoadmin',upload.none(),postcontacttoadmin)
routes.get('/notifications',getnotifications)
routes.post("/fetchreadednotification",fetchnotificationsforvendorreaded)
routes.post("/fetchunreadnotification",fetchnotificationsforvendorunreaded)
routes.post('/markasread',upload.none(),postmarkasread)
routes.post('/markallasread',upload.none(),postmarkasreadall)
export default routes;