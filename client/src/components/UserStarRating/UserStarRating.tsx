import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const UserStarRating = (props: any) => {
    const [value, setValue] = React.useState<number | null>(0);
    const { book, id } = props;
    console.log(id);
    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        // Make an API call to update the rating on the server
        axios.post('/review', { rating: newValue, book: book, id: id })
            .then(response => {
                console.log('Rating updated successfully');
            })
            .catch(error => {
                console.error('Failed to update rating:', error);
            });

        setValue(newValue);
    };

    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <Typography sx={{ fontSize: 'md' }} component="legend"></Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={handleRatingChange}
            />
        </Box>
    );
}

export default UserStarRating