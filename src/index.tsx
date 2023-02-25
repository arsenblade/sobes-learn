import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.scss';
import './styles/fonts.scss';
import 'swiper/css/bundle';
import { store } from './store/store';
// eslint-disable-next-line import/order
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
