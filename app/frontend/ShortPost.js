import { 
	Container, 
	Card, 
	CardHeader, 
	CardMedia, 
	CardContent, 
	CardActions, 
	Typography, 
	Box,
	Button,
	IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react'
import { useRouter } from 'next/router'
import CategoryDisplay from './CategoryDisplay.js'

export default function ShortPost(props) {
	const router = useRouter()
	const data = props.data
	const [liked, setLiked] = useState(props.liked)

	return(
		<Container 
		sx={{
			my : 5,
			mx : 0,
			width : 1
		}}
		>
			<Card sx={{ width : 1 }}>
		    <CardContent>
		      <CategoryDisplay sx={{fontSize : 14, my: 1}} primary={false} category={data.category}/>
		      <Typography variant="h5" component="div" sx={{mt : 1, mb : 2}}>
		        {data.title}
		      </Typography>
		      {data.med_history.substring(0, 100) + '...'}
		    </CardContent>
		    <CardActions sx={{
		    	width : 1
		    }}>
		    	<IconButton 
		    	size="small" 
		    	color={liked ? 'error' : 'default'}
		    	onClick={() => setLiked(!liked)}
		    	>
		    		<FavoriteIcon size='md'/>
		    	</IconButton>
		      <Button 
		      size="small"
		      onClick={() => router.push('post'+'/'+data._id)}
		      >
		      	Read More
		      </Button>
		    </CardActions>
			</Card>
		</Container>
		)
}