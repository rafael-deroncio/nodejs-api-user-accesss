import account from "./account-middleware";
import login from "./login-middleware";
import signin from "./signin-middleware";

const middleware = {
    signin,
    login,
    account
}

export default middleware;
