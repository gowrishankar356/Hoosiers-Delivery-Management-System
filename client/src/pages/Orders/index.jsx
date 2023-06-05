import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//import './Orders.css';


//for front end changes
// for front end code
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { FaPencilAlt} from 'react-icons/fa';
import {GoTrashcan} from "react-icons/go";
import {AiFillEye} from "react-icons/ai";

const pages = ['Create Order', 'Logout'];
const settings = [''];


const Orders = () => {

    const [orders,setOrders]= useState([]);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };     

    const handleDetails = (e) => {
      let orderID = e.target.getAttribute('orderID');
      let customerId = e.target.getAttribute('customerId');
      let productId   =  e.target.getAttribute('productId');

      window.location = `/read/${orderID}/${customerId}/${productId}`;

    };  

    const handleMenu = (event) =>
	  {
		console.log(event.target.getAttribute('name'));
		if (event.currentTarget.name === "Create Order"){
		  const url = "/add";
		  window.location=url;}else{
        window.location = "/";
      }
	  };  
    
    const handleUpdate = async(e) => {
      let orderID = e.target.getAttribute('orderID');
      let customerId = e.target.getAttribute('customerId');
      let productId   =  e.target.getAttribute('productId');

      window.location = `/update/${orderID}/${customerId}/${productId}`;

    };  
 
    
    const handleDelete = async (e) => {

        let orderID = e.target.getAttribute('orderID');
        let customerId = e.target.getAttribute('customerId');
        let productId   =  e.target.getAttribute('productId');
         await axios.delete(`http://localhost:8800/deleteOrder/${orderID}/${customerId}/${productId}`);
    //  axios.await(`http://localhost:8800/deleteOrder/${orderID}/${customerId}/${productId}`);
     window.location = "/orders";
    };        
 

    useEffect(()=>{
        const fetchAllOrders = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/orders");
                //console.log(res.data);
                setOrders(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllOrders()
    },[])
      

    function SearchResult(props) {
		const { data } = props;

			return (
					<TableContainer component={Paper} sx={{padding: 3 , MarginOutlined:"black"}}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
						<TableRow>
							<TableCell align="left">Order Id</TableCell>
							<TableCell align="left">Order Date</TableCell>
							<TableCell align="left">Customer Id</TableCell>
							<TableCell align="left">Customer Name</TableCell>

                            <TableCell align="left">Zip Code</TableCell>
                            <TableCell align="left">Product Id</TableCell>
                            <TableCell align="left">Product Name</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Shipping Class</TableCell>
                            <TableCell align="left">Shipping Date</TableCell>
                            <TableCell align="left">Order Status</TableCell>
                            <TableCell align="left">Actions</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
						{data.map((data,index) => (
							<TableRow
							key={data.index}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
							<TableCell component="th" scope="row">
								{data.order_id}
							</TableCell>
							<TableCell align="left">{data.order_date}</TableCell>
							<TableCell align="left">{data.customer_id}</TableCell>
							<TableCell align="left">{data.customer_name}</TableCell>
                            <TableCell align="left">{data.zip_code}</TableCell>
                            <TableCell align="left">{data.product_id}</TableCell>
                            <TableCell align="left">{data.product_name}</TableCell>
                            <TableCell align="left">{data.category}</TableCell>
                            <TableCell align="left">{data.shipping_class}</TableCell>
                            <TableCell align="left">{data.shipping_date}</TableCell>
                            <TableCell align="left">{data.order_status}</TableCell>
							<TableCell align="left">
                      <Button sx={{m: 1}} style = {StyleSheet.Button}  size = "small" variant="contained" color="primary" type="button" value ="View"   onClick={handleDetails}  orderId = {data.order_id} customerId = {data.customer_id} productId = {data.product_id}><AiFillEye/></Button>
											<Button  sx={{m: 1}} size = "small"   variant="contained" color="primary" type="button" value= "Update" onClick={handleUpdate}  orderId = {data.order_id} customerId = {data.customer_id} productId = {data.product_id} ><FaPencilAlt/></Button>
                      <Button  sx={{m: 1}}  size = "small"   variant="contained" color="primary" type="button" value= "Delete" onClick={handleDelete}  orderId = {data.order_id} customerId = {data.customer_id} productId = {data.product_id}><GoTrashcan/></Button>
                                            </TableCell>
							</TableRow>
						))}
						</TableBody>
					</Table>
					</TableContainer>	
			);
		}		   



  return (
    <div>
<AppBar position="static">
      
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'futura',
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Hoosier Deliveries
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleMenu}
                name = {page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    {orders && <SearchResult data={orders} />}
        </div>
  )
}

export default Orders;