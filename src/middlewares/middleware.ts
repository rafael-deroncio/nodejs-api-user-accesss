import authentication from "./authentication.middleware";
import authorization from "./authorization.middleware";
import confirm from "./confirm.middleware";
import login from "./login.middleware";
import signin from "./signin.middleware";

export default {
    signin,
    confirm,
    login,
    authorization,
    authentication
};
