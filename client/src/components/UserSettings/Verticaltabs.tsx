/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserInfo from '../SettingsTabs/UserInfo';
import FavBooksPlaces from '../SettingsTabs/FavBooksPlaces';
import FavGenres from '../SettingsTabs/FavGenres';
import FavHobbies from '../SettingsTabs/FavHobbies';

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const storedTab = localStorage.getItem('selectedTab');
    if (storedTab) {
      setValue(parseInt(storedTab, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedTab', value.toString());
  }, [value]);

  return (
    <Box
      sx={{
        flexGrow: 'auto',
        bgcolor: '##fff',
        display: 'flex',
        height: '100vh',
      }}
    >
      <Box sx={{
        borderRight: 1,
        width: 200,
        backgroundImage: 'url(https://m.media-amazon.com/images/I/71q3D33qowL._AC_SY879_.jpg)',
        backgroundSize: 'cover',
      }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            width: 200,
            bgcolor: '##fff',
          }}
        >
          <Tab label="Profile Settings" {...a11yProps(0)} />
          <Tab label="Favorite Genres" {...a11yProps(1)} />
          <Tab label="Favorite Hobbies" {...a11yProps(2)} />
          <Tab label="Preferred Books" {...a11yProps(3)} />
          <Tab label="Preferred Places" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0}>
          <UserInfo />
        </TabPanel>
      </Box>
      <Box>
        <TabPanel value={value} index={1}>
          <FavGenres />
        </TabPanel>
      </Box>
      <Box>
        <TabPanel value={value} index={2}>
          <FavHobbies />
        </TabPanel>
      </Box>
      <Box>
        <TabPanel value={value} index={3}>
          <FavBooksPlaces />
        </TabPanel>
      </Box>
      <TabPanel value={value} index={4}>
        {/* <SecuritySettings /> */}
      </TabPanel>
    </Box>
  );
}

export default VerticalTabs;
