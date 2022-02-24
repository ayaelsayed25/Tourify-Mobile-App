import IPAdress from './IPAdress';
// const getFeedPosts = async(token)=>{
//     try{
//         const resp = await fetch(IPAdress + "posts/feed",
//         {
//             method: "GET",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'Authorization':token
//             },
//         }).catch((err)=>{return false});
//         if(resp.status !== 200) return false;
//         else
//             return resp.json();
//     }
//     catch{() => false}
// }
const getUserPosts = async(token)=>{
    try{
        const resp = await fetch(IPAdress + "posts/profilePosts",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            },
        }).catch((err)=>{return false});
        if(resp.status !== 200) return false;
        else return resp.json();
    }catch{()=>{return false;}}
}


const getPostView = async (token,id) => {
    try {
        const resp = await fetch(IPAdress + `posts/viewPost?id=${id}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }).catch((err) => { return false });
        if (resp.status !== 200) return false;
        else
            return resp.json();
    }
    catch { () => false }
}

const getFeedPosts = async(token, filter)=>{
    try{
        const resp = await fetch(IPAdress + "posts/feed",
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: filter? JSON.stringify(filter) : null
        }).catch((err)=>{return false});
        if(resp.status !== 200) return false;
        else
            return resp.json();
    }
    catch{() => false}
}
export { getFeedPosts, getUserPosts, getPostView}