import { BrowserRouter } from 'react-router-dom'
import RouteApp from './routes/RouteApp'
import { AuthProvider } from './context/AuthProvider'
import { ConfigProvider, theme, App as AntApp } from 'antd';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import esES from 'antd/locale/es_ES';

function ThemedApp() {
  const { isDarkMode } = useDarkMode();

  return (
    <ConfigProvider
      locale={esES}
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#00b8db',
          borderRadius: 6,
        },
      }}
    >
      <AntApp>
        <RouteApp />
      </AntApp>
    </ConfigProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DarkModeProvider>
          <ThemedApp />
        </DarkModeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App