import * as React from 'react';
import Box from '@mui/joy/Box';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Person from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

export default function BottomNavigation() {
  const [index, setIndex] = React.useState(0);
  const colors = ['primary', 'danger', 'success', 'warning'] as const;
  return (
    <div className='w-full flex justify-center h-[74px]'>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          bottom: 3,
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          minWidth: 350, maxWidth: 350,
        }}
      >
        <Tabs
          size="lg"
          aria-label="Bottom Navigation"
          className='bottomNavigation'
          value={index}
          onChange={(_, value) => setIndex(value as number)}
          sx={(theme) => ({
            p: 1,
            borderRadius: 16,
            maxWidth: 350,
            mx: 'auto',
            boxShadow: theme.shadow.sm,
            '--joy-shadowChannel': theme.vars.palette[colors[index]].darkChannel,
            [`& .${tabClasses.root}`]: {
              py: 1,
              flex: 1,
              transition: '0.3s',
              fontWeight: 'md',
              fontSize: 'md',
              [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                opacity: 0.7,
              },
            },
          })}
        >
          <TabList
            variant="plain"
            size="sm"
            disableUnderline
            sx={{ borderRadius: 'lg', p: 0,display:"flex",justifyContent:"space-between" }}
          >
            <Link to={'/home'}>
              <Tab
                disableIndicator
                orientation="vertical"
                sx={{width:"100px"}}
              >
                <ListItemDecorator>
                  <ArrowBackIcon sx={{ fontSize: 40 }} />
                </ListItemDecorator>
              </Tab>
            </Link>
            <Link to={'/home'}>
              <Tab
                disableIndicator
                orientation="vertical"
                sx={{width:"100px"}}
              >
                <ListItemDecorator>
                  <HomeRoundedIcon sx={{ fontSize: 40 }} />
                </ListItemDecorator>
              </Tab>
            </Link>
            <Link to={'/profile'}>
              <Tab
                disableIndicator
                orientation="vertical"
                sx={{width:"100px"}}
              >
                <ListItemDecorator >
                  <Person sx={{ fontSize: 40 }} />
                </ListItemDecorator>
              </Tab>
            </Link>
          </TabList>
        </Tabs>
      </Box>
    </div>
  );
}
