import connection from "../database/connection.js"
import generalResponse from "../helpers/generalResponse.js"

//admin controller

// Example route for getting the dashboard

///////////////////admin dashboard/////////////
export const dashboardControl = async (req, res) => {
    res.render('./admin/dashboard')
}

export const orderOverView = async (req,res) => {

    try {
        
    let sqlorder_details = `select count(*) as cnt,order_status from order_details group by order_status` 

    let [results] = await connection.query(sqlorder_details);


    return res.status(200).json(generalResponse("Data of Order's",results))
    return res.status(200).json(generalResponse("Data of Order's",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching order details ${error.message}`
        })
    }

}

export const vendorOverView = async (req,res) => {

    try {
        
    let sqlvendor_details = `select count(*) as cnt, ca.cat_name
                            from vendor_details as vd
                            join categories as ca
                            on ca.cat_id = vd.cat_id
                            where vd.is_verified = 1
                            group by vd.cat_id;` 

    let [results] = await connection.query(sqlvendor_details);


    return res.status(200).json(generalResponse("Data of vendors",results))
    return res.status(200).json(generalResponse("Data of vendors",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching vendor details ${error.message}`
        })
    }

}

export const salesOverView = async (req,res) => {

    try {
        
    let sqlsales_details = `select count(*) as cnt, ca.cat_name
                            from order_details as od
                            join categories as ca
                            on ca.cat_id = od.cat_id
                            where od.order_status = "complete"
                            group by od.cat_id;` 

    let [results] = await connection.query(sqlsales_details);


    return res.status(200).json(generalResponse("Data of sales",results))
    return res.status(200).json(generalResponse("Data of sales",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching sales details ${error.message}`
        })
    }
}

export const usersOverView = async (req,res) => {

    try {
        
    let sqlusers_details = `select first_name,last_name,email from user_table order by created_at DESC limit 10` 

    let [results] = await connection.query(sqlusers_details);


    return res.status(200).json(generalResponse( "Data of users",results))
    return res.status(200).json(generalResponse("Data of users",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching users details ${error.message}`
        })
    }
}

export const productOverView = async (req,res) => {

    try {
        
    let sqlproduct_details = `select products_name,price,description from products order by created_at DESC limit 8` 

    let [results] = await connection.query(sqlproduct_details);


    return res.status(200).json(generalResponse("Data of product",results))
    return res.status(200).json(generalResponse("Data of product",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching product details ${error.message}`
        })
    }
}


export const expenseAndProfiteOverView = async (req,res) => {

    try {
        
    let sqlexpense_details = `select sum(price) as total from products` 

    let [results] = await connection.query(sqlexpense_details);


    return res.status(200).json(generalResponse("Data of profile & expense",results))
    return res.status(200).json(generalResponse("Data of profile & expense",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching profile & expense details ${error.message}`
        })
    }
}



/////////// Admin < user dashboard//////
export const usersDetails = async (req, res) => {
    res.render('./admin/users')
}

export const availableProduct = async (req, res) => {
    res.render('./admin/availableProducts')
}

export const userCityDetails = async (req,res) => {

    try {
        
    let sqlusers_details = `select count(*) as cnt, city from user_address_table group by city` 

    let [results] = await connection.query(sqlusers_details);


    return res.status(200).json(generalResponse("Data of group by user city's ",results))
    return res.status(200).json(generalResponse("Data of group by user city's ",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching group by user city's details ${error.message}`
        })
    }
}


export const productDetails = async (req,res) => {

    try {
        
    let sqlproduct_details = `select count(*) as cnt, ct.cat_name 
                            from products as pd
                            join categories as ct
                            on pd.cat_id = ct.cat_id
                            group by pd.cat_id` 

    let [results] = await connection.query(sqlproduct_details);


    return res.status(200).json(generalResponse("Data of product group by categories ",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching of product group by categories  ${error.message}`
        })
    }
}

export const electronicsProductDetails = async (req,res) => {

    try {
        
    let sqlelectonics_details = `select count(*) as cnt,products_name from products where cat_id = 1 group by products_name` 

    let [results] = await connection.query(sqlelectonics_details);


    return res.status(200).json(generalResponse("Data of product group by categories in electronics",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching of product group by categories in electronics  ${error.message}`
        })
    }
}


