export class Connection {
    static token: string = "";
    static keepCookies: boolean = true;
    static cookies = null;
    static requiredContent = null;

    _url: string;
    _headers = null;

    constructor(url: string) {
        this._url = url;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    set headers(headers: any) {
        this._headers = headers;
    }
    
    buildParams(params: any): string {
        let queryString = "";
        if (params != null) {
            let size = Object.keys(params).length;
            let index = 0;
            queryString += "?";
            for (let key in params) {
                queryString += key + "=" + params[key];
                if (index < size - 1) {
                    queryString += "&";
                }
                index++;
            }
        }
        return queryString;
    }

    buildBody(method: string, payload: any, isMultipart: boolean = false) {
        let options: any = {
            method: method,
            headers: {"Access-Control-Allow-Origin": "*"},
            credentials: "include"
        };
        if (payload != null) {
            if (isMultipart) {
                options.body = new FormData();
                for (const key in payload) {
                    options.body.append(key, payload[key]);
                }
            } else {
                options.headers.Accept = 'application/json';
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify(payload);
            }
        }
        options = this.setToken(options);
        options = this.setRequiredContent(options);
        options = this.buildHeaders(options);
        return this.setCookies(options);
    }

    buildHeaders(options: any) {
        if (this.headers != null) {
            for (let headerName in this.headers) {
                options.headers[headerName] = this.headers[headerName];
            }
            this.headers = null;
        }
        return options;
    }

    setRequiredContent(options: any) {
        if (Connection.requiredContent != null) {
            options.headers["Required-Content"] = Connection.requiredContent;
        }
        Connection.requiredContent = null;
        return options;
    }
    
    setCookies(options: any) {
        if (Connection.keepCookies && Connection.cookies != null) {
            options.headers["Cookie"] = Connection.cookies;
        }
        return options;
    }

    setToken(options: any) {
        if (Connection.token != null) {
            options.headers["Token"] = Connection.token;
        }
        return options;
    }

    saveCookies(cookies: any) {
        if (cookies && Connection.keepCookies) {
            Connection.cookies = cookies;
        }
    }

    async send(method: string, endpoint: string, parameters: any = null, payload: any = null, isMultipar: any = null) {
        let queryString = this.buildParams(parameters);
        let header = this.buildBody(method, payload, isMultipar);
        const response = await fetch(this.url + "/" + endpoint + queryString, header);
        const contentType = response.headers.get("content-type");
        this.saveCookies(response.headers.get("Set-Cookie"));
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(json => {
                return {
                    status: response.status,
                    json: json
                };
            }).catch(response => {status: response.status});
        }
        return {status: response.status};
    }
}