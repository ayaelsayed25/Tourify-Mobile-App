import React, { useRef,useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Modal,TextInput,SafeAreaView, ImageBackground, RefreshControl, Dimensions, FlatList, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';
import Comment from '../PostView/Comment';
import { ThemeContext } from '../../Context/ThemeContext';
import { TokenContext } from '../../Context/TokenContext';
import { LinearGradient } from 'expo-linear-gradient';
import { createComment } from '../../API/CommentApi';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { getFeedPosts, getPostView } from '../../API/PostListAPI'
import IPAdress from '../../API/IPAdress';
import ImageViewer from '../Shared/ImageViewer';
import PostDetails from '../PostView/PostDetails'
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device widthmport { ThemeContext } from '../../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from "@react-navigation/native";

import LikeList from './LikeList' 
import EditComment from './EditComment';

export default function PostComp(props) {
    const isFocused = useIsFocused();  
   //  props = props.route.params.props
    /// images  as props   
    const [commentList, setComments] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [liked , setLiked] = useState(false);
    const [view, setView] = useState(1);

    const theme = useContext(ThemeContext);
    const token = useContext(TokenContext);
    const [text, setText] = useState('');
   const [f , setF] = useState(false);
    const ref = useRef();
    const { likeFlag,  post_id, email, body, rating, userName, userPhoto, photos, deletePostFromState, created_at } = props.post;
    const [modalVisible, setModalVisible] = useState(true);
    const [modalVisible2, setModalVisible2] = useState(false);

    const [cc, setCC] = useState(null);


    
    // const fetchData = async () => {
    //     setLoading(true);

    //     console.log(IPAdress ,token)

    //     // fetch(`http://192.168.1.3:8000/posts/postView?id=3`,
    //     //     {
    //     //         method: "GET",
    //     //         headers: {
    //     //             'Accept': 'application/json',
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': token
    //     //         },
    //     //     }

    //     // )
    //     //     .then((response) => response.json())
    //     //     .then((data) => {
    //     //       // console.log(data)
    //     //         setLoading(false);
    //     //     })
    //     //     .catch((error) => {
    //     //         console.log(error);
    //     //         setLoading(false);
    //     //     });


    //     const resp = await fetch(IPAdress + "posts/feed",
    //         {
    //             method: "GET",
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': token
    //             },
    //         }).catch((err) => {console.log(err) });


    //     console.log(resp.json() );
    // };
    console.log("FFFfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", props)
     const modalView =()=>{
         setModalVisible(true)
     }
    const unsubscribe = props.navigation.addListener('focus', () => {
        console.log('focussed');
        setModalVisible(true)
    });
    useEffect( () => {
        console.log("kkkkkkkkkkkkkkk",props.comments)
        setComments(props.comments)
        if (likeFlag)
            setLiked(true)
        
        // if (isFocused) {
        //     modalView()
        //     console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
           
        // }

        console.log("FFFfwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", props.comments)
    }, [  ]);

    const updateCommentBody = (comment)=>{
        let l = [...commentList] ;
        l.forEach(co =>{
            if(co.comment_id == comment.comment_id)
                co.body = comment.body
        })
        setComments(l)
      
    }
    const commentOnPost = () => {
        ref.current.focus()
        console.log("dd lni")

    }
    const likePost =async () => {
        try {
            const resp = await fetch(IPAdress + `likes/${liked?'dislike':'like'}?id=${post_id}`,
                {
                    method: `${liked?'delete': 'post'}`,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                    body:JSON.stringify({post_id:post_id})
                }).catch((err) => { console.log("eee", err); return false });
            if (resp.status !== 200) { console.log("rr", resp); return false; }
            else {
                setLiked(!liked);
                return true }
        }
        catch { () => false }
        

    }
    const viewLikes = () => {
      setView(2)
        //  setModalVisible(true)
        
      //  props.navigation.navigate('LikesList',{likes : props.likes , post_id: post_id})

    }

    const viewmain =()=>{
       setView(1)
    }

    const deleteCommentFromList = (id)=>{
        let l = [...commentList]
         l = l.filter( c => c.comment_id != id);
         setComments(l)
    }
    const Contstyles = {
        maxHeight: photos ? 1000000000000 : 0.5 * SCREEN_HEIGHT,
        paddingTop: RFValue(32),
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
       // paddingHorizontal: RFValue(12),
        //marginRight: RFValue(33),
        elevation: 5,
       }

    const fffff = async ()=>{
        let b = { post_id: post_id, body: text }

        const data = await createComment(token, b);
        console.log("inssssssssssssssssssssss" , data)
        let newComm = {
            photo : props.user?props.user.photo : userPhoto,
            name: props.user?props.user.name:userName ,
            body : text ,
            created_at :  '0m',
            comment_id: data.id || data.comment_id,
            ownerFlag : true,
           // comment_id: data.comment_id

        }
        let y =[...commentList]
        y.push(newComm)
         console.log("heywhy ",y)
        setComments(y)
        
    }
    const goBack = ()=>{
        setModalVisible(false)
        props.navigation.goBack(null);
    }
    const upComment = (comment)=>{
        setCC(comment)
        setView(3)
    }
//    let photos = null
    return (
        <View>
    { view==1?
        <Modal style={styles.maincontainer}
        
            visible={modalVisible}
            onRequestClose={() => {
               // Alert.alert("Modal has been closed.");
                props.navigation.goBack(null);
                setModalVisible(!modalVisible);
            }}
        >
            
                {/* <ScrollView  style={{flex:1}}> */}

                {/* {
                    commentList && commentList.map((item,i)=>{
                       return  <Comment key={i}  comment ={item} />
                    })

            } */}
                {/* <View style={styles.comments}>
     
        </View> */}
                {/* 
        </View> */}

                {/* </ScrollView> */}
                <FlatList
                
                
                data={commentList}
                    showsVerticalScrollIndicator={false}
                    // contentContainerStyle={{ paddingBottom: SCREEN_HEIGHT * 0.07 }}
                    // refreshControl={

                    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    // }
                        keyExtractor={(item) => item.comment_id}
                    ListHeaderComponent={() => {
                        return <View key={-1} style={Contstyles}>
                           
                            <TouchableOpacity
                            style={{
                                marginBottom:RFValue(22),
                                marginLeft:RFValue(12)
                            }}
                            onPress={() => goBack()} >
                                <FontAwesomeIcon icon={faArrowLeft} size={RFValue(18)} color={theme.SecondaryPurple} style={{ marginRight: SCREEN_WIDTH * 0.68, marginTop: SCREEN_WIDTH * 0.028 }} />
                            </TouchableOpacity>

                            <View style={styles.user}>
                                <View style={{
                                    flexDirection: 'row', justifyContent: 'center'

                                }} >
                                    <TouchableOpacity onPress={() => navigateToProfile("email")}>

                                        <ImageBackground style={{ flex: 1 }} source={{ uri: userPhoto }} style={styles.userImage} imageStyle={{
                                            borderRadius: SCREEN_WIDTH * 0.15, borderColor: theme.PrimaryColor,
                                            borderWidth: 0.25
                                        }}></ImageBackground>
                                    </TouchableOpacity>

                                    <View style={{ paddingLeft: RFValue(10), justifyContent: 'center' }}>
                                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.Text }}>{userName}</Text>

                                        {/* TODO add time stamp */}
                                        <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{created_at}</Text>
                                    </View>
                                </View>



                            </View>

                            <PostDetails  post= {props.post} />

                            <View style={{}}>
                                <SafeAreaView style={styles.postDescription}>
                                    <Text style={{ textAlign: 'left', fontSize: RFValue(12), color: theme.PrimaryColor }}>{ body}</Text>
                                </SafeAreaView>
                            </View>
                              <View style={photos && photos.length ? { height: RFValue(300), width: "100%", paddingVertical: RFValue(10) } : { height: RFValue(100), width: "100%", paddingVertical: RFValue(10) }}>
                                {photos && photos.length ?
                                    <ImageViewer images={photos}  ></ImageViewer>
                                    :
                                    null}
                            </View>  
                            <View style={styles.counts}>
                                <TouchableOpacity onPress={() => viewLikes()}>
                                    <Text numberOfLines={1} style={{ fontSize: RFValue(12),paddingHorizontal:RFValue(12), color: theme.SubText }}>{props.likes && props.likes.length?props.likes.length: 0} likes</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, alignItems: "flex-end", paddingRight: RFValue(12) }}>
                                    <Text numberOfLines={1} style={{ fontSize: RFValue(12), color: theme.SubText }}>{props.comments && props.comments.length ? props.comments.length : 0}  comments</Text>
                                </View>
                            </View>
                            <View style={styles.postFooter}>
                                <View style={styles.like}>
                                    <TouchableOpacity onPress={() => likePost()}>
                                        <AntDesign name="like2" size={22} color={liked?'blue':"grey" }/>
                                        <Text>{liked?'liked':'like'}</Text>
                                    </TouchableOpacity >
                                </View>
                                <View style={styles.com}>
                                    <TouchableOpacity onPress={() => commentOnPost()}>
                                        <EvilIcons style={{ marginLeft: RFValue(9) }} name="comment" size={26} color="grey" />
                                        <Text>comment</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>
                    }




                    }
                    renderItem={({ item }) => {
                        return (
                            <Comment key={item.comment_id} upComment={upComment} updateCommentBody={updateCommentBody} deleteCommentFromList={deleteCommentFromList} navigation ={props.navigation} key={item.comment_id} item = {item} />
                        )
                    }} />

        <View styles={styles.footer}>
                <View style={{display:'flex' , flexDirection:'row' ,padding:RFValue(5),
                paddingLeft:RFValue(7)
              , borderTopWidth: RFValue(3),
                    borderColor: 'rgba(226, 226, 226, 1)',
                    width: SCREEN_WIDTH,
                  //  margin: RFValue(3)
            
            
            }}>
                            <ImageBackground style={{ flex: 1 }} source={{ uri: props.user ? props.user.photo : userPhoto }} style={styles.commentIMG} imageStyle={{
                    borderRadius: SCREEN_WIDTH * 0.1, borderColor: theme.PrimaryColor,
                    borderWidth: 0.15
                }}></ImageBackground>
                <TextInput
                  multiline
                  
                        ref={ref}
                    style={{marginHorizontal:RFValue(5), height: 40  ,width:0.67* SCREEN_WIDTH 
                    ,borderWidth:RFValue(1)
                   , borderRadius:RFValue(12)
                    , padding:RFValue(5),
                        borderColor:'rgba(226, 226, 226, 0.5)'
                    }}
                    placeholder="write a comment ..."
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                    
                />
                    <View style={{  alignSelf: 'flex-end' }}>
                    <TouchableOpacity  onPress={() => fffff()}>
                        <LinearGradient
                            colors={[theme.SecondaryCyan, theme.SecondaryPurple]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}>

                            <Text style={{ color: "white" }}>  post</Text>

                        </LinearGradient>
                    </TouchableOpacity>
                        </View>
                </View>
                    </View>

          <Modal
          
                visible={modalVisible2}
                onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                   // props.navigation.goBack(null);
                    setModalVisible2(!modalVisible2);
                }}
          >
              
          </Modal>
               
        </Modal >

            :null}

        {
            view==2?
                    <LikeList viewmain={viewmain} likes={props.likes} post_id={post_id} > </LikeList>:null
        }

            {
                view ==3 ?
                    <EditComment viewmain={viewmain} comment={cc} updateCommentBody={updateCommentBody}  />  : null
            }



        </View>



    );
}

