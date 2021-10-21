import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import MentorRegistration from "./pages/MentorRegistration/MentorRegistration";

let AuthService = {
    urls:
        [
            {path: '/login', component: Login, exact: false},
            {path: '/registration', component: Registration, exact: false},
            {path: '/mentor_registration', component: MentorRegistration, exact: false}
        ]
}

export default AuthService