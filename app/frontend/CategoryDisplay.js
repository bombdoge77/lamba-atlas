import {
	Typography, 
	Box
} from '@mui/material';
import { format } from './helper/categories.js'

const arrow = (
	  <Box
	    component="span"
	    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
	  >
	    &#8594;
	  </Box>
	);

export default function CategoryDisplay(props) {
	const { size, primary, category, sx } = props

	if (category.bodyCategory == 'all' && category.bodyPart == 'all') {
		return (
			<Typography sx={sx} color={primary ? "text.primary" : "text.secondary"} gutterBottom>
			  All Categories
			</Typography>
			)
	}
	return (
		<Typography sx={sx} color={primary ? "text.primary" : "text.secondary"} gutterBottom>
		  {format[category.bodyCategory]} {arrow} {primary ? <br/> : null} {format[category.bodyPart]}
		</Typography>
		)
}