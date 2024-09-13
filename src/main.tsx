import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store-redux-index.ts'
import oldStore from './store/store-old-redux.ts'
import { RecoilRoot } from 'recoil'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecoilRoot>
      <Provider store={store}>
      {/* <Provider store={oldStore}> */}
          <App />
      </Provider>
    </RecoilRoot>
  </StrictMode>,
)
