import * as ImagePicker from 'expo-image-picker';

export default openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true });

    if (pickerResult.cancelled === true) {
        return;
    }
    var imgName = pickerResult.uri.replace(/^.*[\\\/]/, '');

    photo = {
        name: imgName,
        type: pickerResult.type,
        base64: pickerResult.base64,
        localUri: pickerResult.uri
    };
    console.log(photo)
    return photo
}
