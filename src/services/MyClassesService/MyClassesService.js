import EditClasses from "./pages/EditClasses/EditClasses";
import MyClassesMentor from "./pages/MyClassesMentor/MyClassesMentor";
import MyClassesMentee from "./pages/MyClassesMentee/MyClassesMentee";
import Favorites from "./pages/Favorites/Favorites";

let MyClassesService = [
    {path: '/edit-classes', component: EditClasses, exact: false, for_mentor: true},
    {path: '/my-classes-mentor', component: MyClassesMentor, exact: false, for_mentor: true},
    {path: '/my-classes-mentee', component: MyClassesMentee, exact: false, for_mentor: false},
    {path: '/favorites', component: Favorites, exact: false, for_mentor: false}
]

export default MyClassesService