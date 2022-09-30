import * as React from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageIcon from '@mui/icons-material/Message';


export const OpenIconSpeedDial = ({changePost, changeChatDis}) => {


const actions = [
    { icon: <AddIcon />, name: 'Add' },
    { icon: <RestoreIcon />, name: 'Recent' },
    { icon: <FavoriteIcon />, name: 'Favorites' },
    { icon: <MessageIcon />, name: 'Chat' },
    ];
    
    const dialFunc = (e) => {
        if(e === "Add"){
            changePost();
        }
        else if(e === "Chat"){
          changeChatDis();
        }
    }
  return (
    <Box sx={{ display: { xs: "none", sm: "block"}, height: 320, transform: 'translateZ(0px)', flexGrow: 1, position: 'fixed', bottom: 16, right: 16 }}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"

        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => dialFunc(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>

  );
}
