import MenteeProfile from "./MenteeProfile/MenteeProfile";
import MentorProfile from "./MentorProifle/MentorProfile";


let PublicProfilesService = [
    {path: '/mentee-profile/:id/', component: MenteeProfile, exact: false},
    {path: '/mentor-profile/:id/', component: MentorProfile, exact: false}
]

export default PublicProfilesService