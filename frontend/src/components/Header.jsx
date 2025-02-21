import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo1 from '../assets/logo1.png';
import title from '../assets/title.png';
import { resetCart } from '../slices/cartSlice';
import { LinkContainer } from 'react-router-bootstrap';
import '../assets/styles/index.css';

const Header = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <header>
      <Navbar style={{ backgroundColor: '#617A48' }}  variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className="crochet-font">
            <img src={logo1} alt='ProShop' style={{ width: '50px', height: '45px', marginRight: '10px' }}/>
             Crochet Art
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
            <SearchBox />
            <LinkContainer to='/cart'>
              <Nav.Link ><FaShoppingCart /> Cart
              {
                cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )
              }
              </Nav.Link>
            </LinkContainer>
            { userInfo ? (
              <>
              <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item as={Link} to='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
            ) : (
              <LinkContainer to='/login'>
              <Nav.Link>
                <FaUser /> Sign In
              </Nav.Link>
            </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <NavDropdown.Item as={Link} to='/admin/productlist'>
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/orderlist'>
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/userlist'>
                  Users
                </NavDropdown.Item>
              </NavDropdown>
            )}
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header