import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import MentorRegistration from "./pages/MentorRegistration/MentorRegistration";
import PasswordRecovery from "./pages/PasswordRecovery/PasswordRecovery";
import ChangePassword from "./pages/ChangePassword/ChangePassword";

let AuthService = {
    urls:
        [
            {path: '/login', component: Login, exact: false},
            {path: '/registration', component: Registration, exact: false},
            {path: '/mentor_registration', component: MentorRegistration, exact: false},
            {path: '/password-recovery', component: PasswordRecovery, exact: false},
            {path: '/change-password', component: ChangePassword, exact: false}
        ]
}

export default AuthService