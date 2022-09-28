import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, CardActions, Checkbox, Avatar, IconButton, Typography } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import moment from "moment";
import axios from 'axios';
import { GetUser, LikePost } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";


export default function Post(props){ 
    const { data, currentUser} = props
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const toastOptions = {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };


    useEffect(() => {
        setIsLiked(data.likes.includes(currentUser._id));
    }, [currentUser._id, data.likes]);

    useEffect(() => {
        const fetchUser = async () => {
        await axios.get(`${GetUser}${data.userId}`)
        .then(res => {
            if(res.data.status === true ){
                setUser(res.data.user);
            }
        })

        };
        fetchUser();
    }, [data.userId]);

    const LikeHandler = async (e) => {
        if(e.target.checked === false){
            await axios.put(`${LikePost}${data._id}`,{
                userId: currentUser._id
            })
            .then(res => {
                if(res.data.status === false){
                    toast.error(
                        res.data.msg,
                        toastOptions
                    );
                }else{
                    setIsLiked(false)
                }
            })
        }
        else if(e.target.checked === true){
            await axios.put(`${LikePost}${data._id}`,{
                userId: currentUser._id
            })
            .then(res => {
                if(res.data.status === false){
                    toast.error(
                        res.data.msg,
                        toastOptions
                    );
                }else{
                    setIsLiked(true)
                }
            })
        }
    }

    return (
    <Card>
    <CardHeader
        avatar={
            <Avatar aria-label="recipe" src={`data:image/svg+xml;base64,${user.avatarImage}`} />
        }
        action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
        }
        title={user.username}
        subheader={moment.parseZone(data.updatedAt).format('LLLL')}
    />
    <CardMedia
        component="img"
        image={PF + data.img}
        alt="Image"
    />
    <CardContent>
        <Typography variant="body2" color="text.secondary">
            {data.desc}
        </Typography>
    </CardContent>
    <CardActions disableSpacing>
            <IconButton aria-label="add to favorites" onClick={(e) => LikeHandler(e)}>
            <Checkbox checked={isLiked} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}} />} />
            </IconButton>
    </CardActions>
    <ToastContainer />
</Card>
  )
}
