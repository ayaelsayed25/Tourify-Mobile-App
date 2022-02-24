import IPAdress from './IPAdress';


const markAsRead = async (user_token, id) => {

    try {
        await fetch(IPAdress + `notifications/view/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user_token
            },
        })
            .catch(err => console.error(err));
        return true

    } catch { () => false }

}

const getAllNotifications = async (user_token) => {
    console.log("alo")
    try {

        const resp = await fetch(IPAdress + `notifications/`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': user_token
                },
            })
            .catch((err) => { return false });

        if (resp.status !== 200) return false;
        else
            return resp.json();
    } catch { () => false }

}

const saveNotificationToken = async (user_token, token) => {

    console.log("Save token")
    try {
        await fetch(IPAdress + `account/saveNotifyToken`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': user_token
            },

            body: JSON.stringify({ notificationToken: token })
        })
            .catch(err => console.error(err));
        return true

    } catch { () => false }

}

export { markAsRead, getAllNotifications, saveNotificationToken }
