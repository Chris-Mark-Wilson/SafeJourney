import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/safe-journey-logo-main-300px.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: 'center',
    // height: "10%"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});

export default Header;