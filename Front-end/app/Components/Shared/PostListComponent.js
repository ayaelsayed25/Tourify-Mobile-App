import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Dimensions, ImageBackground, SafeAreaView, Alert } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV, faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { ThemeContext } from '../../Context/ThemeContext';
import ImageViewer from './ImageViewer';
import { deletePost } from '../../API/PostDeletion'
import { TokenContext } from '../../Context/TokenContext';
import baseUrl from "../../API/IPAdress";

const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function navigateToProfile(userId) {

}



function PostListComponent(props) {

    const theme = useContext(ThemeContext);
    const { post_id, email, body, rating, userName, userPhoto, photos, deletePostFromState, created_at, number_of_likes, number_of_comments } = props.item;
    const isProfile = props.isProfile;
    const token = useContext(TokenContext);

    function navigateToPost() {
        console.log(post_id)
        props.navigation.navigate('postView', { post_id: post_id , user :props.user})
    }

    const deleteAlert = (post_id) =>
        Alert.alert(
            "Delete post",
            "are you sure?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed", token),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        fetch(baseUrl + `posts/delete?id=${post_id}`, {
                            method: 'DELETE',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                authorization: token,

                            },
                        }).then(r=>r.json()).then((data) => {
                            if(data.error)
                                alert('error ocuured', data.msg )
                               
                            deletePostFromState(post_id)
                        })
                            .catch(e => {
                                console.log(e)
                                
                            })

                    }
                }
            ]
        );
    return (

        <View style={styles.container}>

            <View style={styles.user}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center'

                }} >
                    <View style={{flexDirection: "row"}}>
                        <TouchableOpacity onPress={() => navigateToProfile(email)}>

                            <ImageBackground style={{ flex: 1 }} source={{ uri: userPhoto }} style={styles.userImage} imageStyle={{
                                borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                                borderWidth: 0.25
                            }}></ImageBackground>
                        </TouchableOpacity>
                        
                        <View style={{ paddingLeft: RFValue(10), justifyContent: 'center', marginRight:SCREEN_WIDTH*0.3 }}>
                            <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text }}>{userName}</Text>

                            {/* TODO add time stamp */}
                            <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{created_at}</Text>
                        </View>
                        <View style={styles.likes}>
                            <FontAwesomeIcon icon={faHeart} color={"grey"} size={18}></FontAwesomeIcon>
                            <Text>{number_of_likes}</Text>
                        </View>
                        <View style={styles.likes}>
                            <FontAwesomeIcon icon={faComment} color={"grey"} size={18}></FontAwesomeIcon>
                            <Text>{number_of_comments}</Text>
                        </View>
                    </View>
                </View>
                {isProfile?
                <View style={{ justifyContent: 'center' }} >

                    <Menu>
                        <MenuTrigger>
                            <View style={{ paddingHorizontal: RFValue(20), paddingVertical: RFValue(10) }} >
                                <FontAwesomeIcon icon={faEllipsisV} size={RFValue(15)} color={theme.SubText} ></FontAwesomeIcon>

                            </View>

                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ marginTop: RFValue(30) }}>
                            <MenuOption onSelect={() => props.navigation.navigate("PostCreation", { edit:true, postId:post_id})} text='Edit Post' />
                            <MenuOption onSelect={() => deleteAlert(post_id)} >
                                <Text style={{ color: 'red' }}>Delete Post</Text>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>

                </View>
                : null}


            </View>


            <TouchableOpacity onPress={() => navigateToPost(post_id)}>
                <SafeAreaView style={styles.postDescription}>
                    <Text style={{ textAlign: 'left', fontSize: RFValue(12), color: theme.PrimaryColor }}>{ }{body}</Text>
                </SafeAreaView>
            </TouchableOpacity>
            <View style={photos && photos.length ? { height: RFValue(300), width: "100%", paddingVertical: RFValue(10) } : { height: RFValue(100), width: "100%", paddingVertical: RFValue(10) }}>
                {photos && photos.length ?
                    <ImageViewer images={photos}  ></ImageViewer>
                    :
                    null}
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: RFValue(10),
        paddingLeft: RFValue(10),
        elevation: 5
    },

    user: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(10),
        width: SCREEN_WIDTH,
        paddingHorizontal: RFValue(10)
    },
    userImage: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
    },
    postDescription: {
        flexDirection: 'row',
        paddingTop: RFValue(8),
        width: SCREEN_WIDTH * 0.98,
        paddingLeft: RFValue(10)
    },
    likes:
    {
        flexDirection:"row",
        marginTop:"3%",
        padding:"2%"
    }
});
export default PostListComponent;