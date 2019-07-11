/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react'
import { StyleSheet, Platform, View, Text, StatusBar } from 'react-native'

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <Text style={[styles.largeText, styles.textStyle]}>Campinas</Text>
        <Text style={[styles.smallText, styles.textStyle]}>Ensolarado</Text>
        <Text style={[styles.largeText, styles.textStyle]}>24°</Text>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AnvenirNext-Regular' : 'Roboto'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
})

export default App
