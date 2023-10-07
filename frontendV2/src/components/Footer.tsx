import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="py-3 text-center">
            <p>HouseFinder &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
