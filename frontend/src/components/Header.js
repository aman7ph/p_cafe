import { Navbar, Container, Nav, Badge, NavDropdown } from "react-bootstrap"
import { FaUser, FaShoppingCart } from "react-icons/fa"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../redux/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../redux/slices/userApiSlice"
import SearchBox from "./SearchBox"
import { GiMeal } from "react-icons/gi"

const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.auth.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutFromserver] = useLogoutMutation()

  const logoutHandler = async () => {
    await logoutFromserver().unwrap()
    dispatch(logout())
    navigate("/login")
  }

  return (
    <header>
      <Navbar bg="white" variant="light" expand="md" collapseOnSelect>
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
              <SearchBox />
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/menu">
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.name} id="username">
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
                    <FaUser /> sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {user && user.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
