import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Box, styled} from '@mui/material';
import Contacts from "./Contact";
import ChatContainer from "./ChatContainer";
import { getChatUserList, host } from "../utils/APIRoutes";
import ChatEmpty from "./ChatEmpty";

const ChatBox = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "30% 70%",
    backgroundColor:"#DCDCDC",
    position: 'fixed', 
    width:550,
    height:600,
    bottom: 16, 
    right: 100,
    // overflow:"hidden",
    borderRadius: 10,
}));

export default function Chat({ currentUser, isChatOpen }) {
    const socket = useRef();
    const[ contactsList, setContactsList ] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
          socket.current = io(host);
          socket.current.emit("add-user", currentUser._id);
        }
      }, [currentUser]);

    useEffect(() => {
        async function getUser(){
            const { data } = await axios.post(getChatUserList,{
                id:currentUser._id,
                userList: currentUser.followings ? currentUser.followings.concat(currentUser.followers) : currentUser.followers
            })
            if(data.status === true){
                setContactsList(
                    data.data
                )
            }
        }

        getUser();
    },[currentUser])


    const ChatChange = (chat) => {
        setCurrentChat(chat);
      };
    console.log(currentChat,contactsList)
    return(
        <>
        {
            isChatOpen === true ? (
                <ChatBox>
                <Contacts contactsList={contactsList}  ChatChange={ChatChange} ></Contacts>
                {
                    currentChat === undefined ? (
                        <ChatEmpty currentUser={currentUser} />
                    ) : (
                        <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} ></ChatContainer>
                    )
                }
            </ChatBox>
            ) : (
                <></>
            )
        }
        </>
    );
}