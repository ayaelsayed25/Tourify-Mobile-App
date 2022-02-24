import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Dimensions, Text } from 'react-native';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

function TagsList({setTags, tags, setDeletedTags, deletedTags, edit, addedTags, setaddedTags}) {
    const theme = useContext(ThemeContext);
    const [isDialogVisible, setVisible] = useState(false);
    const [tagsList, setTagsList] = useState([ "Historical", "Beach", "Fun", "Romantic", "Relaxation",
    "Camping", "Volunteer", "Road", "Custom" ]);
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({refresh:true})

    useEffect(async () => {
        if(edit)
        {
            var list = await tags.filter(function(val) {
                return tagsList.indexOf(val) == -1;
            }); 
            for(var item in list)
                tagsList.splice(tagsList.length - 1, 0, list[item]);
            setTagsList(tagsList )
            setState({ refresh: ! state.refresh })  
        }
    },[])

    const chooseTag = (tag) => {
        if(tag == 'Custom') {
            setVisible(true)
            return
        }
        const index = tags.indexOf(tag)
        if(index > -1) {
            tags.splice(index, 1);
            addedTags.splice(index, 1)
            if(edit) deletedTags.push(tag)
        }
        else {
            addedTags.push(tag)
            tags.push(tag)
        }
        setaddedTags(addedTags)
        setTags(tags)
        setDeletedTags(deletedTags)
        setState({ refresh: ! state.refresh }) 
    };
    
    return (
        <SafeAreaView style={{marginBottom:SCREEN_WIDTH*0.02}}>
        <Collapse>
            <CollapseHeader >
                <View style={{ flexDirection:'row'}} onPress={() => setOpen(!open)}>
                    <FontAwesomeIcon icon={open?faCaretUp:faCaretDown} size={ RFValue(20) }  color={theme.text} style={{marginTop:SCREEN_WIDTH*0.01}}/>
                    <Text style={{fontSize:RFValue(16), color:theme.Text, textAlign:"left", fontWeight:"bold"}}>  Tags</Text>
                </View>
            </CollapseHeader>
            <CollapseBody >
                <FlatList
                    extraData={state.refresh}
                    data={tagsList}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    numColumns={5}
                    initialNumToRender={27}
                    windowSize={41}
                    removeClippedSubviews={true}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{justifyContent:"space-between", alignItems:"center"}}
                    renderItem={({ item, index}) => {
                        return(
                            <TouchableOpacity 
                                onPress={() => chooseTag(item)}
                                style={[styles.container, 
                                    {backgroundColor:tags.indexOf(item) > -1? '#d6d4ce':'white', marginRight:SCREEN_WIDTH*0.01 }]}>
                                <Text style={{fontSize:RFValue(14),}}>{ item}</Text>
                            </TouchableOpacity> 
                        )
                    }}
                />  
            </CollapseBody>
        </Collapse>
        <DialogInput 
            isDialogVisible={isDialogVisible}
            title={"Custom Tag"}
            message={"What kind of trips did you have?"}
            hintInput ={"Tag"}
            submitInput={ (inputText) => {
                tagsList.splice(tagsList.length - 1, 0, inputText);
                setTagsList(tagsList)
                tags.push(inputText)
                addedTags.push(inputText)
                setTags(tags)
                setaddedTags(addedTags)
                setState({ refresh: ! state.refresh }) 
                setVisible(false)
            } }
            closeDialog={ () => {setVisible(false)}}>
        </DialogInput>
        </SafeAreaView>
        
    );  

}
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const styles = StyleSheet.create({
    container:{
        borderWidth: 0.7,
        borderRadius: SCREEN_WIDTH*0.1,
        padding:SCREEN_WIDTH*0.015,
        marginTop:SCREEN_WIDTH*0.03,
        borderColor:"#d6d4ce",
    }
})

export default TagsList;