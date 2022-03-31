import Header from '../frontend/Header';
import Posts from '../frontend/Posts';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function FrontPage() {
    return (
      <>
        <Header />
        <Container maxWidth="xs">
            <Posts />
        </Container>
      </>
    );
  }
