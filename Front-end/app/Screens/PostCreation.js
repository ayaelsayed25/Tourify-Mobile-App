import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt  } from '@fortawesome/free-solid-svg-icons';
import { AirbnbRating } from 'react-native-ratings';
import { ThemeContext } from '../Context/ThemeContext';
import TagsList from '../Components/PostCreation/TagsList';
import ImageSharing from '../Components/PostCreation/ImageSharing';
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { TokenContext } from '../Context/TokenContext';
import BudgetInput from '../Components/PostCreation/BudgetInput';
import PhotosList from '../Components/PostCreation/PhotosList';


const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PostCreation({navigation}) {
    const theme = useContext(ThemeContext);
    const [description, onChangeText] = useState('');
    const [tags, setTags] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [organisation, setOrganisation] = useState('');
    const [rate, setRate] = useState(3);
    const [duration, setDuration] = useState('');
    const [budget, setBudget] = useState(0);
    const [currency, setCurrancy] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const token = useContext(TokenContext);
    const ipAddress = "http://192.168.1.8:8000";
    const newTags = (newTags) => setTags(newTags)
    const newlatitude = (newLatitude) => setLatitude(newLatitude)
    const newlongitude = (newLongitude) => setLongitude(newLongitude)
    const newPhotos = (newPhotos) => setPhotos(newPhotos)
 
    

    const createPost = () => {
        if(description === '' || duration === '' || budget === 0 ) {
            Alert.alert(
                "Be Careful",
                "You should Enter all required fields!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        var body = JSON.stringify({
            email: token, 
            body: description,
            tags: tags,
            photos: photos,  //TODO
            organisation : organisation,
            rate: rate,
            duration: duration,
            budget: budget,
            currency: currency,
            latitude: latitude, 
            longitude: longitude 
        })
        console.log(body)
        fetch(ipAddress + '/posts/TripCreation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        }).then((res) => console.log(JSON.stringify(res.post_id)));
    }

    const goToMaps = () => {
        navigation.navigate('Map', {setLatitude:newlatitude, setLongitude:newlongitude})
    }

    return (
        <SafeAreaView style={[{backgroundColor: theme.primary}, styles.container]}>
            <View style={[styles.upperSection, {borderColor:theme.SecondaryPurple}]}>
                <TouchableOpacity >
                    <FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) }  color={theme.SecondaryPurple}  style={{marginRight :SCREEN_WIDTH*0.68, marginTop : SCREEN_WIDTH*0.028,  }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createPost()}>
                    <LinearGradient
                        colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        <Text style={{color:"white"}}>Share</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:"column"}}>
                <TextInput
                    style={[{borderColor: theme.SecondaryPurple}, styles.description]}
                    onChangeText={text => onChangeText(text)}
                    placeholder= "How was your trip?"
                    value={description}
                    multiline={true}
                />
                <View style={{flexDirection:"row"}}>
                    <AirbnbRating
                        type='star'
                        ratingCount={5}
                        showRating={false}
                        size= {RFValue(20)}
                        reviewSize= {RFValue(20)}
                        selectedColor={theme.SecondaryPurple}
                        reviewColor={theme.SecondaryPurple}
                        imageSize={RFValue(2)}
                        onFinishRating={rate => setRate(rate)}
                    />
                    <ImageSharing setPhotos={newPhotos} photos={photos}></ImageSharing>
                    <TouchableOpacity style={{marginLeft:SCREEN_WIDTH*0.01, marginTop:SCREEN_HEIGHT*0.008}} onPress={goToMaps}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={ SCREEN_WIDTH*0.07}  color={theme.SecondaryPurple}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <TagsList setTags={newTags}></TagsList>
                <PhotosList setPhotos={setPhotos} photos={photos}></PhotosList>
                <BudgetInput setBudget={setBudget} setCurrancy={setCurrancy}></BudgetInput>
                <View style={{flexDirection:"row"}}>
                    <TextInput
                        onChangeText={text => setDuration(text)}
                        placeholder="Number of Days"
                        keyboardType='numeric'
                        style={{fontSize:RFValue(16)}}
                    />
                    <TextInput
                        onChangeText={text => setOrganisation(text)}
                        placeholder="Organisation"
                        style={{marginLeft:SCREEN_WIDTH*0.3, fontSize:RFValue(16)}}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop:SCREEN_WIDTH*0.1
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width:SCREEN_WIDTH*0.16,
        height:SCREEN_HEIGHT*0.048,
        borderRadius: SCREEN_WIDTH*0.1,
    },
    upperSection : {
        flexDirection : 'row',
        paddingRight : SCREEN_WIDTH*0.05,
        paddingLeft : SCREEN_WIDTH*0.06,
        paddingBottom: SCREEN_HEIGHT*0.03,
        paddingTop:SCREEN_HEIGHT*0.015,
        width:SCREEN_WIDTH,
    },
    description: {
        height: SCREEN_HEIGHT*0.3, 
        width:SCREEN_WIDTH*0.9,
        fontSize:RFValue(18),
        borderBottomWidth: 0.3,
        textAlign:"left",
        textAlignVertical: 'top'
    },


});
 export default PostCreation;