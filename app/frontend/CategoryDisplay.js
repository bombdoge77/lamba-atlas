import {
	Typography, 
	Box
} from '@mui/material';

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

	return (
		<Typography sx={sx} color={primary ? "text.primary" : "text.secondary"} gutterBottom>
		  {category.bodyCategory} {arrow} {primary ? <br/> : null} {category.bodyPart}
		</Typography>
		)
}