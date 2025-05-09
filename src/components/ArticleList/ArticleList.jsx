import styles from './ArticleList.module.scss';
import { fetchArticles, setCurrentPage } from '../../store/ArticleActions';
import Article from '../Article/Article';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';

function ArticleList() {
  const { articles, loading, error, articlesCount, currentPage } = useSelector((state) => state.articlesData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={`${article.id}-${article.title}`} className={styles.article_item}>
            <Article article={article} full={false} />
          </li>
        ))}
      </ul>

      <Pagination
        style={{ justifyContent: 'center' }}
        current={currentPage}
        total={articlesCount}
        pageSize={10}
        onChange={handlePageChange}
        showSizeChanger={false}
      />
    </div>
  );
}

export default ArticleList;
