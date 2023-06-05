import express from "express"
import mysql from "mysql"
import cors from "cors"


const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    database:"ADT_FinalProject"
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hey, this is backend!")
})

app.get("/orders", (req,res)=>{
    //console.log("here");
    const q ="select o.order_id , o.order_date , c.customer_id , c.customer_name , c.zip_code , p.product_id, p.product_name , p.category ,  s.shipping_class , s.shipping_date , o.order_status FROM orders o, customers c, shipping s, products p where o.customer_id = c.customer_id and o.product_id = p.product_id and o.order_id = s.order_id;"
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        // console.log(data[1]);
        return res.json(data);
    })

})

// userSchema.methods.generateAuthToken = async function() {
//     //try using Camel notation here(User(U with uppercase))
//     const User = this    
//     const token = jwt.sign({_id:user._id.toString()},'thisisnewcourse')
//     return token}

// app.post("/auth", async (req, res) => {
// 	try {
// 		if(req.body.email === "hoosier@gmail.com"){

// 			console.log("here");

// 			if(req.body.password === "Test@123"){
// 				console.log("here 2");
				
//                 const User = this;

// 				const token = User.generateAuthToken();
// 				res.status(200).send({ data: token, message: "logged in successfully" });
// 			}else{
// 				return res.status(401).send({ message: "Invalid Email or Password" });				
// 			}

// 		}} catch (error) {
//             console.log(error);
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });


app.get("/createOrders", (req,res)=>{
    console.log("here on post_get");
    console.log(req.body.product_name);
    const q1= "SELECT MAX(order_id) AS max_order_id FROM orders;"
    db.query(q1,(err,result)=>{
        if (err){
            console.log(err)
        } else{
            let maxOrderIdResult=JSON.parse(JSON.stringify(result))
            console.log("here on post_get2");
            console.log(maxOrderIdResult[0].max_order_id);
            // console.log(result)
            res.json(maxOrderIdResult[0].max_order_id);
            // return(maxOrderIdResult[0].max_order_id);
            // res.send(maxOrderIdResult[0].max_order_id.toString());
        }
    })
}) 

app.get("/allData/:orderId/:productId/:customerId", async (req,res)=>{
    console.log("here on all data");
 
    const orderId = req.params.orderId;
    const productId= req.params.productId;
    const customerId= req.params.customerId;   

    const queryAllData = "select o.order_id,o.order_date, o.product_id,o.customer_id,o.order_status, s.shipping_date, s.shipping_class, p.product_name, p.sub_category, p.category, c.customer_name, c.city,c.state,c.country, c.zip_code from orders o, shipping s, products p, customers c where o.product_id = p.product_id and o.customer_id = c.customer_id and o.order_id = s.order_id and o.order_id =  ? and o.customer_id = ? and o.product_id = ?;"
    //const queryAllData = "select * from orders;";

    db.query(queryAllData,[ orderId, customerId, productId],(err,result)=>{
        if (err) return res.json(err)
        return res.json(result);
    })
}) 

app.post("/createOrders2",async (req,res)=>{
    let productId = 0;
    console.log("secondget2");
    const productName = req.body.product_name;
    const productCategory=req.body.category;
    const subCategory=req.body.sub_category;
    // console.log(req.body.sub_category);
    // console.log(req.body.category);
    // console.log(req.body.product_name);
    console.log(subCategory);
    console.log(productCategory);
    console.log(productName);
    // const q2= `SELECT product_id FROM products WHERE product_name = productName AND category = productCategory AND sub_category = subCategory;`
    const q2= 'SELECT product_id FROM products WHERE product_name=? and category=? and sub_category=?'
    db.query(q2,[ productName, productCategory, subCategory] ,(err,result)=>{
        // console.log("pruuuuu"+result[0].product_id)
        if (err){
            console.log(err);  
        } else if(result.length > 0){

            productId = result[0].product_id;
            console.log("already there"+productId);
            res.json(productId);
        }
        else{
            console.log("product not there");
            const query1= `SELECT MAX(product_id) AS max_product_id FROM products;`
            db.query(query1,(err,result)=>{
                if (err){
                    console.log(err) ;  
                } else{   
                    productId = result[0].max_product_id+1;
                    console.log(productId);
                    res.json(productId);
                }
            }
        )}
    })
})

//API for update the product table
app.put("/updateProduct",async (req,res)=>{
    
    let productId = 0;
    console.log("in product update API");

    const productName = req.body.product_name.toLowerCase();
    const productCategory=req.body.category.toLowerCase();
    const subCategory=req.body.sub_category.toLowerCase();

    console.log(subCategory);
    console.log(productCategory);
    console.log(productName);
    
    const q2= 'SELECT product_id FROM products WHERE lower(product_name)=? and lower(category)=? and lower(sub_category)=?'
    
    db.query(q2,[ productName, productCategory, subCategory] ,(err,result)=>{

        if (err){
            console.log(err);  
        } else if(result.length > 0){

            productId = result[0].product_id;
            console.log("already there"+productId);
            res.json(productId);
        }
        else{
            const query1= `SELECT MAX(product_id) AS max_product_id FROM products;`
            db.query(query1,(err,result)=>{
                if (err){
                    console.log(err) ;  
                } else{   
                    productId = result[0].max_product_id+1;

                    const productInsert ="INSERT INTO `ADT_FinalProject`.`products` (`product_id`,`product_name`,`category`,`sub_category`) VALUES (?);"
                    const productValues = [
                        productId,
                        req.body.product_name,
                        req.body.category, 
                        req.body.sub_category, 
                    ]

                    db.query(productInsert, [productValues], (err,data)=>{
                    })

                    res.json(productId);
                }
            }
        )}
    })
})


