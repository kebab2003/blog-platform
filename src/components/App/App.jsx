import styles from './App.module.scss';
import Header from '../Header';
import ArticleList from '../ArticleList';
import ArticlePage from '../ArticlePage';
import SignUp from '../SignUp';
import EditProfile from '../EditProfile';
import EditArticle from '../EditArticle';
import { loadUser } from '../../store/ArticleActions';
import SignIn from '../SignIn';
import NewArticle from '../NewArticle';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Header />
        <div className={styles.main_page}>
          <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route exact path="/articles" component={ArticleList} />
            <Route exact path="/articles/:slug" component={ArticlePage} />
            <Route path="/articles/:slug/edit" component={EditArticle} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={EditProfile} />
            <Route path="/new-article" component={NewArticle} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
