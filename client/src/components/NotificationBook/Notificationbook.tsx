/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
// import { io, Socket } from 'socket.io-client';
import ReactiveButton from 'reactive-button';
import { SvgIcon, Button } from '@material-ui/core';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {
  NotificationsItemOption, NotificationsItemMessage, NotificationsItemTitle,
  NotificationsItemContent, NotificationsItem, Wrapper, Counter, NotificationsItemAvatar,
} from './style';

interface BookIconProps {
  notifications: any;
  notificationCount: number;
  markAsRead: any;
  buttonState:any,

}

const BookIcon: React.FC<BookIconProps> = ({
  notifications, notificationCount, markAsRead, buttonState,
}) => {
  // const [socket, setSocket] = useState<any>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const svgStyle = {
    display: 'block',
    margin: 'auto',
    marginLeft: '18px',
    // add any other styles you need here
  };

  console.log(notifications, 31);
  return (
    <div className="BookIcon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <SvgIcon
        xmlns="http://www.w3.org/2000/svg"
        style={svgStyle}
        onClick={() => setOpen(true)}
        width="70"
        height="70"
        viewBox="0 0 50 50"
      >
        { notificationCount === 0 ? null : (<Counter>{notificationCount}</Counter>)}
        <path fill="none" stroke="#000" strokeLinejoin="round" strokeWidth="2" d="M3,9v33c13,0,22,4,22,4s9-4,22-4V9" />
        <path fill="none" stroke="#000" strokeMiterlimit="10" strokeWidth="2" d="M25,42V9" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M25,9c0,0-8-4-18-4v33c10,0,18,4,18,4" />
        <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M25,42c0,0,8-4,18-4V5C33,5,25,9,25,9" />
      </SvgIcon>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: '75%',
            height: '75%',
            maxWidth: 'auto',
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
            maxHeight: '80vh',
            overflow: 'auto',
          }}
        >
          <ModalClose
            variant="outlined"
            sx={{
              top: 'calc(-1/4 * var(--IconButton-size))',
              right: 'calc(-1/4 * var(--IconButton-size))',
              boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
              borderRadius: '50%',
              bgcolor: 'background.body',
            }}
            onClick={() => setOpen(false)}
          />
          <Typography id="modal-modal-title" component="h2">
            <ReactiveButton
              rounded
              size="medium"
              buttonState={buttonState}
              idleText="Mark As Read"
              loadingText="Loading"
              successText="Done"
              onClick={markAsRead}
              color="blue"
              style={{ margin: '10px' }}
            />
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            { notifications.map((notification: any) => (
              <Wrapper>
                <NotificationsItem>
                  <NotificationsItemAvatar>{notification.User.picture}</NotificationsItemAvatar>
                  <NotificationsItemContent>
                    <div>
                      <NotificationsItemTitle>{notification.type}</NotificationsItemTitle>
                      <NotificationsItemMessage>{notification.body}</NotificationsItemMessage>
                    </div>
                  </NotificationsItemContent>
                </NotificationsItem>
              </Wrapper>
            ))}
          </Typography>
        </Sheet>
      </Modal>
    </div>
  );
};

export default BookIcon;
