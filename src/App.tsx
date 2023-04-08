import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AuthDesktop from './components/screen/Auth/AuthDesktop/AuthDesktop';
import MainProvider from './main-provider/MainProvider';
import store, { persistor } from './store/store';

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainProvider>
            <AuthDesktop />
          </MainProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
