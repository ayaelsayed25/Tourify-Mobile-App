import React, { useContext, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../Screens/Profile';
import Notifications from '../../Screens/Notifications';
import { RFValue } from "react-native-responsive-fontsize";
import { View, StyleSheet, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../Shared/GradientText';
import { ThemeContext } from '../../Context/ThemeContext';
import { TokenContext } from '../../Context/TokenContext';
import { NotificationsContext } from '../../Context/NotificationsContext';
import PostCreation from '../../Screens/PostCreation';
import Feed from '../../Screens/Feed';
import { MenuProvider } from 'react-native-popup-menu';
import FlashMessage from "react-native-flash-message";
import NotificationsBadge from '../NotificationsBadge';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function NavigationTabs(props) {
    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);
    const [notificationsCount, setNotificationsCount] = useContext(NotificationsContext);


    const BadgedIcon = NotificationsBadge(notificationsCount, {
        left: 25,
    })(MaterialIcons);
    return (
        <MenuProvider>
            <FlashMessage position="top" hideStatusBar={true} />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: RFValue(10),
                        left: RFValue(20),
                        right: RFValue(20),
                        borderRadius: RFValue(20),
                        height: RFValue(60),
                        backgroundColor: theme.Primary,
                        elevation: 1,
                        shadowOpacity: 1,
                        whiteSpace: 'nowrap',
                        numberOfLines: 1
                    },
                    tabBarIcon: ({ focused, color, size }) => {
                        let hidden = true;
                        let iconName;
                        let text
                        if (route.name === 'Feed') {
                            iconName = 'home';
                        }
                        else if (route.name === 'Notifications') {
                            hidden = false;
                            iconName = 'notifications'
                        }
                        else if (route.name === 'Profile') {
                            iconName = 'person'
                        }
                        else if (route.name === 'PostCreation') {
                            iconName = 'add'
                        }

                        if (focused)
                            return <View style={{
                                marginBottom: RFValue(20),
                                alignItems: 'center',
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                <LinearGradient
                                    colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.button}>
                                    <MaterialIcons name={iconName} size={30} color={theme.Primary} />
                                </LinearGradient>
                                <GradientText numberOfLines={1} style={{ fontSize: RFValue(15) }}>{text}</GradientText>
                            </View>
                        else
                            return <View style={{
                                alignItems: 'center',
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                                {!hidden && (<BadgedIcon
                                    name={iconName} size={30} color={theme.SubText}

                                />)}
                                {hidden && (<MaterialIcons name={iconName} size={30} color={theme.SubText} />)}
                            </View>
                    }
                })}>
                <Tab.Screen name="Feed" component={Feed} 
                />
                <Tab.Screen name="PostCreation" component={PostCreation}
                    initialParams={{ edit: false }}
                    screenOptions={{
                        tabBarVisible: false,
                    }}
                />  
                <Tab.Screen name="Notifications" component={Notifications} 
                    // listeners={({navigation,route})=>({
                    //     blur:()=>{
                    //       navigation.dispatch(
                    //         CommonActions.reset({
                    //           index:4,
                    //           routes:[{name:'Profile'}]
                    //         })
                    //       )
                    //     },
                    // })}
                />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </MenuProvider>
    )

}

const circleDiameter = 50
const styles = StyleSheet.create({
    button: {
        width: RFValue(circleDiameter),
        height: RFValue(circleDiameter),
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: "3%",
        top: "7%",
        borderRadius: circleDiameter / 2,
    },

});
export default NavigationTabs;