import React, { useContext, useState, useEffect } from 'react';
import { RefreshControl, StyleSheet, Dimensions, FlatList, SafeAreaView, View } from 'react-native';
import PostListComponent from './PostListComponent';
import {getFeedPosts, getUserPosts} from '../../API/PostListAPI';
import { TokenContext } from '../../Context/TokenContext';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
import { showMessage, hideMessage } from "react-native-flash-message";
import { ThemeContext } from '../../Context/ThemeContext';

function ListOfPosts(props) {
  const Theme = React.useContext(ThemeContext);
  const token = React.useContext(TokenContext);
  const [posts, setPosts] = useState(props.posts);
  const isProfile = props.isProfile;
  const [refreshing, setRefreshing] = React.useState(false);
  const deletePostFromState = (postID) => {  // should be transfered to  profile 
      let newData = [...posts];
      newData = newData.filter(function (el) { return el.post_id != postID; });
      setPosts(newData);
  }
  const showErrorMessage = ()=>{
    showMessage({
      message: "",
      description: "Check your network..",
      type: "default",
      backgroundColor:Theme.SecondaryCyan, // background color
      color: "#606060", 
    });
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if(isProfile)
    {
      const data = await getUserPosts(token);
      console.log("lengthhhhh " + data);
      if(data !== false) setPosts(data);
      else{
        showErrorMessage();
      }
    }
    else{
      const data = await getFeedPosts(token);
      if(data !== false) setPosts(data);
      else{
        showErrorMessage();
      }
    }
    setRefreshing(false)

  }, []);
  return (
      <SafeAreaView style={{flex:1}}>
        <FlatList
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: SCREEN_HEIGHT * 0.07}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) =>item.post_id}
          renderItem={({ item }) => {
            item.deletePostFromState = deletePostFromState;
            return (
              <PostListComponent user ={props.user} item={item} navigation={props.navigation} isProfile={isProfile}/>
            )
          }} />
      </SafeAreaView>
  );
}

export default ListOfPosts;
