import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AirbnbRating } from 'react-native-ratings';
import { ThemeContext } from '../Context/ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";
import { LinearGradient } from 'expo-linear-gradient';
import { TokenContext } from '../Context/TokenContext';
import TagsList from '../Components/PostCreation/TagsList';
import ImageSharing from '../Components/PostCreation/ImageSharing';
import BudgetInput from '../Components/PostCreation/BudgetInput';
import PhotosList from '../Components/PostCreation/PhotosList';
import baseUrl from "../API/IPAdress" 
import { goHome, createPost } from '../API/PostCreation';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PostCreation({ navigation, route }) {
    const ipAddress = baseUrl;
    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);
    const [description, onChangeText] = useState('');
    const [tags, setTags] = useState([]);
    const [deletedTags, setDeletedTags] = useState([]);
    const [addedTags, setaddedTags] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [organisation, setOrganisation] = useState('');
    const [rate, setRate] = useState(3);
    const [duration, setDuration] = useState();
    const [budget, setBudget] = useState();
    const [currency, setCurrancy] = useState('USD');
    const [onProcessing, setProcessing] = useState(false);
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const newTags = (newTags) => setTags(newTags)


    useEffect(() => {
        if (route.params.longitude != undefined && route.params.latitude != undefined) {
            setLongitude(route.params.longitude)
            setLatitude(route.params.latitude)
        }
        if (route.params.edit) {
            fetch(`${ipAddress}posts/${route.params.postId}/${token}`)
            .then(res => {
                if (!res.ok) { 
                    throw Error('Could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(res => {
                const data = res[0];
                onChangeText(data.body)
                if(data.tags !== null){
                    data.tags = JSON.parse(data.tags);
                    setTags(data.tags)
                }
                if(data.photos !== null){
                    data.photos = JSON.parse(data.photos);
                    setPhotos(data.photos)       
                }
                setOrganisation(data.organisation)
                setRate(data.rate)
                setDuration(data.duration + '')
                setBudget(data.budget + '')
                setCurrancy(data.currency)
                setLatitude(data.latitude)
                setLongitude(data.longitude)                
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
                 // ADD THIS THROW error
                throw error;
            });
        }
    }, []);

    const createPost = () => {
        console.log("aloo")
        if (description === '' || duration === '' || budget === 0) {
            Alert.alert(
                "Be Careful",
                "You should Enter all required fields!",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        
        var url = "";
        setProcessing(true)
        var body = {
            email: token,
            body: description,
            tags: tags,
            photos: photos,
            organisation: organisation,
            rate: rate,
            duration: duration,
            budget: budget,
            currency: currency,
            latitude: latitude,
            longitude: longitude,
        }
        if(route.params.edit)
        {
            body['deletedTags'] = deletedTags
            body['deletedPhotos'] = deletedPhotos
            body['postId'] = route.params.postId
            body['tags'] = addedTags
            var x = photos.filter(photo => {
                console.log("base64" in photo)
                if("base64" in photo) return true
                return false
            })
            console.log(x)
            body['photos'] = x
            url = 'Edit'
        } else 
            url = 'TripCreation'
        body = JSON.stringify(body)
        console.log(url)
        fetch(ipAddress + 'posts/' + url, {
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

    const goToMaps = () => {
        navigation.navigate('Map')
    }
    const goBack = () => {
        Alert.alert(
            "Warning",
            "Are you sure you want to discard your changes?",
            [
                { text: "Yes", onPress: () => goHome(navigation) },
                { text: "Continue", onPress: () => console.log("Continue") }
            ]
        );
    }

    return (
        <SafeAreaView style={[{backgroundColor: theme.primary}, styles.container]}>
            <View style={[styles.upperSection, {borderColor:theme.SecondaryCyan}]}>
                <TouchableOpacity onPress={() => goBack()} >
                    <FontAwesomeIcon icon={faArrowLeft} size={ RFValue(18) }  color={theme.SecondaryCyan}  style={{marginRight :SCREEN_WIDTH*0.68, marginTop : SCREEN_WIDTH*0.028 }}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => createPost()}>
                    <LinearGradient
                        colors={[theme.SecondaryCyan, theme.SecondaryCyan]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.button}>
                        {!onProcessing && <Text style={{color:"white"}}> {route.params.edit?"Edit":"Share"}</Text>}
                        {onProcessing && <ActivityIndicator size="small" color="white" />}
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "column" }}>
                <TextInput
                    value={description}
                    style={[{ borderColor: theme.SecondaryCyan }, styles.description]}
                    onChangeText={text => onChangeText(text)}
                    placeholder="How was your trip?"
                    multiline={true}
                />
                <View style={{ flexDirection: "row" }}>
                    <AirbnbRating
                        defaultRating={rate}
                        type='star'
                        ratingCount={5}
                        showRating={false}
                        size={RFValue(20)}
                        reviewSize={RFValue(20)}
                        selectedColor={theme.SecondaryCyan}
                        reviewColor={theme.SecondaryCyan}
                        imageSize={RFValue(2)}
                        onFinishRating={rate => setRate(rate)}
                    />
                    <ImageSharing setPhotos={setPhotos} photos={photos} ></ImageSharing>
                    <TouchableOpacity style={{ marginLeft: SCREEN_WIDTH * 0.01, marginTop: SCREEN_HEIGHT * 0.008 }} onPress={goToMaps}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} size={SCREEN_WIDTH * 0.07} color={theme.SecondaryCyan}></FontAwesomeIcon>
                    </TouchableOpacity>
                </View>
                <TagsList edit={route.params.edit} setTags={newTags} tags ={tags} setDeletedTags={setDeletedTags} deletedTags ={deletedTags} setaddedTags={setaddedTags} addedTags ={addedTags}></TagsList>
                <PhotosList setPhotos={setPhotos} photos={photos} setDeletedPhotos={setDeletedPhotos} deletedPhotos={deletedPhotos}></PhotosList>
                <BudgetInput setBudget={setBudget} budget={budget} setCurrancy={setCurrancy} currency={currency}></BudgetInput>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        value={duration}
                        onChangeText={text => setDuration(text)}
                        placeholder="Number of Days"
                        keyboardType='numeric'
                        style={{ fontSize: RFValue(16) }}
                    />
                    <TextInput
                        value={organisation}
                        onChangeText={text => setOrganisation(text)}
                        placeholder="Organisation"
                        style={{ marginLeft: SCREEN_WIDTH * 0.3, fontSize: RFValue(16) }}
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
        paddingTop: SCREEN_WIDTH * 0.1,
        backgroundColor:"white"
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_HEIGHT * 0.048,
        borderRadius: SCREEN_WIDTH * 0.1,
    },
    upperSection: {
        flexDirection: 'row',
        paddingRight: SCREEN_WIDTH * 0.05,
        paddingLeft: SCREEN_WIDTH * 0.06,
        paddingBottom: SCREEN_HEIGHT * 0.03,
        paddingTop: SCREEN_HEIGHT * 0.015,
        width: SCREEN_WIDTH,
    },
    description: {
        height: SCREEN_HEIGHT * 0.35,
        width: SCREEN_WIDTH * 0.9,
        fontSize: RFValue(18),
        borderBottomWidth: 0.3,
        textAlign: "left",
        textAlignVertical: 'top'
    },
});
export default PostCreation;