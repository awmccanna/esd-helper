const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    createApplication: (company: string, url: string, position: string, appliedDate: string) =>
        electron.ipcRenderer.invoke('createApplication', { company, url, position, appliedDate }),
    getApplications: () => electron.ipcRenderer.invoke('getApplications'),
    deleteApplication: (id: number) => electron.ipcRenderer.invoke('deleteApplication', id),
    saveFile: (data: {content: string, defaultPath: string}) => electron.ipcRenderer.invoke('saveFile', data)
})