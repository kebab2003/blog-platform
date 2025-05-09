import { fetchArticleBySlug } from '../../store/ArticleActions';
import Article from '../Article/Article';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function ArticlePage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { article, loading, error } = useSelector((state) => state.articlesData);

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug));
  }, [dispatch, slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Article not found</div>;

  return <Article article={article} full />;
}

export default ArticlePage;
