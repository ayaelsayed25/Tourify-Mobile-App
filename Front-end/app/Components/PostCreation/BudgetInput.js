import React, { useContext } from 'react';
import CurrencyPicker from "react-native-currency-picker"
import { StyleSheet, View, TextInput, Dimensions } from 'react-native';
import { ThemeContext } from '../../Context/ThemeContext';
import { RFValue } from "react-native-responsive-fontsize";


const SCREEN_WIDTH = Dimensions.get('screen').width; // device width

function BudgetInput({setBudget, budget, setCurrancy, currency}) {
    const theme = useContext(ThemeContext);

    return (
        <View style={styles.budget}>
            <TextInput
                onChangeText={text => setBudget(text)}
                placeholder="budget"
                keyboardType='numeric'
                value={budget}
                style={{fontSize:RFValue(16)}}
            />
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
                        marginLeft:SCREEN_WIDTH*0.55,
                        borderColor:theme.SecondaryPurple,
                        borderWidth:0.2,
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
    );
}
const styles = StyleSheet.create({
    budget:{
        flexDirection:"row",
    }
})
export default BudgetInput;