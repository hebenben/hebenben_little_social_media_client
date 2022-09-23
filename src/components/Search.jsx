import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import PostBody from './PostBody';
import { UserCard } from './UserCard';
import { debounceFunc } from '../utils/tools';
import UserBody from './UserBody';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

export default function Search(props) {
  const { currentUser, searchData } = props;
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Posts" value="1" />
            <Tab label="User" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PostBody currentUser={currentUser} searchData={searchData} typeChoice="posts" />
        </TabPanel>
        <TabPanel value="2">
          <UserBody currentUser={currentUser} searchData={searchData} />
        </TabPanel>
      </TabContext>
    </Box>
  );
  // const { currentUser, searchData } = props;
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   debounceFunc(setValue(newValue), 1000);
  // };

  // return (
  //   <Box sx={{ width: '100%' }}>
  //     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
  //       <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
  //         <Tab label="Posts" {...a11yProps(0)} />
  //         <Tab label="Users" {...a11yProps(1)} />
  //       </Tabs>
  //     </Box>
  //     <TabPanel value={value} index={0}>
  //       <PostBody currentUser={currentUser} searchData={searchData} typeChoice="posts" />
  //     </TabPanel>
  //     <TabPanel value={value} index={1}>
  //       <UserBody currentUser={currentUser} searchData={searchData} />
  //     </TabPanel>
  //   </Box>
  // );
}