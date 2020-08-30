export class Logger {
    public log(message: string): void {
        console.log(`[log]: ${message}`);
    }

    public userLog(user: string, message: string): void {
        console.log(`[log] [${user}]: ${message}`);
    }

    public warn(message: string): void {
        console.log(`[warn]: ${message}`);
    }

    public error(message: string): void {
        console.log(`[ERROR]: ${message}`);
    }
}