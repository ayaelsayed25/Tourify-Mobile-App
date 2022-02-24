import React, { useContext, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeContext } from '../Context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height

function Map({navigation}) {
	const theme = useContext(ThemeContext);
	const [ pin, setPin ] = React.useState({
		latitude: 37.78825,
		longitude: -122.4324
	})
	const [ region, setRegion ] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
			  setErrorMsg('Permission to access location was denied');
			  return;
			}
			let location = await Location.getCurrentPositionAsync({});
			console.log(location.coords.latitude)
			setPin({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude
			})
			setRegion({
				latitude:location.coords.latitude,
				longitude:location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			})
		  })();
	}, []);
		
	const backToPost = () => {
		navigation.navigate('PostCreation', {latitude:pin.latitude, longitude:pin.longitude})
	}
	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<View style={styles.upperSection}>
				<TouchableOpacity onPress={() => navigation.navigate('PostCreation')}> 
					<FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) } color={theme.SecondaryPurple}   style={{marginRight :SCREEN_WIDTH*0.7, marginTop : 8,  }}/>
				</TouchableOpacity>
				<TouchableOpacity onPress= {backToPost}>
					<LinearGradient
                        colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={{color:"white"}}>Done</Text>
                    </LinearGradient>
				</TouchableOpacity>
			</View>
            <MapView
				style={styles.map}
				region={region}
				provider="google"
			>
				<Marker
					coordinate={pin}
					draggable={true}
					onDragEnd={(e) => {
                        console.log(e.nativeEvent.coordinate.latitude)
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
                        setRegion({
                            latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        })
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	button: {
        alignItems: 'center',
        justifyContent: "center",
        width:SCREEN_WIDTH*0.15,
        height:SCREEN_HEIGHT*0.048,
        borderRadius: SCREEN_WIDTH*0.1,
    },
	upperSection : {
        flexDirection : 'row',
		paddingLeft: SCREEN_WIDTH*0.05,
		paddingBottom:SCREEN_WIDTH*0.02,
        borderBottomWidth:RFValue(0.5),
        width:SCREEN_WIDTH,
    },
})
export default Map;