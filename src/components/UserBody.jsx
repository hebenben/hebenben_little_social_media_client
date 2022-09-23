import React, { useState, useEffect } from 'react'
import Post from './Post';
import { Box, styled } from "@mui/material"
import Masonry from '@mui/lab/Masonry';
import axios from 'axios';
import { SearchUser } from '../utils/APIRoutes';
import { UserCard } from './UserCard';


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


export default function UserBody(props) {
    const { currentUser, searchData} = props;
    const [userDatas, setUserDatas] = useState([])

    useEffect(()=>{
      const PostData = async () => {
        await axios.get(`${SearchUser}${searchData}`)
        .then(res => {
          !!res.data.status ?
          setUserDatas(
            res.data.users
          ) :
          setUserDatas([])
        })
      }
      PostData();
  },[searchData])
  
    return (
        <Box>
            <Masonry  sx={{margin:"2px 2px 6rem 2px"}}
                columns={{ xs: 1, sm: 2, md: 3 }}
                spacing={2}
                defaultHeight={450}
                defaultColumns={4}
                defaultSpacing={1}
                >
                {userDatas !== [] ? (
                    userDatas.map((data,index) => (data._id !== currentUser._id ? (<UserCard userDatas={data} key={index} currentUser={currentUser}/>):("")))
                    ) : (!!searchData ? (<Div>{`${searchData} is not exist.`}</Div>) : (<Div>{"Please input the Username in search area."}</Div>))
                }
            </Masonry>
        </Box>
    )
}
