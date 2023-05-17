/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import UserStarRating from '../UserStarRating/UserStarRating';
import UserReview from '../UserStarRating/UserReview';
import Reviews from './Reviews';
import LendingLibraryButtonBigBook from '../Button/LendingLibraryButtonBigBook';
import WishListButtonBigBook from '../Button/WishListButtonBigBook';

const useStyles = makeStyles({
  card: {
    backgroundImage: 'url("https://i.imgur.com/Mjey231.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    /* Additional CSS properties */
  },
});

function BigBook(props: any) {
  const classes = useStyles();
  const [reviewOpen, setReviewOpen] = useState(false);
  const {
    book, id, onClose, userRating,
  } = props;
  const UserBooks = book?.UserBooks;
  const handleOnClick = () => {
    onClose();
  };
  const truncatedTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
      return `${title.substring(0, maxLength)}...`;
    }
    return title;
  };
  const handleClickOpen = () => {
    setReviewOpen(true);
  };

  const handleClose = () => {
    setReviewOpen(false);
  };

  return (
    <Card
      key={book.id}
      variant="outlined"
      className={classes.card}
      sx={{
        margin: '2px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '75vw',
        height: '85vh',
        maxWidth: '665px',
        maxHeight: '850px',
        overflow: 'auto',
        // backgroundImage: 'url("https://imgbox.com/Frdz4hjN")',
        '@media (max-width: 768px)': {
          width: '80vw',
          height: '80vh',
        },
      }}
    >
      <CardOverflow
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: ['100px', '25vw'],
          height: ['150px', '25vw'],
          maxWidth: '300px',
          maxHeight: '400px',
          minWidth: '50px',
          minHeight: '75px',
        }}
      >
        {book.image ? (
          <img
            src={book.image}
            loading="lazy"
            alt=""
            style={{
              objectFit: 'contain',
              position: 'absolute',
              top: 0,
              left: 0,
              paddingTop: '15px',
              width: '100%',
              height: '100%',
              imageRendering: 'crisp-edges',
            }}
            onClick={handleOnClick}
          />
        ) : (
          <img
            src="https://i.imgur.com/XrUd1L2.jpg"
            loading="lazy"
            alt=""
            style={{
              objectFit: 'contain',
              position: 'absolute',
              top: 0,
              left: 0,
              paddingTop: '15px',
              width: '100%',
              height: '100%',
              imageRendering: 'crisp-edges',
            }}
            onClick={handleOnClick}
          />
        )}
      </CardOverflow>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'center',
          pl: 1,
        }}
      >
        <Tooltip title={book.title} placement="top">
          <Typography
            level="h4"
            onClick={handleOnClick}
            style={{
              cursor: 'pointer', textDecoration: 'underline', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
          >
            {truncatedTitle(book.title, 25)}
          </Typography>
        </Tooltip>

        <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
          {book.author}
        </Typography>

        <UserStarRating book={book} id={id} value={userRating} />
        <Button variant="outlined" onClick={handleClickOpen} sx={{ mt: 1 }}>
          Add Written Review
        </Button>
        <UserReview book={book} id={id} open={reviewOpen} handleClose={handleClose} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly', // Add some space between the buttons
            mt: 1, // Use marginTop to separate the buttons from the above element
          }}
        >
          <LendingLibraryButtonBigBook padding="15px" book={book} />
          <WishListButtonBigBook padding="15px" book={book} />
        </Box>
      </Box>
      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>

        <Typography level="body1">
          {book.description}
        </Typography>
        <Divider inset="context" />
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            py: 1.5,
            px: 'var(--Card-padding)',
            bgcolor: 'background.level1',
          }}
        >
          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
            {UserBooks && (
            <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary', fontSize: 'md' }}>
              <Reviews UserBooks={UserBooks} />
            </Typography>
            )}
          </Typography>

          <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }} />

        </Box>
      </Box>
    </Card>

  );
}

export default BigBook;
