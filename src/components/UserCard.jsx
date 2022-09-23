import { LocationOn } from '@mui/icons-material'
import Edit from '@mui/icons-material/Edit'
import { Avatar, Box, Card, Chip, Divider, FormControlLabel, IconButton, Stack, styled, Switch, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FollowhUser, UnFollowhUser } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";

const FollowSwitch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

export const UserCard = (props) => {
    const { userDatas, currentUser} = props
    const [isFollowed, setIsFollowed] = useState(false);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        setIsFollowed(userDatas.followers.includes(currentUser._id));
    }, [currentUser._id, userDatas.followers]);

    const followHandler = async (e) =>{
        if(e.target.checked === false){
            await axios.put(`${UnFollowhUser}${userDatas._id}`,{
                userId: currentUser._id
            })
            .then(res => {
                if(res.data.status === false){
                    toast.error(
                        res.data.msg,
                        toastOptions
                    );
                }else{
                    setIsFollowed(false)
                }
            })
        }
        else if(e.target.checked === true){
            await axios.put(`${FollowhUser}${userDatas._id}`,{
                userId: currentUser._id
            })
            .then(res => {
                if(res.data.status === false){
                    toast.error(
                        res.data.msg,
                        toastOptions
                    );
                }else{
                    setIsFollowed(true)
                }
            })
        }

    }
  return (
    <Card>
        <Box sx={{ p: 2, display: 'flex',justifyContent: 'space-between' }}>
            <Stack justifyContent="center">
                <Avatar variant="rounded" src={`data:image/svg+xml;base64,${userDatas.avatarImage}`} />
            </Stack>
            <Stack spacing={4} justifyContent="center">
            <Typography  fontWeight={900}>{userDatas.username}</Typography>
            </Stack>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
                sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
            >
                <FormControlLabel
                    control={<FollowSwitch checked={isFollowed} onChange={e => followHandler(e)} />}
                    label="Follow"
                />
            </Stack>
        </Box>
        <ToastContainer />
    </Card>
  )
}
