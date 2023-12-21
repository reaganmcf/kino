import { Provider } from 'react-redux'
import Catalog from './features/catalog/index.tsx'
import { store } from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Catalog />
    </Provider>
  )
}

export default App
