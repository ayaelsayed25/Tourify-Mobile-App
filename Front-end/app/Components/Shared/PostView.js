import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, FlatList, SafeAreaView, View, ActivityIndicator, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { TokenContext } from '../../Context/TokenContext';
import PostComp from '../PostView/PostComp';
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device height
const WINDOW_HEIGHT = Dimensions.get('window').height;
import { getPostView, getFeedPosts } from '../../API/PostListAPI';
import { normalize } from '../../util/FontNormalization';

function PostView(props) {
    const navigation = props.navigation
    const token = useContext(TokenContext);
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [comments, setComm] = useState(null);
    const [likes, setLikes] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        const data = await getPostView(token, props.route.params.post_id);
        setUser(props.route.params.user)
        console.log("jjjjjjjjjjj ", props.route.params.post_id)
        if (data !== false) {
            setPosts(data.post);
            setComm(data.comments)
            setLikes(data.likes)
            console.log(data)

            setLoading(false);
        }
        else
            setMessage("An error occurred, check your network..");
    }, []);

    if (loading) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                {message ? <Text style={{ color: "#999999", fontSize: normalize(17) }}>{message}</Text>
                    : <ActivityIndicator size={50} color="#999999" animating={true} />
                }
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                {posts ? <PostComp user={user} navigation={navigation} comments={comments} likes={likes} post={posts} isProfile={false}></PostComp> : null}

                
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
        marginVertical: RFValue(50)
    }
});
export default PostView;
