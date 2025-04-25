export {};

declare global {
    interface Window {
        electron: {
            createApplication: (company: string, url: string, position: string, appliedDate: string) => Promise<any>;
            getApplications: () => Promise<any>;
            deleteApplication: (id: number) => Promise<any>;
            saveFile: (data: { content: string; defaultPath: string }) => Promise<{ canceled: boolean }>;
        };
    }
}
