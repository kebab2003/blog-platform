// Получение всех статей
export const fetchArticles =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_ARTICLES_REQUEST' });

      const limit = 10;
      const offset = (page - 1) * limit;

      const response = await fetch(`https://blog-platform.kata.academy/api/articles?limit=${limit}&offset=${offset}`);
      const data = await response.json();

      dispatch({
        type: 'FETCH_ARTICLES_SUCCESS',
        payload: { articles: data.articles, articlesCount: data.articlesCount },
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ARTICLES_FAILURE', payload: error.message });
    }
  };

// Получение одной статьи
export const fetchArticleBySlug = (slug) => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_ARTICLE_REQUEST' });

    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
    const data = await response.json();

    dispatch({
      type: 'FETCH_ARTICLE_SUCCESS',
      payload: data.article,
    });
  } catch (error) {
    dispatch({ type: 'FETCH_ARTICLE_FAILURE', payload: error.message });
  }
};

export const registerUser = (userData, callback) => async (dispatch) => {
  dispatch({ type: 'REGISTER_USER_REQUEST' });

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors));
    }

    localStorage.setItem('token', data.user.token);

    dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user });

    if (callback) callback();
  } catch (error) {
    dispatch({ type: 'REGISTER_USER_FAILURE', payload: error.message });
  }
};

export const loginUser = (credentials, callback) => async (dispatch) => {
  dispatch({ type: 'LOGIN_USER_REQUEST' });

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: credentials }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data.errors;
    }

    localStorage.setItem('token', data.user.token);

    dispatch({ type: 'LOGIN_USER_SUCCESS', payload: data.user });

    if (callback) callback();
  } catch (error) {
    dispatch({ type: 'LOGIN_USER_FAILURE', payload: error });
  }
};

// если пользователь залогинился(вход)

export const loadUser = () => async (dispatch) => {
  dispatch({ type: 'LOAD_USER_REQUEST' });

  const token = localStorage.getItem('token');

  // Если нет токена, считаем пользователя неавторизованным
  if (!token) {
    dispatch({ type: 'LOAD_USER_FAILURE', payload: null }); // Токен не найден, не вызываем ошибку, а просто передаем null
    return;
  }

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Не удалось загрузить пользователя');
    }

    dispatch({ type: 'LOAD_USER_SUCCESS', payload: data.user });
  } catch (error) {
    dispatch({ type: 'LOAD_USER_FAILURE', payload: error.message });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT_USER' });
};

export const updateUser = (userData, callback) => async (dispatch, getState) => {
  const { token } = getState().articlesData.user;

  dispatch({ type: 'UPDATE_USER_REQUEST' });

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        user: {
          username: userData.username,
          email: userData.email,
          password: userData.password || undefined,
          image: userData.image,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors));
    }

    dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data.user });

    if (callback) callback();
  } catch (error) {
    dispatch({ type: 'UPDATE_USER_FAILURE', payload: error.message });
  }
};

export const createArticle = (articleData, callback) => async (dispatch) => {
  dispatch({ type: 'CREATE_ARTICLE_REQUEST' });

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors));
    }

    dispatch({
      type: 'CREATE_ARTICLE_SUCCESS',
      payload: data.article,
    });

    if (callback) callback();
  } catch (error) {
    dispatch({
      type: 'CREATE_ARTICLE_FAILURE',
      payload: error.message,
    });
  }
};

export const deleteArticle = (slug, callback) => async (dispatch, getState) => {
  dispatch({ type: 'DELETE_ARTICLE_REQUEST' });

  const token = getState().articlesData.user?.token;

  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении статьи');
    }

    dispatch({ type: 'DELETE_ARTICLE_SUCCESS', payload: slug });
    if (typeof callback === 'function') callback();
  } catch (error) {
    dispatch({ type: 'DELETE_ARTICLE_FAILURE', payload: error.message });
  }
};

export const updateArticle = (slug, articleData, callback) => async (dispatch, getState) => {
  dispatch({ type: 'UPDATE_ARTICLE_REQUEST' });

  const token = getState().articlesData.user?.token;

  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ article: articleData }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data.errors));
    }

    dispatch({
      type: 'UPDATE_ARTICLE_SUCCESS',
      payload: data.article,
    });

    if (typeof callback === 'function') callback();
  } catch (error) {
    dispatch({
      type: 'UPDATE_ARTICLE_FAILURE',
      payload: error.message,
    });
  }
};

export const likeArticle = (slug) => async (dispatch, getState) => {
  const token = getState().articlesData.user?.token;
  if (!token) return;

  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при добавлении лайка');
    }

    const data = await response.json();

    dispatch({
      type: 'LIKE_ARTICLE_SUCCESS',
      payload: data.article,
    });
  } catch (error) {
    dispatch({ type: 'LIKE_ARTICLE_FAILURE', payload: error.message });
  }
};

export const unlikeArticle = (slug) => async (dispatch, getState) => {
  const token = getState().articlesData.user?.token;
  if (!token) return;

  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении лайка');
    }

    const data = await response.json();

    dispatch({
      type: 'UNLIKE_ARTICLE_SUCCESS',
      payload: data.article,
    });
  } catch (error) {
    dispatch({ type: 'UNLIKE_ARTICLE_FAILURE', payload: error.message });
  }
};

export const setCurrentPage = (page) => ({
  type: 'SET_CURRENT_PAGE',
  payload: page,
});
