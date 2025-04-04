// User Auth routes

import generalResponse from "../helpers/generalResponse.js";

// Example route for getting the signup page
export const getUserSignup = (req, res) => {
    res.render('user/signup');
}

// Example route for getting the Login page
export const getUserLogin = (req, res) => {
    res.render('user/login');
}

export const postUserSingup = async (req, res) => {
    try {

    } catch (error) {

    }
}

export const postUserLogin = async (req, res) => {
    try {

    } catch (error) {

    }
}


// Admin auth routes

export const getAdminLogin = (req, res) => {
    res.render('admin/login');
}
export const postAdminLogin = async (req, res) => {
    try {

    } catch (error) {

    }
}

// Vendor auth routes

export const getVendorSignup = (req, res) => {
    res.render('vendor/signup');
}

// Example route for getting the Login page
export const getVendorLogin = (req, res) => {
    res.render('vendor/login');
}

export const postVendorSingup = async (req, res) => {
    try {

    } catch (error) {
        return res.status(404).json(generalResponse(null, error.message));
    }
}

export const postVendorLogin = async (req, res) => {
    try {

    } catch (error) {

    }
}
