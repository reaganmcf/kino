import { Provider } from 'react-redux'
import Catalog from './features/catalog/index.tsx'
import { store } from './redux/store'
import { Toaster } from './components/ui/toaster.tsx'

function App() {
  return (
    <Provider store={store}>
      <Catalog />
      <Toaster />
    </Provider>
  )
}

export default App
