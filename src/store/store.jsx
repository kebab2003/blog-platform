import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  articles: [],
  article: null,
  articlesCount: 0,
  currentPage: 1,
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  loginError: null,
  isLoading: false,
};

function articlesReducer(state = initialState, action) {
  switch (action.type) {
    //  ARTICLES
    case 'LIKE_ARTICLE_SUCCESS':
    case 'UNLIKE_ARTICLE_SUCCESS':
      return {
        ...state,
        articles: state.articles.map((article) =>
          article.slug === action.payload.slug
            ? {
                ...article,
                favoritesCount: action.payload.favoritesCount,
                favorited: action.payload.favorited,
              }
            : article
        ),
        article:
          state.article?.slug === action.payload.slug
            ? {
                ...state.article,
                favoritesCount: action.payload.favoritesCount,
                favorited: action.payload.favorited,
              }
            : state.article,
      };

    case 'FETCH_ARTICLES_REQUEST':
    case 'FETCH_ARTICLE_REQUEST':
    case 'CREATE_ARTICLE_REQUEST':
    case 'DELETE_ARTICLE_REQUEST':
    case 'REGISTER_USER_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_ARTICLES_SUCCESS':
      return {
        ...state,
        loading: false,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
      };

    case 'FETCH_ARTICLE_SUCCESS':
      return {
        ...state,
        loading: false,
        article: action.payload,
      };

    case 'CREATE_ARTICLE_SUCCESS':
      return {
        ...state,
        loading: false,
        article: action.payload,
        articles: [action.payload, ...state.articles],
      };

    case 'DELETE_ARTICLE_SUCCESS':
      return {
        ...state,
        loading: false,
        articles: state.articles.filter((a) => a.slug !== action.payload),
        article: null,
      };

    case 'UPDATE_ARTICLE_SUCCESS':
      return {
        ...state,
        article: action.payload,
      };

    case 'FETCH_ARTICLES_FAILURE':
    case 'FETCH_ARTICLE_FAILURE':
    case 'CREATE_ARTICLE_FAILURE':
    case 'DELETE_ARTICLE_FAILURE':
    case 'REGISTER_USER_FAILURE':
    case 'UPDATE_ARTICLE_FAILURE':
      return { ...state, loading: false, error: action.payload };

    //  USER AUTH

    case 'REGISTER_USER_SUCCESS':
    case 'LOGIN_USER_SUCCESS':
    case 'LOAD_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        isLoading: false,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case 'LOGIN_USER_REQUEST':
      return { ...state, loading: true, error: null };

    case 'LOGIN_USER_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'LOAD_USER_REQUEST':
      return { ...state, isLoading: true, loginError: null };

    case 'LOAD_USER_FAILURE':
      return {
        ...state,
        isLoading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };

    case 'UPDATE_USER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };

    //  PAGINATION

    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.payload };

    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    articlesData: articlesReducer,
  },
});

export default store;
