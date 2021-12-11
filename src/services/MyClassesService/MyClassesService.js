import EditClasses from "./pages/EditClasses/EditClasses";
import MyClassesMentor from "./pages/MyClassesMentor/MyClassesMentor";

let MyClassesService = [
    {path: '/edit-classes', component: EditClasses, exact: false, for_mentor: true},
    {path: '/my-classes-mentor', component: MyClassesMentor, exact: false, for_mentor: true},
]

export default MyClassesService