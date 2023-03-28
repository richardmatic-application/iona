import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NavBar = (): JSX.Element => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Navbar sticky="top" expand="lg" bg="light">
      <Container>
        <Navbar.Brand href="/">Cat Browser</Navbar.Brand>
        <Button onClick={handleBack}>Back</Button>
      </Container>
    </Navbar>
  );
}