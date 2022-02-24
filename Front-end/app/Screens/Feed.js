import React, { useContext, useState, useEffect } from 'react';
import {StyleSheet, SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../Context/TokenContext';
import ListOfPosts from '../Components/Shared/ListOfPosts';
import {getFeedPosts} from '../API/PostListAPI';
import { normalize } from '../util/FontNormalization';
import {getUserPhoto} from '../API/ProfileAPI';
import TitleBar from '../Components/Feed/TitleBar';
import TagsBar from '../Components/Feed/TagsBar';
function Feed({navigation}) {
  const token = useContext(TokenContext);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState(null);
  const [filterObj, setFilterObj] = useState(null)
  const [user , setUser] = useState({})
  useEffect(async () => {
    const data = await getFeedPosts(token, filterObj);
    const userData = await getUserPhoto(token);
    if(data !== false && userData !== false)
    {
      setPosts(data);
      setPhoto(userData.photo);
      setName(userData.name)
      setLoading(false);
      setUser(userData)
    }
    else
      setMessage("An error occurred, check your network..");
  }, []);
  useEffect(async ()=>{
    if(filterObj)
    {
      setMessage("");
      setPosts(null)
      const data = await getFeedPosts(token, filterObj);
      if(data !== false)
      {
        setPosts(data);
      }
      else
      {
        setMessage("An error occurred, check your network..");
      }
    }
  }, [filterObj])

  if(loading)
  {
    return(
      <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
      {message? <Text style={{color:"#999999", fontSize:normalize(17)}}>{message}</Text>
      :<ActivityIndicator size={50} color="#999999" animating={true} />
      }
      </View>
    )
  }else{
    return (
        <SafeAreaView style={styles.container}>
        {photo?<TitleBar photo = {photo} navigation={navigation} style={styles.titleBar}></TitleBar> :null}
        <TagsBar setFilterObj = {setFilterObj} filterObj= {filterObj} name = {name}></TagsBar>
        {posts? <ListOfPosts user ={user} posts={posts} isProfile ={false}  navigation={navigation}></ListOfPosts> : 
        message?
        <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
         <Text style={{color:"#999999", fontSize:normalize(17)}}>{message}</Text>
         </View>
          :
          <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
           <ActivityIndicator size={50} color="#999999" animating={true} />
           </View>}
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: RFValue(50)
  }

});
export default Feed;
