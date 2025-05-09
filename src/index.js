import store from './store/store';
import App from './components/App';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
