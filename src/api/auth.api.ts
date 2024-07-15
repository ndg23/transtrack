import apiClient from "../../http_common";

const RES = 'auth'

const signin = async (data: any) => {
    return await apiClient.post(`${RES}/login`, data);
};
const checkEmail = async (data: any) => {
    return await apiClient.post(`${RES}/check`, data);
};
const signup = async (data: any) => {
    const res = await apiClient.post(`${RES}/signup`, data)
    return res;

};

const AuthService = {
    signin,
    signup,
    checkEmail
};

export default AuthService;