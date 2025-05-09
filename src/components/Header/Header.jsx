import styles from './Header.module.scss';
import { logoutUser } from '../../store/ArticleActions';
import { Button, Avatar } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.articlesData);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  return (
    <header className={styles.header}>
      <Link style={{ textDecoration: 'none', color: 'black' }} to="/">
        <h4 style={{ fontSize: 18 }}>Realworld Blog</h4>
      </Link>

      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/sign-in">
              <Button type="text">Sign In</Button>
            </Link>
            <Link to="/sign-up">
              <Button style={{ borderColor: '#52C41A', color: '#52C41A' }}>Sign Up</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/new-article">
              <Button style={{ color: 'green', borderColor: 'green' }} type="text">
                Create Article
              </Button>
            </Link>
            <Link
              to="/profile"
              style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', color: 'black' }}
            >
              <span style={{ margin: '0 10px' }}>{user.username}</span>
              <Avatar
                src={user.image || 'https://www.w3schools.com/w3images/avatar2.png'}
                alt="avatar"
                style={{ marginRight: '10px' }}
              />
            </Link>
            <Button style={{ borderColor: '#000000BF', color: '#000000BF' }} type="text" onClick={handleLogout}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
