const TOKEN_KEY = 'token';
const USER = 'user';


export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER);
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}