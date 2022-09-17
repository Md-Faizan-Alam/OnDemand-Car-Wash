const ProfileStageReducer = (profileStage = "view",action)=>{
    switch (action.type) {
        case 'SET_PROFILE_STAGE':
            profileStage = action.payload;
            return profileStage;
        default:
            return profileStage;
    }
}
export default ProfileStageReducer;