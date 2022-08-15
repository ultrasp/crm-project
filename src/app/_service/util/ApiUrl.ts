import { environment } from "src/environments/environment.prod";

export class ApiUrl {
    public static API_URL() {
        const protocol = window.location.protocol;
        const hostName = window.location.hostname;
        const apiPort = environment.apiUrl.split(':')[2];
        return (hostName == 'localhost') ? environment.apiUrl : `${protocol}//${hostName}:${apiPort}`;
    }
}