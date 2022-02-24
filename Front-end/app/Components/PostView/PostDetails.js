import React, { useContext, useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, TouchableOpacity, ScrollView, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import ImageView from "react-native-image-viewing";
import { RFValue } from 'react-native-responsive-fontsize';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT = Dimensions.get('screen').height; // device width
import { ThemeContext } from '../../Context/ThemeContext';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { color } from 'react-native-elements/dist/helpers';

export default function PostDetails(props) {   /// images  as props   
    const theme = useContext(ThemeContext);
    
    const {organisation,rate, budget, currency, duration, latitude, longitude, tags } = props.post;
   const [rateList , setRate ] =useState([])
   
    let tagsL= tags
    const tag = {

        borderRadius: 12,
        padding: RFValue(5),
        paddingHorizontal: RFValue(8),
        margin: RFValue(2),
        backgroundColor: theme.SecondaryPurple,
        color:'white'


    };
    useEffect(() => {
        let l =[]
        let r =rate
       for(var i=0; i<5; i++){
         if(r>0)
            l.push(1)
         else
            l.push(0)
        r--;
       }
       setRate(l)
    }, []);


    return (
        <View style={styles.container}>
            {latitude && longitude ?
            <View style={styles.attr}>
                    <Entypo style={{ marginRight: RFValue(12) }} name="location" size={24} color={theme.SecondaryPurple} />
                <Text> {longitude} , {latitude}</Text>
            </View>
            :null}
            {rate?
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  
                   {
                       rateList.map(r=>{
                          if(r==1)
                              return <AntDesign name="star" size={24} color="orange" />
                          else 
                             return  <AntDesign name="staro" size={24} color="black" />
                       })
                   }
                   
                   
            </View>
                

                : null

            }

            {budget?
            <View style={styles.attr}>
                    <FontAwesome style={{ marginRight: RFValue(12) }} name="money" size={24} color={theme.SecondaryPurple} />
                <Text> {budget} {currency}</Text>
            </View>
            :null}
             
             {duration?
            <View style={styles.attr}>
                    <AntDesign style={{ marginRight: RFValue(12) }} name="calendar" size={24} color={theme.SecondaryPurple} />
                <Text> {duration} days</Text>
            </View>
            :null}
            {organisation ?
                <View style={styles.attr}>
                    <FontAwesome style={{ marginRight: RFValue(12) }} name="building-o" size={24} color={theme.SecondaryPurple}/>
                    <Text> {organisation} </Text>
                </View>
                : null}
            
            
            {tagsL?
            
            <View style={styles.tagList}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={true} >

            { tagsL.map( (t,i) =>{
                return <View key={i} style={tag}>
                    <Text style={{ color: 'white'}}>{t}</Text>
                   
                </View>
            })}

            </ScrollView>
        
          </View>
          : null
        }
 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal:10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,

        alignItems: 'flex-start',
        backgroundColor: 'white'

    },
    attr:{
    padding:RFValue(5),
    display : 'flex' ,
    flexDirection:"row"
    },

   
    tagList:{
        display:'flex',
        flexDirection:'row',
        //flex:'wrap'
    }


});