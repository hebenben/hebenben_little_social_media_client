import * as React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from '@mui/icons-material/Message';


export const BottomNavi = ({changePost}) => {
  const [value, setValue] = React.useState(0);
  const dialFunc = () => {
        changePost()
  }
  return (
    <Box  sx={{ display: { xs: "block", sm: "none" },position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Add" onClick={() => dialFunc()} icon={<AddIcon />} />
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Chat" icon={<MessageIcon />} />
      </BottomNavigation>
    </Box>
  );
}