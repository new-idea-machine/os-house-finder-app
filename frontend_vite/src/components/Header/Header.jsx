import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import logo from '@assets/images/HouseLogoGrey.svg';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    console.log('logout');
  };
  return (
    <header>
      <Navbar bg="light" data-bs-theme="light" expand="md" collapseOnSelect>
        <Container fluid>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="align-items-center pt-5 px-5">
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    width={80}
                    className="me-3"
                    src={logo}
                    alt="HouseFinder"
                  />
                  HouseFinder
                </Navbar.Brand>
              </LinkContainer>
            </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="d-flex align-items-center ms-auto">
                {/* <LinkContainer
                  to="/demo"
                  className="nav-link fw-bold fs-6 btn btn-secondary"
                >
                  <Nav.Link>Scoring Demo</Nav.Link>
                </LinkContainer> */}

                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item me-3 nav-link fw-bold fs-6 btn btn-secondary">
                    <LinkContainer to="/demo">
                      <Nav.Link>Scoring Demo</Nav.Link>
                    </LinkContainer>
                  </li>
                  <li className="nav-item me-3 nav-link fw-bold fs-6 btn btn-outline-secondary">
                    <LinkContainer to="/faq">
                      <Nav.Link>FAQ</Nav.Link>
                    </LinkContainer>
                  </li>
                </ul>

                <div className="me-auto">
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="username">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer to="/login">
                      <Nav.Link>
                        <FaUser /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
