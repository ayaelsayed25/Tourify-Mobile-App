import React, { useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device width
import { ThemeContext } from '../../Context/ThemeContext';
import { editComment, deleteComment } from '../../API/CommentApi'
import { TokenContext } from '../../Context/TokenContext';

export default function Comment(props) {   /// images  as props   
    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);

    const DeleteComment = async()=>{
        console.log("ffff", props.item)
        const res = await deleteComment(token, props.item.comment_id)
        //console.log(res)
        if(!res)
            console.log("error")

        console.log("done")
       props.deleteCommentFromList(props.item.comment_id)
    }


    const editComment = () => {
        props.upComment(props.item)
       // props.navigation.navigate('EditComment', { comment: props.item, updateCommentBody: props.updateCommentBody })
    }
 
    return (
        <View style={styles.container}>
            <View style={styles.uImg}>
                <ImageBackground style={{ flex: 1 }} source={{ uri: props.item.photo }} 
            style={styles.userImage}
            imageStyle={{
                borderRadius: SCREEN_WIDTH * 0.15,
                borderWidth: 0.25
            }}>
           
            </ImageBackground>
         </View>
           <View>
            <View style={styles.commentBox}>
                <View style={{ paddingLeft: RFValue(1), justifyContent: 'center' , marginBottom:3 }}>
                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text, fontWeight: 'bold' }}>{props.item.name}</Text>

                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{props.item.created_at}</Text>
                </View>
                <View>
                <Text>{props.item.body}</Text>
                </View>
           </View>
                {props.item.ownerFlag?
            <View style={styles.commentActions} >
                    <TouchableOpacity style={styles.actionLink} onPress={() => editComment()}>
                        <View style={styles.actionLink}>
                            <Text style={{ fontWeight:'bold', color: 'rgba( 5, 136, 188,1)' }}>Edit </Text>
                        </View>
                        
                    </TouchableOpacity>
                    <View>
                        <Text>
                            |
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => DeleteComment()}>
                        <View>
                            <Text style={{ fontWeight: 'bold', color: 'rgba( 5, 136, 188,1)' }}> Delete </Text>
                        </View>
                    </TouchableOpacity>
               
           </View>
           :null}
        </View>
           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width : SCREEN_WIDTH,
       
        alignItems: 'flex-start',
        backgroundColor:'white'
        
    },
    userImage:{
        
        height :30,
        width:30,
        marginTop:12
    },
    commentBox :{
        display:'flex',
        flexDirection: 'column',
        width: 0.8*SCREEN_WIDTH,
        marginLeft:9,
        backgroundColor: 'rgba(226, 226, 226, 1)',
        padding:20,
        paddingTop:10,
        borderBottomEndRadius:12,
        borderBottomLeftRadius:12,
        borderTopRightRadius:12 


      // flex:1,
    }
    ,
    commentActions:{
        display : 'flex',
        flexDirection: 'row',
        marginLeft:20,
        marginBottom:RFValue(5)

    },

    actionLink:{
        fontWeight: 'bold',
        color:'rgba( 5, 136, 188,1)',

    }
  
});