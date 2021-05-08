import React, { CSSProperties } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';
import Header from './component/Header';
import { ipcRenderer } from 'electron';
import isElectron from './utils/isElectron';
import { Grid } from '@ibingli/rs_shared_component';
import css from './test.module.css';

const Hello = () => {
  ipcRenderer.on('receiveMessage', (event: any, args: any) => {
    console.log('接收到主进程的消息', args);
  });

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
          header
        </header>
        <section key="toolbar" style={{ border: '1px solid red' }}>
          toolbar
        </section>
      </Grid>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
