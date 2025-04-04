// Example route for getting the dashboard page
import connection from "../database/connection.js"
import generalResponse from "../helpers/generalResponse.js"
export const getVendorDashboard = (req, res) => {
    res.render('vendor/dashboard');
}

export const getcontacttoadmin = async (req,res) => {
    try {
        return res.render("vendor/contacttoadmin")
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}

export const postcontacttoadmin = async (req,res) => {
    try {
        // fetch vendorname using middleware 
        let vendor = "vendorr"
        let query = `INSERT INTO notifictation_details(notifictation_created_by,notifictation_for,notification_subject,notifictation_content)
        VALUES
        ("${vendor}","${req.body.admin}","${req.body.Subject}","${req.body.Content}")`
        let [createnotificationn] = await connection.query(query);
        return res.status(200).json(generalResponse("notification seneded"))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const getnotifications = async (req,res) => {
    try {
        return res.render("vendor/notifications")
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}


export const getincomingnotification = async (req,res) => {
    try {
        return res.render("admin/incomingnotification")
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}


export const fetchnotificationsforvendorreaded = async (req,res) => {
    // fetch vendor using jwt decoding
    let vendor = "abc@gmail.com"
    try {
        let query = `select * from notifictation_details where (notifictation_for = "${vendor}" or notifictation_for = "all") and notifictation_is_readed= "1"`;
        let [fetchnotificationsforadminn] = await connection.query(query)
        return res.status(200).json(generalResponse("notifications fetched",fetchnotificationsforadminn))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchnotificationsforvendorunreaded = async (req,res) => {
    let vendor = "abc@gmail.com"
    try {
        let query = `select * from notifictation_details where (notifictation_for = "${vendor}" or notifictation_for = "all") and notifictation_is_readed= "0"`
        let [fetchnotificationsforadminn] = await connection.query(query)
        return res.status(200).json(generalResponse("notifications fetched",fetchnotificationsforadminn))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}

export const postmarkasread = async (req,res) => {
    try {
        let query = `UPDATE notifictation_details SET notifictation_is_readed = "1" where notifictation_id = "${req.body.id}"`
        let [markasreadmsg] = await connection.query(query)
        return res.status(200).json(generalResponse("success"))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const postmarkasreadall = async (req,res) => {
    // fetch vendor using jwt decoding
    let vendor = "abc@gmail.com";
    try {
        let query = `UPDATE notifictation_details SET notifictation_is_readed = "1" where notifictation_for = "${vendor}"`
        let [markasreadmsg] = await connection.query(query)
        return res.status(200).json(generalResponse("all notification marked as readed"))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}