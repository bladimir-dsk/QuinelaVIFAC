import { BrowserRouter } from 'react-router-dom'
import RouteApp from './routes/RouteApp'
import { AuthProvider } from './context/AuthProvider'
import { useDarkMode } from './hooks/useDarkMode';
import { ConfigProvider, theme } from 'antd';

function App() {

  const { isDarkMode } = useDarkMode();

  return (
      <BrowserRouter>
        <AuthProvider>
          <RouteApp />
        </AuthProvider>
      </BrowserRouter>
  )
}

export default App