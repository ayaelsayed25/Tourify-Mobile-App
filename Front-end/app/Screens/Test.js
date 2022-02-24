import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import {normalize} from '../util/FontNormalization';
import { AuthContext } from '../Context/AuthContext';

function Test({navigation, route}) {
    const Theme = React.useContext(ThemeContext);
    const userName = route.params.userName;
    const {signOut} = React.useContext(AuthContext);

  return (
        <View>
            <TouchableOpacity style={[styles.signInBtn, {backgroundColor: Theme.SecondaryCyan}]} onPress={()=> signOut()}>
                <Text style={styles.btnTxt}>Sign out</Text>
            </TouchableOpacity>
            <Text color="black" style={{fontSize: 20}}>{userName}</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInBtn:{
      width:"80%",
      height:50,
      alignItems: 'center',
      justifyContent:"center",
      marginBottom:"3%",
      top:"7%",
      borderRadius:50
  },
  btnTxt:{
      color:"white",
      fontSize:normalize(18),
      fontWeight:"900"
  }
});
 export default Test;