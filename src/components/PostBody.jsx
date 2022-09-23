import React, { useState, useEffect } from 'react'
import Post from './Post';
import { Box, styled } from "@mui/material"
import Masonry from '@mui/lab/Masonry';
import axios from 'axios';
import { GetPost, GetUser, GetUserPost, SearchUser } from '../utils/APIRoutes';
import { getCookie } from "../utils/tools";
import { useNavigate } from "react-router-dom";
import { UserCard } from './UserCard';


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


export default function PostBody(props) {
    const { currentUser,searchData, typeChoice } = props;
    const [datas, setDatas] = useState([])

    useEffect(()=>{
      const PostData = async () => {
          if(searchData === ""){
            await axios.get(`${GetUserPost}${currentUser._id}`)
            .then(res => {
              !!res.data.status ?
                setDatas(
                  res.data.posts.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                      })
                ) :
                setDatas([])
            })
          }
          if(typeChoice === "posts"){
            if(searchData !== ""){
              await axios.get(`${GetPost}${searchData}`)
              .then(res => {
                !!res.data.status ?
                setDatas(
                  res.data.posts.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                      })
                ) :
                setDatas([])
              })
            }
            else {
              await axios.get(`${GetUserPost}${currentUser._id}`)
              .then(res => {
                !!res.data.status ?
                setDatas(
                  res.data.posts.sort((p1, p2) => {
                        return new Date(p2.createdAt) - new Date(p1.createdAt);
                      })
                ) :
                setDatas([])
              })
            }
          } 
      }
      PostData();
  },[searchData,props.currentUser])
  
    return (
        <Box>
            <Masonry  sx={{margin:"2px 2px 6rem 2px"}}
                columns={{ xs: 1, sm: 2, md: 3 }}
                spacing={2}
                defaultHeight={450}
                defaultColumns={4}
                defaultSpacing={1}
                >
                {typeChoice === "" ? 
                    (datas !== [] ? (
                      datas.map((data,index) => (<Post data={data} key={index} currentUser={currentUser}/>))
                    ) : (<Div>{"no post"}</Div>)) :

                  (
                    datas !== [] ? (
                      datas.map((data,index) => (<Post data={data} key={index} currentUser={currentUser}/>))
                    ) : (<Div>{"no post"}</Div>)
                  )
                }
            </Masonry>
        </Box>
    )
}
