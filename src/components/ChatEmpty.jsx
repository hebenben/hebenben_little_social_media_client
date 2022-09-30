import React from "react";
import { Box, styled} from '@mui/material';

const ChatContainerBox = styled(Box)(({ theme }) => ({
    background:"white",
}));


export default function ChatEmpty({ currentUser }) {

    return(
        <ChatContainerBox>
            Welcome Hebenben Chat, {currentUser.username}
        </ChatContainerBox>
    );
}