const styles = StyleSheet.create({
    footer:{
        display:'flex',
        flexDirection:'row',
   position : 'absolute',
   width:SCREEN_WIDTH,
   height:100,
   top:0,
   bottom:100,
   zIndex:100000000000000000000000,
   elevation:5,
   marginTop:-1222

    
    },
    commentIMG:{
        width: SCREEN_WIDTH * 0.1,
        height: SCREEN_WIDTH * 0.1,
    },
    maincontainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        paddingVertical: 42,
        position: 'absolute' ,
        zIndex:100000,
        marginTop:-30,
        height: SCREEN_HEIGHT + 0.1 * SCREEN_HEIGHT,
        elevation:5
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    c: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row'

    },
    extra: {
        alignItems: 'center',
        flex: 1,
        margin: 2,
        backgroundColor: "#696969"
    },
    num: {
        position: 'absolute',
        top: '40%',
        fontSize: 29,
        fontWeight: 'bold',
        color: "#fff"
    },
    container: {
        paddingTop: RFValue(22),
        backgroundColor: 'white',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: RFValue(0),
        marginRight: RFValue(0),
        elevation: 5,
    },

    user: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: RFValue(1),
        width: SCREEN_WIDTH,
        paddingHorizontal: RFValue(10),
    },
    userImage: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
    },
    postDescription: {
        flexDirection: 'row',
        paddingTop: RFValue(8),
        width: SCREEN_WIDTH * 0.98,
        paddingLeft: RFValue(10),
        paddingRight: RFValue(10)
    },
    postFooter: {
        display: 'flex',
        flexDirection: 'row'
    },
    like: {
        flex: 1,
        borderTopWidth: RFValue(1),
        borderBottomWidth: RFValue(3),
        borderWidth: RFValue(1),
        borderColor: 'rgba(226, 226, 226, 1)',
        alignItems: 'center',
        paddingVertical: RFValue(7),
        borderRightWidth: 0,
        borderLeftWidth: 0,
        display: 'flex',
        marginBottom: RFValue(12)
    },
    com: {
        flex: 1,
        borderTopWidth: RFValue(1),
        borderBottomWidth: RFValue(3),

        borderColor: 'rgba(226, 226, 226, 1)',
        alignItems: 'center',
        paddingVertical: RFValue(7),
        marginBottom:RFValue(12)


    },
    counts: {
        display: "flex",
        flexDirection: "row",
        alignContent: "space-between",
        justifyContent: 'space-between',
        margin: RFValue(6),
        elevation:2
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_HEIGHT * 0.038,
        borderRadius: SCREEN_WIDTH * 0.1,
        paddingRight:RFValue(5),
        marginBottom:RFValue(2)
    },

});