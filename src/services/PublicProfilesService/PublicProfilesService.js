import MenteeProfile from "./MenteeProfile/MenteeProfile";


let PublicProfilesService = [
    {path: '/mentee-profile/:id/', component: MenteeProfile, exact: false}
]

export default PublicProfilesService