import React from 'react';
import { Dimensions, SafeAreaView, Text, View,  StyleSheet, Image, FlatList, TouchableOpacity} from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device height
import { faLandmark, faUmbrellaBeach, faSmileBeam, faHeart, faSun, faCampground, faPeopleCarry, faRoad, faSlidersH} from '@fortawesome/free-solid-svg-icons';
import { normalize } from 'react-native-elements';
import { useState } from 'react';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import Filter from './Filter';
function TagsBar({setFilterObj, filterObj, name}) {
    const [font, setFont] = useState(false)
    const [filtering, setFiltering] = useState(false);
    const [tags, setTags] = useState([])
    const oldFilter = {
        numberOfDays : null,
        rate : 0,
        organization:null,
        budget: null,
        currency:'USD'
    }
    const [filters, setFilters] = useState({
        numberOfDays : null,
        rate : 0,
        organization:null,
        budget: null,
        currency:'USD'
    })
    useEffect(()=>{
        Font.loadAsync( {
            'Pattaya': require('../../assets/fonts/Pattaya-Regular.ttf')
        }
        ).then( () => setFont(true)) 
    }, []);
    useEffect(()=>{
       if(JSON.stringify(filters) !== JSON.stringify(oldFilter))
       {
           var newObj = {
                tags:tags,
                ...filters
           }
            setFilterObj(newObj)
       }
    }, [filters]);
    const Theme = React.useContext(ThemeContext);
    const tagsNames = [
        {name: "Beach", icon: faUmbrellaBeach},{name: "Romantic", icon: faHeart},
        {name:"Camping", icon: faCampground},{name: "Fun", icon: faSmileBeam},
        {name:"Relaxation", icon: faSun},{name:"Historical", icon: faLandmark},
        {name:"Volunteer",icon:faPeopleCarry},{name: "Road", icon:faRoad}
    ]
    const tagHandler = (name)=>{
        let newTags;
        if(tags.includes(name))
        {
            newTags = tags.filter(item => item !== name);
            setTags(newTags);
        }
        else 
        {
            newTags = tags.concat(name);
            setTags(newTags)
        }
        var newObj = {
            tags:newTags,
            ...filters
       }
        setFilterObj(newObj)
    }
    return (
      <View style={{width:"100%", height:"15%", alignItems:"flex-start"}}>
        <FlatList
          data={tagsNames}
          horizontal
          showsHorizontalScrollIndicator ={false}
          contentContainerStyle={{padding: "3%", paddingRight: "12%"}}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={[styles.tag, {backgroundColor: tags.includes(item.name)? Theme.SecondaryCyan : "white"}]} onPress={()=>{tagHandler(item.name)}}>
                <FontAwesomeIcon icon={item.icon} color={tags.includes(item.name)? "white" : Theme.SecondaryCyan} size={20}></FontAwesomeIcon>
                <Text style={{fontSize:normalize(14), fontWeight:"bold", marginLeft:"8%", marginRight:"20%"}}>{item.name}</Text>
              </TouchableOpacity>
            )
          }} />
            <View style={{flex: 1, flexDirection:"row", marginLeft:"5%", marginTop:"-12%"}}>
                <Text style={{fontSize:normalize(23), color:"#454646" ,fontFamily: font? 'Pattaya' : 'normal',marginRight:"35%" }}>{"Hi, " + (name).split(" ")[0] + "!"}</Text>
                <TouchableOpacity style={styles.filter} onPress={()=>{setFiltering(!filtering)}}>  
                    <Image source={require('../../assets/filter.png') } style={styles.logo} />
                    <Text style={{color:"black", fontSize:normalize(14), fontWeight:"bold"}}>Filter Posts</Text>
                </TouchableOpacity>
            </View>
            {filtering && <Filter filters={filters} setFilters={setFilters}></Filter>}
      </View>
  );
}
const styles = StyleSheet.create({
    tag:{
        width: 102,
        height: 40,
        padding:"6%",
        flexDirection:"row",
        marginRight: 5,
        borderColor: "#d8dbdc",
        borderRadius: 5,
        borderWidth: 1
    },
    filter:{
        width: "35%",
        height : "78%",
        paddingLeft:"1%",
        paddingTop:"2%",
        flexDirection:"row",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor:"white"
    },
    logo: {
        width: "30%",
        height: "80%",
        marginRight : "4%"
    },
})
export default TagsBar;
