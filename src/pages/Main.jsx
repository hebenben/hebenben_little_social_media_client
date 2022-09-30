import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box} from "@mui/system";
import { Navbar } from "../components/Navbar";
import { BottomNavi } from "../components/BottomNavi";
import {OpenIconSpeedDial} from "../components/SpeedDial";
import AddPost from "../components/AddPost";
import { getCookie } from "../utils/tools";
import { GetUser } from "../utils/APIRoutes";
import axios from "axios";
import Search from "../components/Search";
import PostBody from "../components/PostBody";
import Chat from "../components/Chat";

export default function Main() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({userId:'',username:''});
    const [isAddPost,setIsAddPost] = useState(false);
    const [isChatOpen,setIsChatOpen] = useState(false);
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        async function asyncFunc(){
            if (!getCookie(process.env.REACT_APP_LOCALHOST_KEY)) {
              navigate("/login");
            } else {
              const userData = getCookie(process.env.REACT_APP_LOCALHOST_KEY);
              const JsonUser = JSON.parse(userData);
              const { data } = await axios.get(`${GetUser}${JsonUser._id}`);
              if (data.status === false) {
                navigate("/login");
              }
              if (data.status === true) {
                if(!JsonUser.isAvatarImageSet){
                  navigate("/setAvatar");
                }
                setCurrentUser({
                  ...data.user,
                });
                
              }
            }
        }
        asyncFunc()
    }, []);

    const changePost = useCallback(()=>setIsAddPost((e) => !e),[])
    const changeChatDis = useCallback(()=>setIsChatOpen((e) => !e),[])
    const refreshFunc = useCallback(()=>window.location.reload(),[])

  return (
    <Box>
      <Navbar currentUser={currentUser} searchData={searchData} setSearchData={setSearchData} />
      {
        searchData !== "" ? 
        (<Search currentUser={currentUser} searchData={searchData} />) :
        (<PostBody currentUser={currentUser} searchData={searchData} />)
      }
      {/* <Search searchData={searchData} /> */}
      <BottomNavi changePost={changePost}  />
      <OpenIconSpeedDial changePost={changePost} changeChatDis={changeChatDis} />
      <AddPost isAddPost={isAddPost} currentUser={currentUser} changePost={changePost} refreshFunc={refreshFunc}/>
      <Chat isChatOpen={isChatOpen} currentUser={currentUser} ></Chat>
    </Box>
  )
}
