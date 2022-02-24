import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, ImageBackground, Dimensions, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { TokenContext } from '../Context/TokenContext';
import { ThemeContext } from '../Context/ThemeContext';
import CountryPicker from 'react-native-country-picker-modal';
import PickImage from '../Service/PickImage';

const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const greyColor = "#8c8c89";
import { normalize } from '../util/FontNormalization';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMapMarkerAlt, faEdit, faEllipsisH, faCamera } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { getUserProfile, updateBio, updateCountry, updatePhoto } from '../API/ProfileAPI';
import ListOfPosts from '../Components/Shared/ListOfPosts';
function Profile({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const token = useContext(TokenContext);
  const Theme = React.useContext(ThemeContext);
  const [editBio, setEditBio] = useState(false);
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState([]);

  //get request results
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("")
  const [userPosts, setUserPosts] = useState([])
  var oldBio = "";
  const onSelect = async (country) => {
    const res = await updateCountry(token, country.name);
    if (res)
      setCountry(country.name);
    else alert("Can't update country")
  }
  const handleBio = async () => {
    if (editBio) {
      const res = await updateBio(token, bio);
      if (!res) {
        alert("An error occurred Can't update biography");
        setBio(oldBio);
      }
    }
    setEditBio(!editBio)
  }
  const handlePhotoUpdate = async () => {
    const photo = await PickImage()
    res = await updatePhoto(token, photo)
    if (!res) {
      alert("An error occurred Can't update photo");
    } else {
      console.log("PPPPPPPPP")
      console.log("https://tourifyphotos.blob.core.windows.net/images/" + photo.name)
      setPhoto(photo.localUri)
    }
  }

  useEffect(async () => {
    let unmounted = false;

    const data = await getUserProfile(token);
    if (!unmounted) {
      if (data.successful) {
        //set profile info:
        setUsername(data.userInfo.name);
        setCountry(data.userInfo.country);
        setPhoto(data.userInfo.photo);
        setBio(data.userInfo.bio);
        oldBio = data.userInfo.bio;
        //set user posts
        setUserPosts(data.userPosts);
        setLoading(false);
      }
      else {
        setMessage(data.message);
      }
    }
    return () => { unmounted = true };

  }, [])

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        {message ? <Text style={{ color: greyColor, fontSize: normalize(17) }}>{message}</Text>
          : <ActivityIndicator size={50} color="#999999" animating={true} />
        }
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <ImageBackground source={{ uri: "https://i.pinimg.com/564x/92/34/ad/9234adf0b9c111cae5549d047fd6180f.jpg" }} style={styles.cover}>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          {/* <TouchableOpacity style={styles.cameraIcon}>
            <FontAwesomeIcon icon={faCamera} color={Theme.SecondaryCyan} size={15}></FontAwesomeIcon>
          </TouchableOpacity> */}
          <Image style={styles.profilePic} source={{ uri: photo }} ></Image>
          <View style={styles.userInfo}>
            <Menu style={{ marginLeft: "80%" }}>
              <MenuTrigger>
                <FontAwesomeIcon icon={faEllipsisH} color={greyColor} size={25} style={{ marginTop: "20%" }}></FontAwesomeIcon>
              </MenuTrigger>
              <MenuOptions style={{ padding: "5%" }}>
                <MenuOption onSelect={() => handlePhotoUpdate()} style={{ padding: "5%", borderBottomColor: "#ebebeb", borderBottomWidth: 2 }}>
                  <Text style={{ color: 'black', fontSize: normalize(16) }}>Select Profile Photo</Text>
                </MenuOption>
                <MenuOption style={{ padding: "5%", borderBottomColor: "#ebebeb", borderBottomWidth: 2 }}>
                  <CountryPicker {...{ onSelect, withCloseButton: true, withFilter: true }} visible={false} style={{ fontSize: 50 }} />
                  {/* <Text style={{color: 'black', fontWeight:"bold", fontSize:normalize(15)}}>Set Country</Text> */}
                </MenuOption>
                <MenuOption onSelect={() => signOut()} style={{ padding: "5%" }}>
                  <Text style={{ color: 'red', fontSize: normalize(16) }}>Sign out</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.location}>
              {country ? <FontAwesomeIcon icon={faMapMarkerAlt} color={greyColor} size={15} style={{ marginRight: 3, marginTop: 3 }}></FontAwesomeIcon> : null}
              <Text style={{ fontSize: normalize(15), color: greyColor, fontWeight: "bold" }} >{country}</Text>
            </View>
            <View style={styles.userBio}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: normalize(18), color: "black", marginBottom: "5%", marginRight: "68%" }}>About me</Text>
                <TouchableOpacity onPress={() => handleBio()}>
                  <FontAwesomeIcon icon={faEdit} color={editBio ? "#47c4ed" : greyColor} size={23}></FontAwesomeIcon>
                </TouchableOpacity>
              </View>
              {editBio ? <TextInput
                multiline
                style={[styles.bioEdit, { backgroundColor: "#ebebeb" }]}
                textAlignVertical='top'
                selectionColor={Theme.SecondaryPurple}
                placeholder="Tell us about yourself.."
                placeholderTextColor={greyColor}
                onChangeText={(txt) => { setBio(txt) }}
                value={bio} /> :
                <Text numberOfLines={5} style={styles.bio}>
                  {bio == "null" ? "" : bio}
                </Text>
              }
            </View>
            <ListOfPosts posts={userPosts} navigation={navigation} isProfile={true} />
          </View>
        </View>
        {/* <TouchableOpacity style={[styles.signInBtn, {backgroundColor: "red"}]} onPress={()=> signOut()}>
          <Text style={styles.btnTxt}>Sign out</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.23,
  },
  cover: {
    flex: 1,
    backgroundColor: "black"
  },
  content: {
    alignItems: "center",
  },
  cameraIcon: {
    position: "absolute",
    top: SCREEN_HEIGHT * -0.1,
    right: SCREEN_WIDTH * 0.2,
    backgroundColor: "grey",
    borderRadius: 150 / 2,
    height: 100,
    width: 100,
    borderRadius: 100 / 2
  },
  profilePic: {
    position: "absolute",
    height: 0.35 * SCREEN_WIDTH,
    width: 0.35 * SCREEN_WIDTH,
    borderRadius: 150 / 2,
    top: SCREEN_HEIGHT * -0.17,
    zIndex: 1
  },
  userInfo: {
    borderWidth: 10,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
    borderColor: "white",
    backgroundColor: "white",
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.99,
    height: "100%",
    marginTop: -1 * SCREEN_HEIGHT * 0.08,
    borderBottomColor: "#aeb5b0",
    borderBottomWidth: 1,
  },
  username: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: "5%"
  },
  location: {
    flexDirection: "row"
  },
  userBio: {
    textAlign: "left",
    alignItems: "flex-start",
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "flex-start",
    marginBottom: "3%"
  },
  bio: {
    color: "#616362",
    width: "100%",
    fontSize: normalize(16),
    flexWrap: "nowrap"
  },
  bioEdit: {
    width: "100%",
    color: "#616362",
    height: SCREEN_HEIGHT * 0.2,
    fontSize: normalize(16),
    borderWidth: 3,
    borderRadius: 10,
    padding: "2%",
    borderColor: "#ebebeb"
  },
  posts: {
    backgroundColor: "white",
    width: SCREEN_WIDTH * 0.99
  }
});
export default Profile;