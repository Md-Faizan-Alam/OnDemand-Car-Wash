const Storage = {
    razorPayKeyId: "rzp_test_YWt0CAt1LZciUa",
    razorPayKeySecret: "UveucS8r0ZcEU4loQAXEF0RF",
}

const Secret = {
    getRazorPayKeyId: ()=>{
        return Storage.razorPayKeyId;
    },
    getRazorPayKeySecret: ()=>{
        return Storage.razorPayKeySecret;
    }
}

export default Secret;