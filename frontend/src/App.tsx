import { ConfigProvider } from 'antd';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#FFC107',
          colorTextLightSolid: '#000000', // texto oscuro sobre botones de color primario
        },
      }}
    >
      <AppRouter />
    </ConfigProvider>
  );
}

export default App;