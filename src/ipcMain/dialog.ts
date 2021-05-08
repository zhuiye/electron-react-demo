import { dialog, IpcMain } from 'electron';

function handleDialog(ipc: IpcMain) {
  ipc.on('showMessageBoxSync', function (event, agr) {
    console.log(agr);
    dialog.showMessageBoxSync({
      type: 'info',
      title: '这里是标题',
      message: '提示内容',
      detail: '额外信息',
    });
  });
}

export default handleDialog;
