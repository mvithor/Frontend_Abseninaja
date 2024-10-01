// import React, { Suspense} from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store/Store';
// import { StudentProvider } from './context/StudentContext';
// import Spinner from './views/spinner/Spinner';
// import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <Suspense fallback={<Spinner />}>
//         <BrowserRouter>
//           <ErrorBoundary> {/* Wrap components with ErrorBoundary */}
//             <StudentProvider>
//               <App />
//             </StudentProvider>
//           </ErrorBoundary>
//         </BrowserRouter>
//       </Suspense>
//     </PersistGate>
//   </Provider>
// );




import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/Store';
import { StudentProvider }  from './context/StudentContext';
import Spinner from './views/spinner/Spinner';
// import './_mockApis';
import './utils/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <Suspense fallback={<Spinner />}>
      <BrowserRouter>
      <StudentProvider>
      <App />

      </StudentProvider>

      </BrowserRouter>
    </Suspense>
    </PersistGate>
  </Provider>
);