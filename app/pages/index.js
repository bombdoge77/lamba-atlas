import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Head>
        <title>Lambå-Atlas</title>
      </Head>

      <Typography component="h1" variant="h5">
        hello world!
      </Typography>
    </Box>
  )
}

