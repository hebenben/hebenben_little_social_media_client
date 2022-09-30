import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Box, styled, TextField} from '@mui/material';
import { getChatMsg, sendMsgRoute } from "../utils/APIRoutes";
import { getCookie } from "../utils/tools";
import ChatInput from "./ChatInput";

const ChatContainerBox = styled(Box)(({ theme }) => ({
    background:"white",
    display: "grid",
    gridTemplateRows: "80% 20%",
    padding:"8px 12px",
    position: "relative",
    // height:"100%",
}));

const ContainerDiv = styled("div")(({ theme }) => ({
    overflow: "auto",
    height: 420,
    paddingRight: 4,
    paddingTop: 10,
    "&::-webkit-scrollbar": {
        width: "0.6rem",
        "&-thumb": {
          backgroundColor: "grey",
          width: "0.5rem",
          borderRadius: "0.5rem",
        }
      }
}));

const SendedMsg = styled("div")(({ theme }) => ({
    width: "100%",
    gap:8,
    display:"flex",
    flexDirection: "row-reverse",
    marginBottom: 20,
}));

const ReceivedMSG = styled("div")(({ theme }) => ({
    width: "100%",
    gap:8,
    display:"flex",
    flexDirection: "row",
    marginBottom: 20,
}));

export default function ChatContainer({ currentUser, currentChat, socket}) {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [reciveMessage, setReciveMessage] = useState(null);


    useEffect(() => {
        async function getAllMsg(){
              await axios.post(getChatMsg, {
                from: currentUser._id,
                to: currentChat._id,
              })
              .then(res => {
                if(res.data.status === true){
                    setMessages(res.data.data);
                    console.log(messages,"1")
                  }
              })
              console.log(messages,"2")
        }
        getAllMsg();
      }, [currentChat]);

    //   useEffect(() => {
    //     const getCurrentChat = async () => {
    //       if (currentChat) {
    //         await JSON.parse(
    //             getCookie(process.env.REACT_APP_LOCALHOST_KEY)
    //         )._id;
    //       }
    //     };
    //     getCurrentChat();
    //   }, [currentChat]);

      const sendMsgHandler = async function(msg){
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                msg,
            });
            await axios.post(sendMsgRoute, {
                to: currentChat._id,
                from: currentUser._id,
                message: msg,
            })

            const oldMsg = [...messages];
            oldMsg.push({isFromSelf: true, message: msg});
            setMessages(oldMsg);
      }

      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setReciveMessage({ isFromSelf: false, message: msg });
          });
        }
        console.log(reciveMessage);
      }, []);

      useEffect(() => {
        reciveMessage && setMessages((prev) => [...prev, reciveMessage])
      },[reciveMessage])

      useEffect(() => {
        scrollRef.current?.scrollIntoView(false);
      },[messages])

      console.log(messages)
    return(
        <ChatContainerBox>
            <ContainerDiv>
                {messages.map((message) => {
                    return(
                    message.isFromSelf === true ? 
                    (
                        <SendedMsg key={uuidv4()} ref={scrollRef}>
                        <Avatar src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}></Avatar>
                        <TextField
                            id="sended-text"
                            defaultValue={message.message}
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </SendedMsg>
                    ) :
                    (
                        <ReceivedMSG key={uuidv4()} ref={scrollRef}>
                        <Avatar src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}></Avatar>
                        <TextField
                            id="recevice-text"
                            label={currentChat.username}
                            defaultValue={message.message}
                            multiline
                            InputProps={{
                                readOnly: true,
                            }}
                            />
                        </ReceivedMSG>
                    ))    
                })}
            </ContainerDiv>
            <ChatInput  sendMsgHandler={sendMsgHandler} />
        </ChatContainerBox>
    );
}