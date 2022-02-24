import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

function Splash() {
  return (
        <View style={styles.container}>
            <Image source={{ uri: "https://i.ibb.co/S02fhRW/Tourify-Logo-Black.png" }} style={styles.logo} />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width: 220,
    height: 120,
  }
});
 export default Splash;