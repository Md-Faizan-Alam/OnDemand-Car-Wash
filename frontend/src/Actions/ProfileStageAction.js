const setProfileStage = (stage)=>{
    return (dispatch)=>{
        dispatch({
            type: "SET_PROFILE_STAGE",
            payload: stage
        });
    };
};

export default setProfileStage;