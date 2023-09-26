// import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const Footer = () => {
  return (
    <View style={footerStyle.container}>
        <Text style={footerStyle.footerText}>© Infinite Loop</Text>
    </View>
  )
}

const footerStyle = StyleSheet.create({
    container: {
        margin:15,
        alignItems: 'center'
    },
    footerText: {
        fontWeight: 'bold',
        fontSize: 12,
        color: 'gray'
    }
})