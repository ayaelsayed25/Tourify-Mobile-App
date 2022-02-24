import React, { useContext, useState, useEffect } from 'react'
import { TextInput, Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device width
import { ThemeContext } from '../../Context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { editComment, deleteComment } from '../../API/CommentApi'
import { TokenContext } from '../../Context/TokenContext';

export default function Temp(props) {   /// images  as props   
    const theme = useContext(ThemeContext);
    const [body, setBody] = useState('');
    const token = useContext(TokenContext);

    useEffect(async () => {
        console.log('ppppppppppppppppppppppppppppppppppp', props.route.params.post_id)
        let id = props.route.params.post_id
        props.navigation.navigate('postView', { post_id: id})
       
    }, []);

   

    return (
        <View >


        </View>
    );
}
