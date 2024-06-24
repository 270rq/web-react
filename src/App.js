import './App.css';
import Main from './component/main';
import React from 'react';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
            borderRadius: 5,
          },
        }}
      >
        <div className="App">
          <Main></Main>
        </div>
      </ConfigProvider>
    </React.StrictMode>
  );
}

export default App;