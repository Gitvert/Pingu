export class ResponseHelper {
    static send(res: any, responseBody: any[]): void {
        res.header("Content-type", "application/json");
        res.send(JSON.stringify(responseBody));
    }
}