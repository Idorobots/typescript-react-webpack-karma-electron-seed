declare var require: {
    (path: string): any; // tslint:disable-line
    (paths: string[], callback: (...modules: any[]) => void): void; // tslint:disable-line
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
