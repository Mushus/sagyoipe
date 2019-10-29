import React, { ReactNode, useCallback } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { useMedia } from 'react-use';
import { UserData } from '~/interfaces';
import Mic from './Mic';
import { useBroadcastContext } from '~/reducer/Broadcast';

export const DrawerWidth = 240;

interface CustomDrawerProps {
  users: readonly UserData[];
}

interface CustomDrawerWrapper {
  children: ReactNode;
}

const CustomDrawer = ({ users }: CustomDrawerProps) => {
  return (
    <DrawerWrapper>
      <List>
        {users.map(({ id, name, isMe, remoteMicStream }) => (
          <ListItem key={id}>
            {name} {isMe && '*'} <Mic src={remoteMicStream} />
          </ListItem>
        ))}
      </List>
    </DrawerWrapper>
  );
};

const DrawerWrapper = ({ children }: CustomDrawerWrapper) => {
  const isMobile = useDrawerMedia();
  const [{ isOpenDrawer }, dispatch] = useBroadcastContext();

  const closeDrawer = useCallback(() => {
    dispatch({ type: 'closeDrawer' });
  }, []);

  return isMobile ? (
    <Drawer variant="temporary" anchor="left" open={isOpenDrawer} onClose={closeDrawer}>
      <Box width={DrawerWidth}>
        <div>
          <IconButton onClick={closeDrawer}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider />
        {children}
      </Box>
    </Drawer>
  ) : (
    <Drawer variant="persistent" anchor="right" open>
      <Box width={DrawerWidth}>{children}</Box>
    </Drawer>
  );
};

export const useDrawerMedia = () => useMedia('(max-width: 640px)');

export default CustomDrawer;
