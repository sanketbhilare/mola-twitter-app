import './App.css';
import Twitter from './Twitter'
import { Navbar, Container } from 'react-bootstrap';


function App() {
  return (
    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >
            Twitter API Tutorial
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Twitter/>
    </div>
  );
}

export default App;
