import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faImage, } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function ImageSharing({setPhotos, photos}) {
    const theme = useContext(ThemeContext);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync({base64:true});
    
        if (pickerResult.cancelled === true) {
            return;
        }
        var imgName = pickerResult.uri.replace(/^.*[\\\/]/, '');

        var photo = { 
            name: imgName, 
            type: pickerResult.type, 
            base64: pickerResult.base64,
            photo:pickerResult.uri
        }
        setPhotos(photos.concat(photo));
    };
  
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                <FontAwesomeIcon icon={faImage} size={ SCREEN_WIDTH*0.075 }  color={theme.SecondaryCyan}  />
            </TouchableOpacity>
        </SafeAreaView>
        
    );
}
const styles = StyleSheet.create({
    button:{
        backgroundColor:"black"
    },
    container: {
        alignItems: 'center',
        justifyContent: "center",
        width:RFValue(SCREEN_WIDTH*0.15),
        marginLeft:SCREEN_WIDTH*0.3,
        flexDirection:"row",
        height:RFValue(40),
        borderRadius: RFValue(40),
    },
  });
export default ImageSharing;