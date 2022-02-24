import IPAdress from './IPAdress';
export const editComment = async(token , body)=>{
    try{
        const resp = await fetch(IPAdress + "comments/editComment",
        {
            method: "Post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body : JSON.stringify(body)
        }).catch((err)=>{return false});
        if(resp.status !== 200) return false;
        else
            return resp.json();
    }
    catch{() => false}
}
export const deleteComment = async (token, id) => {
    try {
        const resp = await fetch(IPAdress + `comments/deleteComment?id=${id}`,
            {
                method: "Delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            }).catch((err) => { console.log("eee",err); return false });
        if (resp.status !== 200) {console.log("rr",resp);  return false;}
        else { return true}
    }    
    catch { () => false }
}


export const createComment = async (token, body) => {
    try {
        const resp = await fetch(IPAdress + "comments/createComment",
            {
                method: "Post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(body)
            }).catch((err) => {console.log(err); return false });
        if (resp.status !== 200) return false;
        else
            return resp.json();
    }
    catch { () => false }
}