export const clothesProductDetails = async (req,res) => {

    try {
        
    let sqlclothes_details = `select count(*) as cnt,products_name from products where cat_id = 2 group by products_name` 

    let [results] = await connection.query(sqlclothes_details);


    return res.status(200).json(generalResponse("Data of product group by categories in clothes ",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching of product group by categories in clothes ${error.message}`
        })
    }
}

export const OdersListing = async (req,res) => {

    try {
        
    let sqlorder_listing = `select ut.first_name, ut.last_name, pt.products_name, pt.price, od.order_status 
                            from order_details as od 
                            join user_table as ut
                            on ut.user_id = od.user_id
                            join products as pt
                            on pt.products_id = od.product_id
                            where pt.is_sold = 1;
                            ` 

    let [results] = await connection.query(sqlorder_listing);


    return res.status(200).json(generalResponse("Data of product group by categories in clothes ",results))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching of product group by categories in clothes ${error.message}`
        })
    }
}


export const getCardData = async (req, res) => {


    try {
        let totalOrders = `select count(*) as cnt from order_details`
        let totalUsers = `select count(*) as cnt from user_table`
        let totalSales = `select count(*) as cnt
                            from order_details as od
                            join categories as ca
                            on ca.cat_id = od.cat_id
                            where od.order_status = "complete";` 
    
        let [orders] = await connection.query(totalOrders)
        let [users] = await connection.query(totalUsers)
        let [sales] = await connection.query(totalSales);
    
        let results = {
            totalOrder : [orders],
            totalUser : [users],
            totalSale : [sales]
        }
    
        return res.status(200).json(generalResponse("Get all card data for admin Dashboard", results))
    } catch (error) {
        return res.status(500).json({
            message : `error in fetching Get all card data for admin Dashboard ${error.message}`
        })
    }

}

export const viewProfilAdmin = async (req, res) => {
    res.render('./admin/adminprofile.ejs')
}   

export const getProfile = async (req,res) => {
    try {
        let adminData = `select * from admin_table limit 1`

        let [admin] = await connection.query(adminData);

        return res.status(200).json(generalResponse("Get Data of admin Profile", admin))

    } catch (error) {
        return res.status(500).json({
            message : `error in fetching admin profile data ${error.message}`
        })
    }
}

// //admin controller
// export const dashboardControl = async (req, res) => {
//     res.render('./admin/adminDashboard')
// }

