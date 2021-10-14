import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";

let AuthService = {
    urls:
        [
            {path: '/login', component: Login, exact: false},
            {path: '/registration', component: Registration, exact: false}
        ]
}

export default AuthService