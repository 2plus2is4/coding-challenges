export const defaultOnListen = (serverName: string, port: number) => {
    return () => {
        console.log(`${serverName} Server listening on port ${port}`);
    };
}