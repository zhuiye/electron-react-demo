import { autoUpdater } from 'electron-updater';
import { ipcMain, BrowserWindow } from 'electron';

import log from 'electron-log';

/*
    https://segmentfault.com/a/1190000012904543
*/

// 检测更新，在你想要检查更新的时候执行，renderer事件触发后的操作自行编写
function updateHandle(mainWindow: BrowserWindow) {
  log.transports.file.level = 'info';
  autoUpdater.logger = log;

  // 关闭自动下载
  autoUpdater.autoDownload = false;

  // 通过main进程发送事件给renderer进程，提示更新信息
  function sendUpdateMessage(text: string) {
    mainWindow.webContents.send('updateMessage', text);
  }

  const message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新',
  };
  // 设置服务器更新地址
  autoUpdater.setFeedURL({
    provider: 'generic',
    url: 'http://localhost:4000',
  });
  autoUpdater.on('error', function () {
    sendUpdateMessage(message.error);
  });
  autoUpdater.on('checking-for-update', function () {
    sendUpdateMessage(message.checking);
  });
  // 版本检测结束，准备更新
  autoUpdater.on('update-available', function (info) {
    sendUpdateMessage(message.updateAva);
  });
  autoUpdater.on('update-not-available', function (info) {
    sendUpdateMessage(message.updateNotAva);
  });
  // 更新下载进度事件
  autoUpdater.on('download-progress', function (progressObj) {
    console.log('下载进度百分比>>>', progressObj.percent);
  });
  // 下载完成
  autoUpdater.on('update-downloaded', function (
    event,
    releaseNotes,
    releaseName,
    releaseDate,
    updateUrl,
    quitAndUpdate
  ) {
    // 退出且重新安装
    autoUpdater.quitAndInstall();
  });

  ipcMain.on('checkForUpdate', async () => {
    const res = await autoUpdater.checkForUpdates();

    mainWindow.webContents.send('updateVersionInfo', res);
  });
}
export default updateHandle;
