const Secret = {
    razorPayKeyId: process.env.REACT_APP_RAZORPAY_API_KEY_ID,
    razorPayKeySecret: process.env.REACT_APP_RAZORPAY_API_KEY_SECRET,
    getRazorPayKeyId: ()=>{
        return Secret.razorPayKeyId;
    },
    getRazorPayKeySecret: ()=>{
        return Secret.razorPayKeySecret;
    }
}

export default Secret;