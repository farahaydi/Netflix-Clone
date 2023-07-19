import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./NavBar.css";
function NavBar ()
{
    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="/"><h1 className='title'>NETFLIX</h1></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/" className='para'><p>Trending Movie</p></Nav.Link>
                <Nav.Link href="/FavList" className='para'><p>Favorite</p></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          </>
    )
}
export default NavBar;