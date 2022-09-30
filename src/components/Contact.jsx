import React, { useEffect, useState} from "react";
import axios from "axios";
import { useLinkClickHandler, useNavigate } from "react-router-dom";
import { Box, styled} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { getChatUserList } from "../utils/APIRoutes";
import { getCookie } from "../utils/tools";

const ContactsList = styled(List)(() => ({
    // bgcolor: 'background.paper',
    bgcolor: '#DCDCDC',
    height:570,
    overflow:"auto", 
    "&::-webkit-scrollbar": {
        width: "0.6rem",
        "&-thumb": {
          backgroundColor: "grey",
          width: "0.5rem",
          borderRadius: "0.5rem",
        }
      }
}));

export default function Contacts({ contactsList,  ChatChange }) {
    const [currentSelected, setCurrentSelected] = useState(undefined);

    const ClickHandler = function(index,value){
        setCurrentSelected(index);
        ChatChange(value);
    }
    return(
        <ContactsList dense>
        {contactsList.map((value,index) => {
          return (
            <ListItem
              key={index}
              sx={{ padding:"0" }}
              onClick={() => ClickHandler(index,value)}
            >
              <ListItemButton sx={{ padding:"10px" }} divider={true} selected={index === currentSelected}>
                <ListItemAvatar>
                  <Avatar
                    alt={value.username}
                    src={`data:image/svg+xml;base64,${value.avatarImage}`}
                  />
                </ListItemAvatar>
                {/* <ListItemText id={labelId} sx={{overflow:"hidden",textOverflow:"ellipsis", whiteSpace:"nowrap", }} primary={`Line item ${value + 1}`} /> */}
                <ListItemText primary={value.username} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </ContactsList>
    );
}