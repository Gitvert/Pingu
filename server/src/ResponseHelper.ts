export class ResponseHelper {
    static send(res: any, responseBody: any[]): void {
        res.setHeader("Content-type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(JSON.stringify(responseBody));
    }
}