export const vendorsDetails = async (req, res) => {
    res.render('./admin/vendorsDetails')
}
export const fetchvendorscontroller = async (req,res) => {
    try {
        let [result] = await connection.query(`SELECT * FROM vendor_details`)
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchpendingverificationvendors = async (req,res) => {
    try {
        let [result] = await connection.query(`SELECT * FROM vendor_details where is_verified = 0 and is_deleted = 0`)
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchvendorcontroller = async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        let [result] = await connection.query(`SELECT * FROM vendor_details where vendor_id="${id}"`)
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const ListProductsController = async(req,res)=>{
    res.render('./vendor/productListing')
}
export const ordersDetails = async (req, res) => {
    res.render('./admin/orderDetails')
}
export const salesDetails = async (req, res) => {
    res.render('./admin/salesDetails')
}
export const getpendingverification = async (req,res) => {
    res.render('./admin/pendingverification')
}
export const getpendingverificationgetdetails = async (req,res) => {
    let id = req.params.id
    try {
        let [result] = await connection.query(`SELECT * FROM vendor_details where vendor_id="${id}"`)
        res.render('./admin/pvSeedetails', {result:result})
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
    
}

export const sendmailonrejection = async (req,res) => {
    try {
        let [result] = await connection.query(`UPDATE vendor_details SET is_deleted = 1  WHERE vendor_id= "${req.body.id}"`)
        return res.status(200).json(generalResponse(`vendor is rejected due to ${req.body.name}`))
        // send mail to vendor for rejection
    } catch (error) {
        return res.status(404).json(generalResponse("success"))
    }
}

export const sendmailonverification = async (req,res) => {
    try {
        let [result] = await connection.query(`UPDATE vendor_details SET is_verified = 1  WHERE vendor_id= "${req.body.id}"`)
        return res.status(200).json(generalResponse(`verification success`))
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const getofferspage = async (req,res) => {
    try {
        res.render("./admin/offers")
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const postofferspage = async (req,res) => {
    try {
        let query = `INSERT INTO offers_details(offer_name, offer_start_date, offer_end_date) VALUES ("${req.body.offername}","${req.body.startdate}","${req.body.enddate}")`
        let [result] = await connection.query(query)
        return res.status(200).json(generalResponse("offer added succesfully"))
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const updateoffer = async (req,res) => {
    try {
        var datetime = new Date();
        let [result] = await connection.query(`UPDATE offers_details SET offer_name="${req.body.offername}",offer_start_date="${req.body.startdate}",offer_end_date="${req.body.enddate}",offer_updated_at= "${datetime}" WHERE offer_id = "${req.body.id}"`)
        return res.status(200).json(generalResponse("offer updated succesfully"))
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const fetchoffers = async (req,res) => {
    try {
        let [result] = await connection.query(`select * from offers_details`)
        return res.status(200).json(generalResponse("offer fetched succesfully",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const deleteoffers = async (req,res) => {
    try {
        let [result] = await connection.query(`UPDATE offers_details SET is_expired = "1" WHERE offer_id = ${req.body.id}`)
        return res.status(200).json(generalResponse("offer deleted successfully"))
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}
export const fetchoffer = async (req,res) => {
    try {
        let [result] = await connection.query(`select * from offers_details WHERE offer_id = ${req.params.id}`)
        res.render("admin/offeredit", {result:result})
    } catch (error) {
        return res.status(404).json(generalResponse(error))
    }
}


export const fetchactivevendordata = async (req,res) => {
    try {
        let [active] = await connection.query(`SELECT COUNT(*) FROM vendor_details where is_active =1`)
        let [notactive] = await connection.query(`SELECT COUNT(*) FROM vendor_details where is_active =0`)
        let result = {"active":Object.values(active[0])[0],"notactive":Object.values(notactive[0])[0]}
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}

export const fetchcatvendordata = async (req,res) => {
    try {
        let [cat1] = await connection.query(`SELECT COUNT(*) FROM vendor_details where cat_id =1`)
        let [cat2] = await connection.query(`SELECT COUNT(*) FROM vendor_details where cat_id =2`)
        let result = {"electronics":Object.values(cat1[0])[0],"clothes":Object.values(cat2[0])[0]}
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchdataofelectronicsales = async (req,res) => {
    try {
        let [cat1] = await connection.query(`select ANY_VALUE(p.products_name) as product_name, count(o.order_id) from products p left JOIN order_details o on p.products_id=o.product_id GROUP by p.products_id`)
        const productname = cat1.map(item => item.product_name);
        const no = cat1.map(item => item['count(o.order_id)']);
        let result = {"productname":productname,"no":no}
        return res.status(200).json(generalResponse("success",result))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const getcreatenotification = async (req,res) => {
    try {
        return res.render("admin/createnotification")
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}

export const postcreatenotification = async (req,res) => {
    try {
        let query = `INSERT INTO notifictation_details(notifictation_created_by,notifictation_for,notification_subject,notifictation_content)
VALUES
        ("admin","${req.body.notifyto}","${req.body.Subject}","${req.body.Content}")`;
        let [createnotificationn] = await connection.query(query)
        return res.status(200).json(generalResponse("notification seneded"))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchnotifications = async (req,res) => {
    try {
        let query = `select * from notifictation_details where notifictation_created_by = "admin"`
        let [createnotificationn] = await connection.query(query)
        return res.status(200).json(generalResponse("notification sended",createnotificationn))
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


export const fetchnotificationsforadminreaded = async (req,res) => {
    try {
        let query = `select * from notifictation_details where notifictation_for = "admin" and notifictation_is_readed= "1"`
        let [fetchnotificationsforadminn] = await connection.query(query)
        return res.status(200).json(generalResponse("notifications fetched",fetchnotificationsforadminn))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
export const fetchnotificationsforadminunreaded = async (req,res) => {
    try {
        let query = `select * from notifictation_details where notifictation_for = "admin" and notifictation_is_readed= "0"`
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
    try {
        let query = `UPDATE notifictation_details SET notifictation_is_readed = "1" where notifictation_for = "admin"`
        let [markasreadmsg] = await connection.query(query)
        return res.status(200).json(generalResponse("all notification marked as readed"))
    } catch (error) {
        return res.status(404).json(generalResponse(error.message))
    }
}
// controller for vendor side



// select cat_name ,ANY_VALUE(p.products_name) as product_name, count(o.order_id) from products p left JOIN order_details o on p.products_id=o.product_id 
// left JOIN vendor_product_details on vendor_product_details.vendor_product_id = p.vendor_product_id  where cat_id = "1"GROUP by p.products_id
