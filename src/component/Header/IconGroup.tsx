import React, { useCallback } from 'react';
import {
  MinusOutlined,
  FullscreenOutlined,
  CloseOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './iconGroup.module.css';
import { ipcRenderer } from 'electron';
import { WindowControl } from '../../ipcMain/windowControl';

const size = 20;

function IconGroup() {
  const sendClick = useCallback((type: WindowControl) => {
    ipcRenderer.send('windowControlClick', type);
  }, []);

  return (
    <div>
      <SettingOutlined size={20} />
      <MinusOutlined
        title="最小化"
        className={styles.space}
        size={size}
        onClick={useCallback(() => {
          sendClick('min');
        }, [sendClick])}
      />
      <FullscreenOutlined
        className={styles.space}
        size={size}
        title="最大化"
        onClick={useCallback(() => {
          sendClick('fullscreen');
        }, [sendClick])}
      />
      <CloseOutlined
        size={size}
        className={styles.space}
        title="关闭"
        onClick={useCallback(() => {
          sendClick('close');
        }, [sendClick])}
      />
    </div>
  );
}

export default IconGroup;
