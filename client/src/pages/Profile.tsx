import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext, } from 'react';
import axios from 'axios';
import { Typography, Grid, TextField, Button, Box } from '@material-ui/core';
import BookDisplay from '../components/BookDisplay/BookDisplay';
import UserContext from '../hooks/Context'
// import ChatContext from '../hooks/ChatContext';
import UserBooks from '../../../server/routes/userbooks';
import Chat from '../components/Chat/Chat'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import io from 'socket.io-client';
import Modal from '@mui/material/Modal'
import { style } from '@mui/system';
import NearBy from '../components/NearBy/NearBy';
import styled from 'styled-components';
import { Paper } from '@mui/material';
interface UserBook {
  wishlist: any;
  owned: any;
  Books: Book;
}
interface Book {
  books: {
    id: string;
    title: string;
    author: string;
    image: string;
  }
  id: string;
  wishlist: boolean;
  owned: boolean;
}

interface UserProfile {
  id: string;
  firstName: string;
  picture: string;
}
const ChatOverlay = styled(Paper)`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 800px;
  height: 600px;
  overflow-y: auto;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`;


const Profile = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [inventory, setInventory] = useState<string>('Owned');
  const [title, setTitle] = useState<string>('');
  const [showChat, setShowChat] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  // const chatContext = useContext(ChatContext);

  const userContext = useContext(UserContext);
  const user = userContext?.user;
  const id = user.id
  const friendId: string = useParams().id || "";
  const newSocket = io('http://localhost:3000');
  const getProfile = async () => {
    try {
      const response = await axios.get(`/user/id?id=${friendId}`);
      console.log(response.data)
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  const getUserBooks = (query: string) => {
    const booksArray: Book[] = [];
    if (query == "Owned") {
      user?.UserBooks?.forEach((book: UserBook) => {
        if (book.owned) booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
    if (query == "Wishlist") {
      user?.UserBooks?.forEach((book: UserBook) => {
        if (book.wishlist) booksArray.push(book.Books);
      });
      setBooks(booksArray);
    }
  };



  // if (!chatContext) {
  //   return <div>Loading chat...</div>;
  // }

  // const { messages } = chatContext;

  const handleChatButtonClick = () => {
    setShowChat(!showChat);
  };

  const follow = async () => {
    const userId = user.id;
    const userFirstName = user.firstName;
    //console.log(user, 82)
    try {
      newSocket.emit('new-follow', {
        message: `${userFirstName} has followed you`
      })
      await axios.post('/api/friendship', { userId, friendId });
    } catch (error) {
      console.error(error)
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ownedClicked = () => {
    getUserBooks('Owned');
    setInventory('Owned');
  }

  const wishClicked = () => {
    getUserBooks('Wishlist')
    setInventory('Wishlist');
  }



  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(`/books/${id}`, { title, inventory })
      .then(response => {
        setTitle("");
        //getUserBooks(inventory);
      })
      .catch(error => {
        console.error(error);
      });
  };



  useEffect(() => {
    if (user && user.UserBooks) {
      getUserBooks("Owned");
      getProfile();
    }
  }, []);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (

    <div >

      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <Grid container>
          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}> {/* Add this container div */}
              <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleChatButtonClick}>
                Chat
              </Button>
              {showChat && (
                <ChatOverlay>
                  <Chat />
                </ChatOverlay>
              )}
            </div> {/* Close the container div */}
            <Typography variant="h4">{friendId === "" ? `${user.firstName}'s` : `${profile?.firstName}'s`} Books</Typography>
            {friendId === "" ? null : (
              <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={follow}>Follow</Button>)}
          </Grid>
        </Grid>

      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', background: 'rgb(32, 32, 35)' }}>
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '800px', width: '100%' }}>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={ownedClicked}>Owned</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={wishClicked}>WishList</Button>
            <Button variant="contained" color="primary" style={{ margin: '10px' }} onClick={handleOpen}>Near Me</Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
              <Box sx={style}>
                <NearBy />
              </Box>
            </Modal>
          </div>
        </div>

        {friendId === "" ? (

          <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit} >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    label="Book Title"
                    value={title}
                    onChange={handleTitleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Add Book
                  </Button>
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
            </form>
          </div>

        ) : null}

        <div style={{ margin: '15px' }}>
          <Typography variant="h5">{inventory} Books</Typography>
        </div>
        <BookDisplay books={books} id={id} />
      </div>

    </div>
  );
}


export default Profile;
