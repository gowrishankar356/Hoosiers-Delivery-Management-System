import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
//import './styles.css';

import React from 'react';




const Login = () => {

	const [data, setData] = useState({ email: "", password: "" , type:"Customer"});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			// const url = "http://localhost:8800/auth";
			// const { data: res } = await axios.post(url, data);
			// localStorage.setItem("token", res.data);
			
			// console.log(data);


			if(data.email==="hoosier@gmail.com" && data.password ==="Test@123"){
				const url = "/orders";
				window.location= url;	
			}

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
	<>
		<div className={styles.blackbox}>
		  <div className={styles.backgroundlayer}></div>
		</div>
		<div className={styles.container}>
		  	<form className={styles.form_container} onSubmit={handleSubmit} >
						<h1>Sign In</h1>
                      
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.button} >
							Sign In
						</button>						
				</form>
		</div>
	  </>
	);
};

export default Login;