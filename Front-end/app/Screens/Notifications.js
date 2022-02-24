import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, Text } from 'react-native';
import { getAllNotifications } from '../API/NotificatonAPI';
import Spinner from 'react-native-loading-spinner-overlay';
import { TokenContext } from '../Context/TokenContext';
import { useContext } from 'react';
import NotificationList from '../Components/Notification/NotificationList';
import { NotificationsContext } from '../Context/NotificationsContext';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device height

function Notifications({ navigation }) {

    const [notifications, setNotifications] = useState([])
    const [notificationsCount, setNotificationsCount] = useContext(NotificationsContext);

    const [processing, setProcessing] = useState(true)
    const user_token = useContext(TokenContext)
    const [state, setState] = useState({ refresh: true })
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        const data = await getAllNotifications(user_token)
        console.log({ data })
        setNotifications(data)
        setNotificationsCount(0)
        console.log({ notifications })
        console.log(notifications[0])
        setProcessing(false)
        setState({ refresh: !state.refresh })
        setRefreshing(false)
    }, []);

    useEffect(async () => {
        onRefresh()

    }, [])

    return (
        <SafeAreaView style={{ paddingTop: "8%", flexDirection:"column", backgroundColor:"white", height: SCREEN_HEIGHT }}>
            <Text style={{fontWeight: "bold", fontSize: 30, margin:SCREEN_WIDTH*0.04 }}>Notifications</Text>
            {processing &&
                <Spinner
                    visible={processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />}
            {!processing &&
                <NotificationList navigation={navigation} notifications={notifications} onRefresh={onRefresh} refreshing={refreshing}/>
            }
        </SafeAreaView>
    );
}



export default Notifications;