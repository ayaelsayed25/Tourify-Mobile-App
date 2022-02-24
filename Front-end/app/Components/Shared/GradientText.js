import React,{useContext} from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from "../../Context/ThemeContext";
    
const GradientText = (props) => {
    const theme = useContext(ThemeContext);

  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={[theme.SecondaryCyan,theme.SecondaryPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;