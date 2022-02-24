import React, { useState } from 'react';
import { Dimensions, SafeAreaView, Text, View,  StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('screen').width; // device width
const SCREEN_HEIGHT= Dimensions.get('screen').height; // device height
import { ThemeContext } from '../../Context/ThemeContext';
import { normalize } from 'react-native-elements';
import { AirbnbRating } from 'react-native-ratings';
import CurrencyPicker from "react-native-currency-picker";
import { LinearGradient } from 'expo-linear-gradient';


function Filter({filters, setFilters}) {
    const Theme = React.useContext(ThemeContext);
    const [numberOfDays, setNumberOfDays] = useState(filters.numberOfDays);
    const [rate, setRate] = useState(filters.rate);
    const [organization, setOrganization] = useState(filters.organization);
    const [budget, setBudget] = useState(filters.budget);
    const [currency, setCurrancy] = useState(filters.currency);
    const [message, setMessage] = useState("")
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
               !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
      }
    const handleFilters = ()=>{
        if((isNumeric(numberOfDays) || !numberOfDays) && (isNumeric(budget) || !budget))
        {
            setMessage("")
            setFilters(
                {
                    numberOfDays : numberOfDays,
                    rate : rate,
                    organization:organization,
                    budget: budget,
                    currency: currency
                }
            )
        }
        else
        {
            setMessage("Invalid Data")
        }
    }
    return (
      <View style={styles.container}>
        <View style={{flexDirection:"row"}}>
            <Text style={styles.text}>Number of days</Text>
            <View style={styles.inputBox}>
            <TextInput style={styles.inputText} keyboardType='numeric' selectionColor={Theme.SecondaryCyan} placeholder="How many?" placeholderTextColor={Theme.subText} onChangeText={text => setNumberOfDays(text)} value={numberOfDays}></TextInput>
            </View>
        </View>
        <View style={{flexDirection:"row"}}>
            <Text style={[styles.text, {marginRight:"30%", marginTop:"1%"}]}>Rate</Text>
            <AirbnbRating
            defaultRating={rate}
            type='star'
            ratingCount={5}
            showRating={false}
            size={22}
            reviewSize={22}
            selectedColor="#F3ff24"
            imageSize={2}
            onFinishRating={rate => setRate(rate)}
            />
        </View>
        <View style={{flexDirection:"row", marginTop:"5%"}}>
            <Text style={styles.text}>Organization</Text>
            <View style={[styles.inputBox, {width:"55%", marginLeft:"9%"}]}>
            <TextInput style={styles.inputText} selectionColor={Theme.SecondaryCyan} placeholder="Which org?" placeholderTextColor={Theme.subText} onChangeText={text => setOrganization(text)} value={organization}></TextInput>
            </View>
        </View>
        <View style={{flexDirection:"row"}}>
            <Text style={styles.text}>Budget ≤</Text>
            <View style={[styles.inputBox, {width:"37%", marginLeft:"13%"}]}>
            <TextInput style={styles.inputText} keyboardType='numeric' selectionColor={Theme.SecondaryCyan} placeholder="How much?" placeholderTextColor={Theme.subText} onChangeText={text => setBudget(text)} value={budget}></TextInput>
            </View>
            <CurrencyPicker
                enable={true}
                darkMode={false} //TODO 
                currencyCode={currency}
                showCurrencyName={false}
                showFlag={false}
                showCurrencyCode={true}
                onSelectCurrency={(data) => { setCurrancy(data.code) }}
                showNativeSymbol={true}
                showSymbol={false}
                containerStyle={{
                    container: {
                        borderColor:"black",
                        borderWidth:0.2,
                        padding:"0.8%",
                        width:"95%",
                        marginLeft:"1%",
                        marginTop:"7%"
                    },
                    currencyCodeStyle: {},
                    currencyNameStyle: {},
                    symbolStyle: {},
                    symbolNativeStyle: {}
                }}
                title={"Currency"}
                searchPlaceholder={"Search"}
                showCloseButton={true}
                showModalTitle={true}
            />
        </View>
        <View style={{flexDirection:"row"}}>
            <Text style={{color:"red", fontWeight:"bold", marginRight:"-35%"}}>{message}</Text>
            <TouchableOpacity onPress={()=>handleFilters()}>
                        <LinearGradient
                            colors={[Theme.SecondaryCyan, Theme.SecondaryPurple]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.button}>
                            <Text style={{color:"white", fontWeight:"bold"}}>Filter</Text>
                        </LinearGradient>
            </TouchableOpacity>
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
    container:{
        position:"absolute",
        width:SCREEN_WIDTH*0.8,
        height:SCREEN_HEIGHT*0.35,
        borderWidth:1,
        borderColor:"#C3c3c3",
        backgroundColor:"white",
        zIndex:1,
        top:"90%",
        left:"5%",
        borderRadius: 15,
        borderTopRightRadius:0,
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        elevation: 20,
        shadowRadius: 5,
        padding:"5%"

    },
    inputBox: {
        width: "40%",
        height: "7%",
        justifyContent: "center",
        padding: "7%",
        paddingLeft:"3%",
        backgroundColor: '#ededed',
        borderRadius: 5,
        marginLeft:"15%"
      },
      inputText: {
        height: SCREEN_HEIGHT * 0.05,
        color: "#636363",
        fontSize: normalize(14)
      },
      text:{fontSize:normalize(16),
        color:"#5b5c5c",
        marginTop:"3%",
        fontWeight:"bold"
    },
    button: {
        alignItems: 'center',
        justifyContent: "center",
        width: SCREEN_WIDTH * 0.16,
        height: SCREEN_HEIGHT * 0.048,
        borderRadius:7,
        marginLeft:SCREEN_WIDTH * 0.55
    },
})
export default Filter;
