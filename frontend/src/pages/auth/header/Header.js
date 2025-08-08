import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from "react";
import { isAdminLoggedIn, isCustomerLoggedIn, removeToken } from "../../../utils/common";


export default function Header(){
    const[isAdmin, setIsAdmin] = useState(false);
    const[isCustomer, setIsCusromer] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserRoles = async () => {
            try{
            const isAdmin = await isAdminLoggedIn();
            const isCustomer = await isCustomerLoggedIn();
            setIsAdmin(isAdmin)
            setIsCusromer(isCustomer)
            }catch(error){
                console.error(`Error: error fetching roles: `, error.message)
            }
        }
        fetchUserRoles();
    }, [location]);

const handleLogout = () => {
    navigate('/login');
    removeToken();
}


    return(
        <>
        {!isCustomer && !isAdmin &&(
            <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge='start'
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                            <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow: 1}}
                    >
                        Book App
                    </Typography>
                    <Button component={Link} to='/login' color="inherit">Login</Button>

                    <Button component={Link} to='/register' color="inherit">Register</Button>
                </Toolbar>
            </AppBar>
        </Box>
        )}

        {isAdmin &&(
            <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge='start'
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                            <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow: 1}}
                    >
                        Admin
                    </Typography>
                    <Button component={Link} to='/admin/dashboard' color="inherit">Dashboard</Button>
                    <Button component={Link} to='/admin/book/post' color="inherit">Post Books</Button>
                    <Button component={Link} to='/admin/orders' color="inherit">Orders</Button>
                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
        )}

{isCustomer &&(
            <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge='start'
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}>
                            <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component='div' sx={{flexGrow: 1}}
                    >
                        Customer
                    </Typography>
                    <Button component={Link} to='/customer/dashboard' color="inherit">Dashboard</Button>
                    <Button component={Link} to='/customer/cart' color="inherit">Cart</Button>
                    <Button component={Link} to='/customer/orders' color="inherit">My Orders</Button>

                    <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
        )}
        </>
    )
};