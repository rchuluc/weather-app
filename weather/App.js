/**
 * @format
 * @flow
 */

import React from 'react'
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Text,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator
} from 'react-native'

import SearchInput from './components/SearchInput'

import { fetchLocationId, fetchWeather } from './utils/api'
import setBg from './utils/getBgImage'

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: ''
  }

  handleUpdateLocation = async city => {
    if (!city) return

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city)
        const { location, weather, temperature } = await fetchWeather(
          locationId
        )
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        })
      } catch (e) {
        this.setState({
          loading: false,
          error: true
        })
      }
    })
  }

  componentDidMount() {
    this.handleUpdateLocation('São Paulo')
  }

  render() {
    const { loading, error, location, weather, temperature } = this.state
    return (
      <ImageBackground
        source={setBg(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          <StatusBar barStyle="light-content" />
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could not load weather, please try a different city.
                  </Text>
                )}
                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {`${Math.round(temperature)}°`}
                    </Text>
                  </View>
                )}
                <SearchInput
                  placeholder="Procure uma cidade..."
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)'
  },

  imageContainer: {
    flex: 1
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },

  textStyle: {
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'AvenirNext-Regular',
        color: 'white'
      },
      android: {
        fontFamily: 'Roboto',
        color: 'white'
      }
    })
  },

  largeText: {
    fontSize: 44
  },

  smallText: {
    fontSize: 18
  }
})