//API to update customer table
app.put("/updateCustomer",async (req,res)=>{

    console.log("in customer update API");
    console.log(req.body.customer_id);
    console.log(req.body.city);
    console.log(req.body.state);
    console.log(req.body.country);
    console.log(req.body.zip_code);
    console.log(req.body.customer_name);

    const updateCustomer = "update `ADT_FinalProject`.`customers` set customer_name = ?, city = ?, state = ?, country = ?, zip_code = ? where customer_id =?;"

    db.query(updateCustomer,[req.body.customer_name, req.body.city, req.body.state,req.body.country, req.body.zip_code,req.body.customer_id],(err,result)=>{
        if (err){
            res.json(err);  
        }else{
            res.json("Customer Updated Successfully");
        }
    }) 

})

//API to update order table
app.put("/updateOrder/:productId",async (req,res)=>{

    console.log("in order update API");
    console.log(req.body.order_date);
    console.log(req.body.order_status);
    console.log(req.body.customer_id);
    console.log(req.body.order_id);
    console.log(Number(req.params.productId));


    const updateOrder = "update `ADT_FinalProject`.`orders`  set order_date = ?, order_status = ?, product_id = ?, customer_id = ? where order_id =?;"

    db.query(updateOrder,[req.body.order_date.substr(0,10), req.body.order_status, Number(req.params.productId), req.body.customer_id, req.body.order_id],(err,result)=>{
        if (err){
            //res.json(err);  
        }else{

            const updateShipping = "update `ADT_FinalProject`.`shipping`  set shipping_date = ?, shipping_class = ? where order_id =?;"

            db.query(updateShipping,[req.body.shipping_date.substr(0,10), req.body.shipping_class, req.body.order_id],(err,result)=>{
             res.json("shipping Updated Successfully");

            }) 


        }
    }) 

})

app.post("/createOrders3",async (req,res)=>{
    let customerId = 0;
    const customerQuery = 'SELECT customer_id FROM customers WHERE customer_name = ? and city = ? and state = ? and zip_code = ?'

    db.query(customerQuery,[req.body.customer_name, req.body.city, req.body.state, req.body.zip_code],(err,result)=>{
       
        if (err){
            console.log(err);  
        } else if(result.length > 0){

            customerId = result[0].customer_id;
            // const test123 = customerId;
            res.json(customerId);
            console.log("already there"+customerId);
        }
        else{
            const query2= `SELECT MAX(customer_id) AS max_customer_id FROM customers;`
            
            db.query(query2,(err,result)=>{
                if (err){
                    console.log(err) ;  
                } else{
                        
                    customerId = result[0].max_customer_id+1;
                    res.json(customerId);
             
                }         
        })
        }
    }) 




})


 
app.post("/createOrders/:orderData/:productId/:customerId",async (req,res)=>{
//app.post("/createOrders/:orderData",async (req,res)=>{

    console.log("here on post");

    const orderData = req.params.orderData;
    console.log("orderid is"+ orderData)
    
    const productId= req.params.productId;
    console.log("productid is"+ productId)

    const customerId= req.params.customerId;
    console.log("customerid is"+ customerId)

    const orderId=parseInt(orderData)+1
    console.log(orderId)
    const q2 ="INSERT INTO `ADT_FinalProject`.`shipping` (`order_id`,`shipping_date`,`shipping_class`) VALUES (?);"
     const values2 = [
        orderId,
        req.body.shipping_date,
        req.body.shipping_class, 
    ]

    console.log(values2);
    db.query(q2, [values2], (err,data)=>{
    })

    const q3 ="INSERT INTO `ADT_FinalProject`.`products` (`product_id`,`product_name`,`category`,`sub_category`) VALUES (?);"
    const values3 = [
        productId,
        req.body.product_name,
        req.body.category, 
        req.body.sub_category, 
    ]
    console.log(values3);
    console.log("here :"+productId);
    db.query(q3, [values3], (err,data)=>{
    })


    const q4 ="INSERT INTO `ADT_FinalProject`.`customers` (`customer_id`,`customer_name`,`city`,`state`,`country`,`zip_code`) VALUES (?);"
    const values4 = [
        customerId,
        req.body.customer_name,
        req.body.city, 
        req.body.state, 
        req.body.country, 
        req.body.zip_code, 
    ]
    console.log(values4);
    db.query(q4, [values4], (err,data)=>{

        console.log("4");
    })

    const orderquery ="INSERT INTO `ADT_FinalProject`.`orders` (`order_id`,`order_date`,`order_status`,`product_id`,`customer_id`) VALUES (?);"

    const ordervalues = [
        orderId,
        req.body.order_date,
        req.body.order_status,
        parseInt(productId), 
        parseInt(customerId)
    ]

    console.log(ordervalues);
    db.query(orderquery, [ordervalues], (err,data)=>{
        console.log("1");
        res.json("Order has been created successfully")
    })

})

app.delete("/deleteOrder/:orderId/:customerId/:productId",async (req,res)=>{
    const orderId = req.params.orderId;
    const productId= req.params.productId;
    const customerId= req.params.customerId;

    console.log(orderId);
    console.log(productId);
    console.log(customerId);


    const deleteQuery = 'delete FROM orders WHERE order_id = ? and customer_id = ? and product_id = ?'
  
    db.query(deleteQuery, [orderId, customerId, productId], (err,data)=>{
        res.json("Order has been deleted successfully")
    })   

    })


app.listen(8800, ()=>{
    console.log("Connected to backend!")
})

