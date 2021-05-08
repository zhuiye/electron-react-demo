import { IpcMain, BrowserWindow } from 'electron';

export type WindowControl = 'close' | 'fullscreen' | 'min';
function ipcWindowControl(win: BrowserWindow, ipcMain: IpcMain) {
  ipcMain.on('windowControlClick', (event, args: WindowControl) => {
    switch (args) {
      case 'close':
        win.close();
        break;
      case 'fullscreen':
        // 先获取屏幕状态;
        const fullStatus = !win.isFullScreen();
        console.log(fullStatus);
        win.setKiosk(fullStatus);
        win.setFullScreen(fullStatus);

        break;
      case 'min':
        win.minimize();
        break;
      default:
        break;
    }
    // win?.webContents.send('receiveMessage', '我是主进程已收到消息' + args); // 响应渲染进程
  });
}

export default ipcWindowControl;
