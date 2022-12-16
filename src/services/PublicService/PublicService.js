import Main from "./pages/Main/Main";
import Catalog from "./pages/Catalog/Catalog";
import Search from "./pages/Search/Search";
import CompleteVerifyEmail from "./pages/CompleteVerifyEmail/CompleteVerifyEmail";

let PublicService = {
    urls:
        [
            {path: '/', component: Main, exact: true},
            {path: '/catalog/:id', component: Catalog, exact: false},
            {path: '/search', component: Search, exact: false},
            {path: '/complete-verify-email', component: CompleteVerifyEmail, exact: false}
        ]
}

export default PublicService