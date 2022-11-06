const Secret = {
    razorPayKeyId: process.env.REACT_APP_RAZORPAY_API_KEY_ID,
    razorPayKeySecret: process.env.REACT_APP_RAZORPAY_API_KEY_SECRET,
    getRazorPayKeyId: () => Secret.razorPayKeyId,
    getRazorPayKeySecret: () => Secret.razorPayKeySecret,
};

export default Secret;
