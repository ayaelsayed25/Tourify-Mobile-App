import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Picker, Dimensions, ActivityIndicator } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { normalize } from '../util/FontNormalization';
import { AuthContext } from '../Context/AuthContext';
import CountryPicker from 'react-native-country-picker-modal';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import * as Google from 'expo-google-app-auth';
import { LinearGradient } from 'expo-linear-gradient';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
function Registeration({ navigation, route }) {
  const [isSignUp, setIsSignUp] = useState(route.params.isSignUp);
  const { signIn, signUp } = React.useContext(AuthContext);
  const Theme = React.useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState(null);
  const [message, setMessage] = useState("");
  const [passMessage, setPassMessage] = useState("");
  const [passColor, setPassColor] = useState("red");
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJS8__K2f9ts2zYtS3Wo_O_GI9o263MQoiLXxrV-awEMCNHf7k_IFWDKIWkKGxHQtahfM&usqp=CAU");

  const handleSignIn = async (googleBool, googleEmail) => {
    if(googleBool)
    {
      setLoading(true);
      signIn(googleEmail, null, googleBool).then((res) => {
        setMessage(res);
        setLoading(false);
      });
    }
    else if (email && password) {
      setLoading(true);
      signIn(email, password, googleBool).then((res) => {
        setMessage(res);
        setLoading(false);
      });
    }
    else if (!email) {
      setMessage("Enter Email!")
    }
    else {
      setMessage("Enter Password!")
    }

  }
  const handleSignUp = async (googleBool, googleName, googleEmail, googlePhoto) => {
    let checkPass = checkPassword(password);
    let checkTheEmail = checkEmail(email);
    if(googleBool)
    {
      setLoading(true);
      signUp(googleEmail, googleName, null, null, googlePhoto, googleBool).then((res) => {
        setMessage(res);
        setLoading(false);
      });
    }
    else if (checkPass && checkTheEmail) {
      setLoading(true);
      signUp(email, name, password, country, photo, googleBool).then((res) => {
        setMessage(res);
        setLoading(false);
      });
    } else if (!checkPass) {
      setMessage("Choose a strong password and try again")
    }
    else {
      setMessage("Invalid Email!")
    }
  }

  const onSelect = (country) => {
    setCountry(country.name);
  }
  const handleGoogleSignIn = () => {
    const config = {
      iosClientId: "568488060081-cdjfp9cp382ed7gbkhmbekda4u9105se.apps.googleusercontent.com",
      androidClientId: "568488060081-sa2lakshiboq3ko58j759cd1jaioja9i.apps.googleusercontent.com",
      scopes: ["profile", "email"]
    }
    setLoading(true);
    Google.logInAsync(config)
      .then((result) => {
        const { type, user } = result;
        if (type == "success") {
          isSignUp ? handleSignUp(true, user.name, user.email, user.photoUrl) : handleSignIn(true, user.email);
        }
        else {
          setMessage("An error occurred");
        }
        setLoading(false);
      })
      .catch((error) => {
        setMessage("An error occured, check your network");
      });
  }

  const changeToSignUpIn = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCountry(null);
    setMessage("");
    setHidePass(true);
    setPassMessage("");
    setIsSignUp(!isSignUp);
  }
  const checkEmail = (Email) => {
    const bool = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(Email.toLowerCase());
    return bool;
  }
  const checkPassword = (pass) => {
    if(pass.length  == 0)
    {
      setPassMessage("");
      return false;
    }
    else if (pass.length < 8 && pass.length > 0) {
      setPassColor("red");
      setPassMessage("Weak password, should be more than 8 letters");
      return false;
    }
    else if (pass.length > 100) {
      setPassColor("red");
      setPassMessage("Password should be less than 100 letters");
      return false;
    }
    else if (pass.toUpperCase() === pass || pass.toLowerCase() === pass) {
      setPassColor("red");
      setPassMessage("Weak password, should contain lowercase and uppercase letters");
      return false;
    }
    else if (! /^(?=.*[0-9])/.test(pass)) {
      setPassColor("red");
      setPassMessage("Weak password, should contain at least one number");
      return false;
    }
    else if (!/^(?=.*[!@#$%^&*])/.test(pass)) {
      setPassColor("red");
      setPassMessage("Weak password, should contain at least one special character");
      return false;
    }
    else {
      setPassColor("#37eb34");
      setPassMessage("Strong password");
      return true;
    }
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: Theme.Logo }} style={styles.logo} />
      {isSignUp ? <View style={styles.inputBox}>
        <TextInput style={styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Name" placeholderTextColor={Theme.subText} onChangeText={text => setName(text)} value={name}></TextInput>
      </View> : null}
      <View style={styles.inputBox}>
        <TextInput style={styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Email" placeholderTextColor={Theme.subText} onChangeText={text => setEmail(text)} value={email}></TextInput>
      </View>
      <View style={styles.passWrap}>
        <View style={styles.inputBox}>
          <TextInput underlineColorAndroid="transparent" secureTextEntry={hidePass} style={styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Password" placeholderTextColor={Theme.subText} onChangeText={(text) => { setPassword(text); isSignUp ? checkPassword(text) : null }} value={password}></TextInput>
        </View>
        <TouchableOpacity style={styles.passIcon} onPress={() => { setHidePass(!hidePass) }}>
          {
            hidePass ? <FontAwesomeIcon icon={faEyeSlash} color='#525252' size={25} />
              : <FontAwesomeIcon icon={faEye} color='#525252' size={25} />
          }
        </TouchableOpacity>
      </View>
      {
        isSignUp ?
          <Text style={[styles.passText, { color: passColor }]}>{passMessage}</Text>
          : null
      }
      {isSignUp ?
        <View style={[styles.countryPicker, { backgroundColor: '#ededed' }]}>
          <CountryPicker {...{ onSelect, withCloseButton: true, withFilter: true }} visible={false} style={{ fontSize: 50 }} />
          <Text numberOfLines={1} style={[styles.country, { color: Theme.SecondaryCyan }]}>{country}</Text>
        </View>
        : null}
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={styles.touchable} onPress={() => { isSignUp ? handleSignUp(false) : handleSignIn(false) }}>
        <LinearGradient
          colors={[Theme.SecondaryCyan, Theme.SecondaryPurple]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.signInBtn}>
          {loading ? <ActivityIndicator size="large" color="#f2f2f2" />
            : <Text style={styles.btnTxt}>{isSignUp ? "Sign Up" : "Sign In"}</Text>}
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleBtn} onPress={() => handleGoogleSignIn()}>
        {loading ? <ActivityIndicator size="large" color="#f2f2f2" style={{ marginRight: "10%" }} /> :
          <Text style={styles.btnTxtgoogle}>{isSignUp ? "Sign Up With Google" : "Sign In With Google"}</Text>}
        {loading ? null : <Image source={{ uri: 'https://pngimg.com/uploads/google/google_PNG19635.png' }} style={styles.googleLogo} />}
      </TouchableOpacity>
      {isSignUp ? <View style={styles.signUpTexts}>
        <Text style={styles.signTxt}>Already have an account? </Text>
        <Text onPress={() => changeToSignUpIn()} style={{ color: Theme.SecondaryCyan, textDecorationLine: 'underline', fontSize: normalize(17) }}>Sign In here</Text>
      </View> :
        <View style={styles.signUpTexts}>
          <Text style={styles.signTxt}>Don't have an account yet? </Text>
          <Text onPress={() => changeToSignUpIn()} style={{ color: Theme.SecondaryCyan, textDecorationLine: 'underline', fontSize: normalize(17) }}>Sign up here</Text>
        </View>}
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
  inputBox: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.065,
    justifyContent: "center",
    padding: "7%",
    marginBottom: "4%",
    backgroundColor: '#ededed',
    borderRadius: 50,
    bottom: "2%"
  },
  inputText: {
    height: SCREEN_HEIGHT * 0.1,
    color: "#636363",
    fontSize: normalize(18)
  },
  logo: {
    width: 220,
    height: 120,
    bottom: "5%",
  },
  signInBtn: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 50
  },
  btnTxt: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: "bold"
  },
  googleBtn: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.065,
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "black",
    flexDirection: "row",
    paddingLeft: "6%",
    top: "9%",
    borderRadius: 50
  },
  btnTxtgoogle: {
    color: "white",
    fontSize: normalize(18),
    fontWeight: "bold"
  },
  googleLogo: {
    width: "15%",
    height: "80%"
  },
  signUpTexts: {
    top: "14%",
    width: "75%",
    flexDirection: "row",
  },
  signTxt: {
    color: "#636363",
    fontSize: normalize(17)
  },
  countryPicker: {
    width: SCREEN_WIDTH * 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: SCREEN_HEIGHT * 0.08,
  },
  country: {
    fontSize: normalize(19)
  },
  message: {
    fontSize: normalize(14),
    color: "#fc0339",
    top: "2%",
    width: "40%",
    textAlign: "center",
    fontWeight: "bold"
  },
  passText: {
    fontSize: normalize(13),
    width: "70%",
    bottom: "3%"

  },
  passWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  passIcon: {
    position: "absolute",
    top: "10%",
    left: "65%"
  },
  touchable: {
    marginBottom: "3%",
    top: "3%",
  }

});
export default Registeration;