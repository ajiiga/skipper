import PrivateProfile from "./pages/PrivateProfile/PrivateProfile";

let PrivateProfileService = {
    urls:
        [
            {path: '/my-profile', component: PrivateProfile, exact: false}
        ]
}

export default PrivateProfileService