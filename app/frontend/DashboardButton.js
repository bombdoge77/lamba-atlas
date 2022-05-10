import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from 'next/link'
import { Paper } from "@mui/material";

export default function DashboardButton(props) {
	const link = props.link
	const text = props.text
	const IconProp = props.IconProp
	const { color, textSize, iconSize, paperspecs } = props.settings

	return (
		<Grid item xs={6}>
      <Link href={link}>
        <Paper 
          sx={{
            textAlign: 'center',
            bgcolor: color,
            height: paperspecs,
            borderRadius: 1.5,
            cursor : 'pointer'
            }} 
          >
              <IconProp  
                sx={{ 
                  fontSize: iconSize, 
                  position: 'relative', 
                  top: 30, 
                  color:'white'
                }} 
              />
              <Typography  
                sx={{ 
                fontSize: textSize, 
                position: 'relative',
                top: 30,
                color:'white'
              }}
              >
              	{text}
            	</Typography>
        </Paper>
      </Link>
    </Grid>
		)
}