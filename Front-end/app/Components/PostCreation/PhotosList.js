import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image, FlatList } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import {Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { faTimes, faCaretDown, faCaretUp  } from '@fortawesome/free-solid-svg-icons';
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function PhotosList({ photos, setPhotos, deletedPhotos, setDeletedPhotos }) {
    const theme = useContext(ThemeContext);
    const [state, setState] = useState({refresh:true})

    const deletePhoto = (index) => {
        const photo = photos[index]
        photos.splice(index, 1)
        setPhotos(photos)
        if(!("base64" in photo))
        {
            deletedPhotos.push(photo)
            setDeletedPhotos(deletedPhotos)
        }
        setState({ refresh: ! state.refresh })
    }

    return (
        <View>
        {photos.length > 0 && 
            <Collapse>
            <CollapseHeader>
                <View style={{ flexDirection:'row' }}>
                    <FontAwesomeIcon icon={faCaretDown} size={ RFValue(20) }  color={theme.text} style={{marginTop:SCREEN_WIDTH*0.005}}/>   
                    <Text style={{fontSize:RFValue(16), color:theme.Text, textAlign:"left", fontWeight:'bold'}}>  Photos</Text>
                </View>
            </CollapseHeader>
            <CollapseBody >
                <FlatList
                    data={photos}
                    extraData={state.refresh}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index}) => {
                        return(
                            <View style={{flexDirection:"row",alignItems:"flex-start"}}>
                                <Image
                                    source= {{uri: item.photo}} 
                                    style={styles.avatar}
                                    resizeMethod="scale"
                                />   
                                <TouchableOpacity style={[{backgroundColor: theme.SecondaryCyan},styles.upload]} onPress={() => deletePhoto(index)}>
                                    <FontAwesomeIcon icon={faTimes} size={ RFValue(8) }  color="white" ></FontAwesomeIcon>
                                </TouchableOpacity>
                            </View>                    
                        )
                    }}
                />  
            </CollapseBody>
            </Collapse>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    avatar:{
        width: SCREEN_WIDTH*0.2,
        height: SCREEN_WIDTH*0.2,
        borderWidth: 2,
        marginTop:SCREEN_WIDTH*0.02,
        marginLeft:SCREEN_WIDTH*0.02
    },
    upload: {
        width: SCREEN_WIDTH*0.05,
        height: SCREEN_WIDTH*0.05,
        borderRadius: SCREEN_WIDTH*0.05,
        alignItems: "center",
        justifyContent:"center",
        marginLeft:-SCREEN_WIDTH*0.02,
        flexDirection:"row"
    },
})
export default PhotosList;