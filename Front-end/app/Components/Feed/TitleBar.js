import React from 'react';
import { Dimensions, SafeAreaView, Text, View,  StyleSheet, Image, TouchableOpacity } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device height
import { ThemeContext } from '../../Context/ThemeContext';
function TitleBar(props) {
    const Theme = React.useContext(ThemeContext);
    return (
      <View style={{width:"100%", height:"13%", flexDirection:"row", alignItems:"flex-start",paddingTop:"10%"}}>
        <Image source={{ uri: Theme.Logo }} style={styles.logo} />
        <TouchableOpacity onPress={()=>{props.navigation.navigate("Profile")}} style={{flex:1, height: "80%",}}><Image source={{ uri: props.photo}} style={styles.userPhoto} /></TouchableOpacity>
        
      </View>
  );
}
const styles = StyleSheet.create({
    logo: {
        width: "28%",
        height: "80%",
        marginLeft: "5%",
        marginRight: SCREEN_WIDTH*0.49
    },
    userPhoto:{
        width: "75%",
        height: "100%",
        borderRadius: 50,
        borderWidth: 2,
        borderColor : "#49DADB",
    }
})
export default TitleBar;
