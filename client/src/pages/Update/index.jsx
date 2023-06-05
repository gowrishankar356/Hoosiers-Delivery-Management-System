import React, { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles.module.css';





const Update = () => {

  let {orderId, customerId, productId} = useParams();

  console.log(orderId);
  console.log(customerId);
  console.log(productId);


  const [order,setOrder] = useState({
    order_id: orderId,
    product_id: productId,
    customer_id: customerId,
    order_date: "",
    order_status: "",
    shipping_date: "",
    shipping_class: "",
    product_name: "",
    category: "",
    sub_category: "",
    customer_name: "",
    city: "",
    state: "",
    country: "",
    zip_code: ""
  
  })


  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate()
	
  const handleChange = (event) => {
		setOrder({ ...order, [event.target.name]: event.target.value });
		console.log(order);
	};

  useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			 `http://localhost:8800/allData/${orderId}/${productId}/${customerId}`
		  );
		  setSearchResult(searchResponse.data);
      console.log(searchResponse.data);
		};
		getData();
	  }, []);

    if(searchResult != null && order.order_date ==""){
      console.log(searchResult[0].order_id);
      console.log(searchResult[0].customer_id);
      console.log(searchResult[0].product_id);
      let order_id = searchResult[0].order_id;
      let customer_id = searchResult[0].customer_id;
      let product_id = searchResult[0].product_id;
      //let order_date = searchResult[0].order_date;

      let  order_input = searchResult[0].order_date;
      let [order_year, order_month, order_day] =  order_input.split('-');

    //   try{
    //     console.log(parseInt(order_day.substring(1,3)));
    //      order_day = parseInt(order_day.substring(1,3));
    //   }
    //   catch{
    //      order_day = `0${order_day.substring(1,2)}`;
    //   }
    //console.log(order_day.substring(1,3));
     if(isNaN(order_day.substring(1,3))){
        order_day = `0${order_day.substring(1,2)}`;
        console.log("in this");
        
     }else{
        console.log("in that");
        order_day = parseInt(order_day.substring(1,3));
     }

    let order_date  = `${order_year}-${order_month}-${order_day}`;


      let order_status = searchResult[0].order_status;
      //let shipping_date = searchResult[0].shipping_date;


      let  shipping_input = searchResult[0].shipping_date;
      let [shipping_year, shipping_month, shipping_day] =  shipping_input.split('-');

      if(isNaN(shipping_day.substring(1,3))){
        shipping_day = `0${shipping_day.substring(1,2)}`;
        console.log("in this");
        
     }else{
        console.log("in that");
        order_day = parseInt(order_day.substring(1,3));
     }

    let shipping_date  = `${shipping_year}-${shipping_month}-${shipping_day}`;

      
      let shipping_class = searchResult[0].shipping_class;
      let category = searchResult[0].category;
      let sub_category = searchResult[0].sub_category;
      let product_name = searchResult[0].product_name;
      let customer_name = searchResult[0].customer_name;
      let city = searchResult[0].city;
      let state = searchResult[0].state;
      let country = searchResult[0].country;
      let zip_code = searchResult[0].zip_code;
      setOrder( order.order_date = order_date, order.order_status = order_status, order.shipping_date=shipping_date, order.shipping_class = shipping_class, order.category = category, order.sub_category = sub_category, order.product_name = product_name, order.customer_name = customer_name, order.city = city, order.state = state, order.country = country, order.zip_code = zip_code );
      console.log(order);
    }


  const handleUpdate = async e =>{
    try {

        //udpating the product
        const productResponse = await axios.put("http://localhost:8800/updateProduct", order);
        const productId = productResponse.data;

        //updating the customer
        console.log(customerId);
        const customerResponse = await axios.put(`http://localhost:8800/updateCustomer`, order);

        //updating the order details
        await axios.put(`http://localhost:8800/updateOrder/${productId}`, order);
        navigate("/orders");
     
      } catch (error) {
        console.log(error);
        alert("Error adding order. Please try again.")
      }
  }


  return(
    <div className={styles.order_form}>  
        <h2>Update Order</h2> < br/> <br/> 
        <div className={styles.create_form}>
            <div className={styles.create}>
                <div className={styles.form1}>
                <form >
                    <lable for='date'>Order Date :</lable>
                    <input type="date" onChange={handleChange} data-date="" data-date-format="DD MMMM YYYY"  name = "order_date" value={order.order_date}/>  < br/> <br/> 
                    <lable for='status'>Order Status</lable>
                    <input
                        type='text'
                        className={styles.Status}
                        id='status'
                        name='order_status'
                        placeholder='Enter the status'
                        value={order.order_status}
                        required
                        onChange={handleChange} /> <br/> < br/> <br/> 
                    <lable for='date'>Shipping Date :</lable>
                    <input type="date" onChange={handleChange} data-date="" data-date-format="DD MMMM YYYY"  name = "shipping_date" value={order.shipping_date}/>  < br/> <br/>                         
                    <lable for='shippingClass'>Shipping Class   :</lable>
                    <select id="shippingClass" onChange={handleChange} name = "shipping_class" value = {order.shipping_class} >
                        <option value="0"></option>
                        <option value="First Class">First Class</option>
                        <option value="Second Class">Second Class</option>
                        <option value="Standard Class">Standard Class</option>
                    </select><br /> < br/> <br/> 
                    <lable for='productCategory'>Product Category   :</lable>
                    <select id="productCategory" onChange={handleChange} name = "category" value = {order.category} >
                        <option value="0"></option>
                        <option value="Technology">Technology</option>
                        <option value="Furniture">Furniture</option>
                        <option value="Office Supplies">Office Supplies</option>
                    </select> <br /> < br/> <br/> 
                    <lable for='subCategory'>Product sub-category :</lable>
                    <input
                        type='text'
                        className={styles.subCategory}
                        id='subCategory'
                        name='sub_category'
                        placeholder='Enter the subcategory'
                        value={order.sub_category}
                        required
                        onChange={handleChange} /> <br/> < br/> <br/> 
                    <lable for='productName'>Product Name   :</lable>
                    <input
                        type='text'
                        className={styles.ProductName}
                        id='productName'
                        name='product_name'
                        placeholder='Enter the product'
                        value={order.product_name}
                        required
                        onChange={handleChange}/> <br/>   <br/>                 

                </form> 
                </div>

                <div className={styles.form2}>
                <form>
                    <lable for='Cusname'>Customer Name  :</lable>
                    <input
                        type='text'
                        className={styles.CustomerName}
                        id='Cusname'
                        name='customer_name'
                        placeholder='Enter customer name'
                        value={order.customer_name}
                        required
                        onChange={handleChange} /> <br/>  <br /> <br/> 
                    <lable for='Cname'>Country  :</lable>
                    <input
                        type='text'
                        className={styles.Country}
                        id='Cname'
                        name='country'
                        placeholder='Enter your Country'
                        value={order.country}
                        required
                        onChange={handleChange}/> <br/>  <br /> <br/> 
                    <lable for='sname'>State    :</lable>
                    <input
                        type='text'
                        className={styles.State}
                        id='sname'
                        name='state'
                        placeholder='Enter your State'
                        value={order.state}
                        required
                        onChange={handleChange}/> <br/>  <br /> <br/> 
                    <lable for='cname'>City :</lable>
                    <input
                        type='text'
                        className={styles.City}
                        id='cname'
                        name='city'
                        placeholder='Enter your City'
                        value={order.city}
                        required
                        onChange={handleChange} /> <br/>  <br /> <br/> 
                    <lable for='zip'>ZipCode    :</lable>
                    <input
                        type='number'
                        className={styles.ZipCode}
                        id='zip'
                        name='zip_code'
                        placeholder='Enter Zip code'
                        value={order.zip_code}
                        required
                        onChange={handleChange}/> <br/>  <br />
                </form>
                

                </div>
            </div>
            <button type='submit' onClick = {handleUpdate} className={styles.logbutton}>Update Order</button>
        </div>
    </div>
    )
}

export default Update
