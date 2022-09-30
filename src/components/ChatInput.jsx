import React, { useRef } from "react";
import { Box, Button, styled, TextField} from '@mui/material';

export default function ChatInput({ sendMsgHandler}) {
    const sendValue = useRef();

    const sendHandler = function(e){
        e.preventDefault();
        if(sendValue.current.value.length > 0){
            sendMsgHandler(sendValue.current.value);
            sendValue.current.value = '';
        }
    }


    return(
        <Box>
            <TextField
                id="outlined-multiline-static"
                // label="Send Message"
                multiline
                rows={2}
                sx={{width:"100%"}}
                inputRef={sendValue}
                />
            <Button variant="contained" color="success" sx={{ position:"absolute", bottom: 4, right: 10 }} onClick={(e)=> sendHandler(e)}>
                Send
            </Button>
        </Box>
    );
}