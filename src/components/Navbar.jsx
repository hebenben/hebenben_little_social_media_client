import { Paper, IconButton, AppBar, Toolbar, Typography, Box, InputBase, Badge, Avatar, Menu, MenuItem } from '@mui/material'
import { styled, } from '@mui/material/styles';
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { delCookie } from '../utils/tools';
import { useNavigate } from "react-router-dom";


const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
})

const Icons = styled(Box)(({ theme }) => ({
    display: "none",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.up("sm")]: {
        display: "flex"
    }
}));

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.up("sm")]: {
        display: "none"
    }
}));


export const Navbar = (props) => {
    const navigate = useNavigate();
    const { currentUser, setSearchData } = props
    const [open, setOpen] = useState(false)

    const homeHandler = (e) => {
        e.preventDefault();
        window.location.reload();
    }

    const SearchHandler = (e) => {
        e.preventDefault();
        setSearchData(e.target[0].value);
    }

    const LogoutHandler = (e) => {
        delCookie(process.env.REACT_APP_LOCALHOST_KEY);
        navigate("/login");
    }
    return (
        <AppBar position='sticky'>
            <StyledToolbar>
                <Typography variant='h6' onClick={e => homeHandler(e)}>hebenben</Typography>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: { xs: "50%", sm: "40%" } }}
                    onSubmit={e => SearchHandler(e)}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'Search...' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" >
                        <SearchIcon />
                    </IconButton>
                </Paper>
                <Icons>
                    {/* <Badge badgeContent={4} color="error">
                        <Mail />
                    </Badge> */}
                    {/* <Badge badgeContent={4} color="error">
                        <Notifications />
                    </Badge> */}
                    <Badge>
                        <Avatar onClick={e => setOpen(true)} sx={{ width: 30, height: 30 }} src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} />
                    </Badge>
                </Icons>
                <UserBox onClick={e => setOpen(true)}>
                    <Avatar sx={{ width: 30, height: 30 }} src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} />
                </UserBox>
            </StyledToolbar>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                open={open}
                onClose={e=>setOpen(false)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem >Profile</MenuItem>
                <MenuItem >My account</MenuItem>
                <MenuItem onClick={e => LogoutHandler(e)} >Logout</MenuItem>
            </Menu>
        </AppBar>
    )
}
