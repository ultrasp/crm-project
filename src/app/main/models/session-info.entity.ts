export interface ISessionInfo {
    status?: number;
    message?: any;
    data?: IData;
    error_code?: number;
}

export interface IData {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    jti: string;
    user_info: IUserInfo;
}

export interface IUserInfo {
    id: number;
    branch_id:number;
    employee_id:number;
    flag:number;
    name: string;
    username: string;
    role_id: number;
    permissions: IPermission[];
}

export interface IPermission{
    value:string,
    authority:string,
    type:number;
}
