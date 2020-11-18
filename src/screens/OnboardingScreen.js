/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#7952B3" barStyle="light-content" /> */}
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/movie-app-icon.jpg')}
          style={styles.logo}
          resizeMode="stretch"
        />
        {/* <Text style={styles.logoText}></Text> */}
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Follow the agenda with TMDB Movies 🔥</Text>
        <Text style={styles.text}>Sign in with account</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <LinearGradient
              colors={['#01b4e4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Get Started</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={22} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export {OnboardingScreen};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01b4e4',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo + 50,
    height: height_logo,
    opacity: 0.5,
  },
  logoText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
