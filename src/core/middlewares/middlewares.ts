import account from "./account-middleware";
import authenticate from "./authenticate-middleware";
import authorize from "./authorize-middleware";
import login from "./login-middleware";
import token from "./refresh-middleware";
import signin from "./signin-middleware";

const middleware = {
    signin,
    login,
    account,
    token,
    authenticate,
    authorize
}

export default middleware;
