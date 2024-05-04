import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/theme'

const Divider = () => {
  return (
    <View style={styles.divider}/>
    
  )
}

export default Divider

const styles = StyleSheet.create({
    divider: {
     borderColor: COLORS.gray2,
     opacity: 0.7,
     width: SIZES.width -40,
     borderWidth: 0.3,
     marginLeft: 10,
     marginTop: 12

    }
})