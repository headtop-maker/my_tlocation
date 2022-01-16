import React from 'react';
import MainContainer from './container/mainContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import rootReducer from './store/rootReducer';

const {store, persistor} = rootReducer();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <MainContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
