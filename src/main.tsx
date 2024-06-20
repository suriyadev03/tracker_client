import ReactDOM from 'react-dom/client'
import './index.css'
import { Routers } from './Routes'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from "react-redux";
import { store } from './store';
import { ErrorBoundaries } from './components/ErrorBoundaries';
import {Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingComponent } from './components/Loading';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundaries>
      <Provider store={store}>
        <div className='mainWrapper'>
          <LoadingComponent />
          <Routers />
          <ToastContainer
            position="bottom-right"
            autoClose={100}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Flip}
          />
        </div>
      </Provider>
  </ErrorBoundaries>,
)