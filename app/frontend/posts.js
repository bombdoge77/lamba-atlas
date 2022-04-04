import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Image from 'next/image'
import { Box } from '@mui/system';
import { Container } from '@mui/material';



export default function RecipeReviewCard() {
  return (
    <Container maxWidth="xs">
      <Card >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          disableTypography={true}
          title={
            <Typography variant='caption'>
              /leg/shin/chickenleg
            </Typography>
          }
          subheader={
            <Typography variant='h6'>
              Bullet wound
            </Typography>
          }
        />
        <Box
          sx={{
            width:150,
            height:150,
            position: 'relative',
          }}
        >
          <Image src="/sonic.jpeg" alt="me" layout='fill'/>
        </Box>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Container>
  );
}

//<Image src="/sonic.jpeg" alt="me" layout='fill'/>