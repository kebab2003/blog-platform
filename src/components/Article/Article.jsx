import styles from './Article.module.scss';
import { deleteArticle, likeArticle, unlikeArticle } from '../../store/ArticleActions';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm } from 'antd';

function Article({ article, full = false }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.articlesData.user);

  const [isLiked, setIsLiked] = useState(article.favorited);

  const handleDelete = () => {
    dispatch(deleteArticle(article.slug, () => history.push('/')));
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      dispatch(unlikeArticle(article.slug));
    } else {
      dispatch(likeArticle(article.slug));
    }
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    history.push(`/articles/${article.slug}/edit`);
  };

  return (
    <div className={styles.article_wrapper}>
      <div className={styles.article_content}>
        <div className={styles.article_title}>
          <Link style={{ color: '#1890FF', textDecoration: 'none' }} to={`/articles/${article.slug}`}>
            {article.title}
          </Link>

          <button
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={handleLikeToggle}
          >
            <div
              style={{
                fontSize: 24,
                display: 'flex',
                alignItems: 'center',
                marginLeft: 10,
              }}
            >
              <span style={{ color: isLiked ? 'red' : 'gray' }}>♡</span>
              <span style={{ fontSize: 12, marginLeft: 5 }}>{article.favoritesCount}</span>
            </div>
          </button>
        </div>

        <div className={styles.article_description}>{article.description}</div>

        <div className={styles.article_tags}>
          {article.tagList &&
            article.tagList.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
        </div>

        {full && (
          <div className={styles.article_body_full}>
            <ReactMarkdown>{article.body || ''}</ReactMarkdown>
          </div>
        )}
      </div>

      <div className={styles.article_profile}>
        <div className={styles.profile_top}>
          <div className={styles.profile_info}>
            <div>{article.author.username}</div>
            <div>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
          <img src={article.author.image} alt="profile" />
        </div>

        {full && currentUser?.username === article.author.username && (
          <div className={styles.article_buttons}>
            <Popconfirm
              title="Вы уверены, что хотите удалить статью?"
              onConfirm={handleDelete}
              okText="Да"
              cancelText="нет"
              placement="right"
            >
              <Button type="default" danger>
                Удалить
              </Button>
            </Popconfirm>
            <Button type="default" onClick={handleEdit} style={{ color: 'green', borderColor: 'green' }}>
              Редактировать
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Article;
