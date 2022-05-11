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
import { useState, useEffect } from 'react'
import CategoryDisplay from './CategoryDisplay.js'
import { getProfileRequest } from './helper/fetchcalls.js'
import { getUser } from './helper/auth.js'

export default function Comment(props) {
	const [dispName, setDispName] = useState('User')
	const [spin, setSpin] = useState(false)

	useEffect(async () => {
			const res = await getProfileRequest(props.user)
			if (res) {
				setDispName(res.payload.user_profile.name)
			} else {
				setSpin(!spin)
			}
	}, [spin])

	return(
		<Container 
		sx={{
			my : 2,
			mx : 0,
			width : 1
		}}
		>
			<Card elevation={7} sx={{ width : 1 }}>
		    <CardContent>
		    	<Typography sx={{mt : 1, mb : 2}} color='text.secondary'>
		    		{dispName}
		    	</Typography>
		      <Typography sx={{mt : 0, mb : 2}}>
		        {props.text}
		      </Typography>
		    </CardContent>
			</Card>
		</Container>
		)
}