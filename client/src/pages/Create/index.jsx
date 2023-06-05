import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';  
import styles from './styles.module.css';


const Add = () => {
  const [order,setOrder] = useState({
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

  const navigate = useNavigate()

  const handleChange = (e) =>{
    setOrder((prev)=>({...prev, [e.target.name]: e.target.value}))
    console.log(order);
  }



  const handleSubmit = async e=>{
    e.preventDefault();

    try {
        console.log(order.product_name);
        const response = await axios.get("http://localhost:8800/createOrders", order);
        console.log(response.data)
        console.log("outtt")
        const orderData = response.data; // Store the returned data in a variable

        

        const response2 = await axios.post("http://localhost:8800/createOrders2", order);
        const productId = response2.data;
        console.log(productId);

        const response3 = await axios.post("http://localhost:8800/createOrders3", order);
        const customerId = response3.data;
        console.log(customerId);

        await axios.post(`http://localhost:8800/createOrders/${orderData}/${productId}/${customerId}`, order);
        navigate("/orders");
      } catch (error) {
        console.log(error);
        alert("Error adding order. Please try again.")
      }
  }

  return(
    <div className={styles.order_form}>  
        <h2>Create New Order</h2> < br/> <br/> 
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
            <button type='submit' onClick = {handleSubmit} className={styles.logbutton}>Create Order</button>
        </div>
    </div>
    )
}


export default Add
