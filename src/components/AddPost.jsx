import * as React from 'react';
import { Avatar, Modal,Button,Paper, Typography, Box, TextField, Stack } from '@mui/material';
import { styled, } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState, useRef } from 'react';
import axios from "axios";
import moment from "moment";
import { CreatePost, Upload } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const UploadBox = styled("div")({
  position: 'relative',
  margin: "0 10% 5%",
  height: "400px",
  border:"1px solid grey",
  borderRadius: "4px"
});

const ImgBox = styled("img")({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: "100%",
});

const AddPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    maxheight: "90%"
  },
  [theme.breakpoints.up("sm")]: {
     width: "70%",
     maxheight: "90%"
  },
}));


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
};

export default function AddPost(props) {
  const navigate = useNavigate();
  const desc = useRef();
  const {isAddPost,currentUser,changePost} = props;
  const [file, setFile] = useState(null);
  // const [value, setValue] = React.useState('');

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    paiseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value,
    }
    if(desc.current.value.length > 500){
      toast.error("The maximum description should less than 500 ", toastOptions);
      return;
    }
    if(!file){
      toast.error("Please upload one photo", toastOptions);
      return;
    }
    const fileData = new FormData();
    const fileName = moment().unix() + file.name;
    fileData.append("name", fileName);
    fileData.append("file",file);
    newPost.img = fileName;

    try{
      const { data } = await axios.post(CreatePost, newPost);
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        try{
          await axios.post(Upload, fileData);
          changePost();
          navigate("/");
        } catch(err){
    
        }
      }
    }catch(err){
      toast.error("Add post error", toastOptions);
    }
  };

  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={isAddPost}
        onClose={changePost}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <AddPaper sx={{ ...style, width: 200 }} elevation={16}>
          <CloseIcon onClick={() => changePost()} sx={{ position: 'absolute', right: 10, top: 10 }}/>
          <Typography variant="h5" textAlign="center"  id="child-modal-title">Create Post</Typography>
            <UserBox>
              <Avatar sx={{ width: 30, height: 30 }} src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} />
              <Typography fontWeight={500} variant="span" >{currentUser.userName}</Typography>
            </UserBox>

            <TextField
            sx={{width: "100%", marginBottom:"10%"}}
            id="outlined-multiline-flexible"
            multiline
            maxRows={4}
            placeholder="your mind at this moment..."
            inputRef={desc}
          />
          {file && (
          <UploadBox>
            <ImgBox className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon onClick={() => setFile(null)} sx={{ position: 'absolute', right: "20%", top: 10 }}/>
          </UploadBox>
        )}
          <Stack direction="row" spacing={1} justifyContent="flex-end"  >
            <Button color="success" variant="contained" component="label" endIcon={<PhotoCamera />}>
              Upload Picture
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Button>
            <Button onClick={submitHandler} variant="contained" endIcon={<SendIcon />}>Post</Button>
            <Button onClick={changePost} variant="outlined" endIcon={<CloseIcon />}>Close</Button>
          </Stack>
        </AddPaper>
      </Modal>
      <ToastContainer />
    </React.Fragment>
  );
}