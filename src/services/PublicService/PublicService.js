import Main from "./pages/Main/Main";
import Catalog from "./pages/Catalog/Catalog";

let PublicService = {
    urls:
        [
            {path: '/', component: Main, exact: true},
            {path: '/catalog', component: Catalog, exact: false}
        ]
}

export default PublicService