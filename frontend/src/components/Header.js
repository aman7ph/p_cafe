import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap"
import { FaShoppingCart } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { useNavigate, useLocation } from "react-router-dom"
import { useLogoutMutation } from "../redux/slices/userApiSlice"
import SearchBox from "./SearchBox"
import SearchOrder from "./SearchOrder"
import { GiMeal } from "react-icons/gi"

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.auth.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [logoutFromserver] = useLogoutMutation()

  const logoutHandler = async () => {
    await logoutFromserver().unwrap()
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header>
      <Navbar
        bg="white"
        variant="light"
        expand="md"
        collapseOnSelect
        className="shadow p-3 mb-5 bg-body rounded"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="text-success">
              <h1>
                Pro-Cafe <GiMeal className="text-success" />
              </h1>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!user && location.pathname !== "/cart" ? (
                <SearchBox />
              ) : !user && location.pathname === "/cart" ? (
                <SearchOrder />
              ) : (
                <SearchOrder />
              )}
              {!user && (
                <LinkContainer to="/">
                  <Nav.Link>
                    <h6>Home</h6>
                  </Nav.Link>
                </LinkContainer>
              )}
              {!user && (
                <LinkContainer to="/menu">
                  <Nav.Link>
                    <h6>Menu</h6>
                  </Nav.Link>
                </LinkContainer>
              )}
              {!user && (
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <h6>
                      <FaShoppingCart /> Cart
                      {cartItems.length > 0 && (
                        <Badge pill bg="success">
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </Badge>
                      )}
                    </h6>
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && (
                <NavDropdown as="h6" title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>userlist</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!user && (
                <LinkContainer to="/about">
                  <Nav.Link>
                    <h6>About</h6>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
