import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { ipcRenderer } from 'electron';
import { version } from '../package.json';
import { UpdateCheckResult } from 'electron-updater';

function useCheckAppUpdate() {
  useEffect(() => {
    const listener = (event: any, result: UpdateCheckResult) => {
      if (result.updateInfo.version === version) {
        Modal.info({
          title: '当前版本已是最新',
        });
        return;
      }

      Modal.confirm({
        title: '检测到新版本',
        content: `请问你是否更新${result.updateInfo.version}`,
        cancelText: '取消',
        okText: '确定',
        onOk: () => {},
      });
    };
    ipcRenderer.on('updateVersionInfo', listener);

    return () => {
      ipcRenderer.removeListener('updateVersionInfo', listener);
    };
  }, []);
}

function useUpdateAppAction() {
  const checkForUpdate = useCallback(() => {
    ipcRenderer.send('checkForUpdate');
  }, []);

  return [checkForUpdate];
}

function useListenerUpdateError() {
  useEffect(() => {
    const listener = () => {
      Modal.error({
        title: '更新发生错误',
      });
    };
    // ipcRenderer.on('updateError', listener);

    return () => {
      ipcRenderer.removeListener('updateError', listener);
    };
  }, []);
}

export { useCheckAppUpdate, useUpdateAppAction, useListenerUpdateError };
