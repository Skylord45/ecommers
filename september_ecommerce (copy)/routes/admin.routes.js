//protect routes for admin
import express from 'express';
import {  expenseAndProfiteOverView,getProfile,viewProfilAdmin,getCardData,electronicsProductDetails,OdersListing,clothesProductDetails ,productDetails,orderOverView, productOverView, salesOverView, userCityDetails, usersDetails, usersOverView, vendorOverView,dashboardControl, vendorsDetails, ordersDetails, salesDetails, fetchvendorscontroller, fetchvendorcontroller, getpendingverification, getpendingverificationgetdetails, fetchpendingverificationvendors, sendmailonrejection, sendmailonverification, getofferspage, availableProduct,postofferspage, fetchoffers, deleteoffers, fetchoffer, updateoffer, fetchactivevendordata, fetchcatvendordata, fetchdataofelectronicsales, getcreatenotification, postcreatenotification, fetchnotifications, getincomingnotification,fetchnotificationsforadminreaded, fetchnotificationsforadminunreaded, postmarkasread, postmarkasreadall } from '../controller/admin.controller.js';
const routes = express();
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })
// These are the examples of routes how you have to render and import the controllers.

routes.get('/dashboard', dashboardControl); 
routes.get('/vendors', vendorsDetails)
routes.get('/orders', ordersDetails)
routes.get('/sales', salesDetails)
routes.get('/users', usersDetails)
routes.get('/view-profile',viewProfilAdmin)
routes.get('/get-admin-profile', getProfile)


routes.get('/available-products', availableProduct)
routes.get('/product-details', productDetails)
routes.get('/product-details-electronics', electronicsProductDetails)
routes.get('/product-details-clothes', clothesProductDetails)
routes.get('/order-listing', OdersListing)
routes.get('/totalOrders', getCardData)

routes.get('/orderOverView', orderOverView)
routes.get('/vendorOverView', vendorOverView)
routes.get('/salesOverView', salesOverView)
routes.get('/usersOverView', usersOverView)
routes.get('/productOverView', productOverView)
routes.get('/expenseAndProfiteOverView', expenseAndProfiteOverView);
routes.get('/vendors', vendorsDetails)
routes.post('/fetch-vendors', fetchvendorscontroller)
routes.get('/fetch-vendor-details/:id',fetchvendorcontroller)
routes.get('/orders', ordersDetails)
routes.get('/sales', salesDetails)
routes.get('/pending-verification',getpendingverification)
routes.get('/company-details/:id', getpendingverificationgetdetails)
routes.post('/get-pending-verifications',fetchpendingverificationvendors)
routes.post('/rejectvarification', sendmailonrejection)
routes.post('/authorize-vendor', sendmailonverification)
routes.get('/offers',getofferspage)
routes.post("/offers",upload.none(),postofferspage)
routes.post("/fetchoffers",fetchoffers)
routes.get('/userGroupByCity',userCityDetails)
routes.post('/deleteoffers',upload.none(),deleteoffers)
routes.get("/fetchoffer/:id",fetchoffer)
routes.post('/updateoffer',upload.none(),updateoffer)
routes.post("/fetchactivevendordata",upload.none(),fetchactivevendordata)
routes.post('/fetchcatvendordata',upload.none(),fetchcatvendordata)
routes.post('/fetchdataofelectronicsales',upload.none(),fetchdataofelectronicsales)
routes.get('/contacttovendor',getcreatenotification);
routes.post('/sendnotification',upload.none(),postcreatenotification)
routes.post('/fetchnotifications',upload.none(),fetchnotifications)
routes.get('/notifications',getincomingnotification)
routes.post('/notificationsreaded',upload.none(),fetchnotificationsforadminreaded)
routes.post('/notificationsunreaded',upload.none(),fetchnotificationsforadminunreaded)
routes.post('/markasread',upload.none(),postmarkasread)
routes.post('/markallasread',upload.none(),postmarkasreadall)


export default routes;
