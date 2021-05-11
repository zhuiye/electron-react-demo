import React, { CSSProperties, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import 'antd/dist/antd.css';
import { ConfigProvider, DatePicker, message, Modal, Button } from 'antd';
import Header from './component/Header';
import { ipcRenderer, shell } from 'electron';
import isElectron from './utils/isElectron';
import { Grid } from '@ibingli/rs_shared_component';
import zhCN from 'antd/lib/locale/zh_CN';

const Hello = () => {
  return (
    <div>
      <Header />
      <Grid
        style={{ height: 400, display: 'grid' }}
        rows={['50px', '1fr']}
        cols={['1fr', '50px']}
        areas={[
          ['header', 'header'],
          ['toolbar', 'toolbar'],
        ]}
      >
        <header key="header" style={{ border: '1px solid red' }}>
          <Button
            type="primary"
            onClick={() => {
              // shell.openExternal('https://www.baidu.com');
            }}
          >
            检查更新
          </Button>
        </header>
        <section key="toolbar" style={{ border: '1px solid red' }}>
          <Button type="primary">我是button</Button>
        </section>
      </Grid>
    </div>
  );
};

export default function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/" component={Hello} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
