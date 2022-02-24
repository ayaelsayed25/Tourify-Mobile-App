import IPAdress from './IPAdress';
import { CommonActions } from '@react-navigation/native';

const createPost = (body, navigation, setProcessing) => {
    console.log("aloo")
    
    checkPostValidation(body)
    setProcessing(true)
    console.log(url)

    fetch(IPAdress + 'posts/' + url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }).then((res) => {
        console.log(JSON.stringify(res))
        setProcessing(false)
        goHome(navigation)
    });
}

const checkPostValidation = (body) => {
    if (body.description === '' || body.duration === '' || body.budget === 0) {
        Alert.alert(
            "Be Careful",
            "You should Enter all required fields!",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
        return false
    }
    return true
}

const goHome = (navigation) => {
    navigation.dispatch(
        CommonActions.reset({
            index:4,
            routes:[{name:'Feed'}]
        })
    )
}

export { goHome, createPost }