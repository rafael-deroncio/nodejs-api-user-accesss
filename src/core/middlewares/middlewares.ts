import account from "./account-middleware";
import login from "./login-middleware";
import token from "./refresh-middleware";
import signin from "./signin-middleware";

const middleware = {
    signin,
    login,
    account,
    token
}

export default middleware;
