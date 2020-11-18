/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {validateEmail} from '../utils';

const LoginScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const [errorMsg, setErrorMsg] = React.useState(null);

  const dispatch = useDispatch();

  const handleEmailChange = (val) => {
    if (validateEmail(val)) {
      setData({...data, email: val, check_textInputChange: true});
    } else {
      setData({...data, email: val, check_textInputChange: false});
    }
  };
  const handlePasswordChange = (val) => {
    if (val.length !== 0) {
      setData({...data, password: val});
    } else {
      setData({...data, password: val});
    }
  };
  const uptadeScureTextEntry = () => {
    setData({...data, secureTextEntry: !data.secureTextEntry});
  };

  const LoginFunction = async () => {
    await auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        const userToken = res.user.uid.toString();
        const userEmail = res.user.email;
        AsyncStorage.setItem('userToken', userToken);
        dispatch({type: 'LOGIN', email: userEmail, token: userToken});
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome🔥</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={22} />
          <TextInput
            placeholder="Your Email Adress"
            style={styles.textInput}
            autoCapitalize="none"
            keyboardType="email-address"
            // textContentType="emailAddress"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {data.check_textInputChange ? (
            <Feather name="check-circle" color="green" size={22} />
          ) : null}
        </View>

        {errorMsg ? (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{errorMsg}</Text>
          </Animatable.View>
        ) : null}

        <Text style={[styles.text_footer, {marginTop: 40}]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={22} />
          <TextInput
            maxLength={15}
            placeholder="Your Password"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            textContentType="password"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={uptadeScureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={22} />
            ) : (
              <Feather name="eye" color="grey" size={22} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Text style={{color: '#01b4e4', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              LoginFunction();
            }}
            style={styles.signIn}>
            <LinearGradient
              colors={['#01b4e4', '#01ab9d']}
              style={styles.signIn}>
              <Text style={styles.textSign}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {borderColor: '#01b4e4', marginTop: 20, borderWidth: 1},
            ]}>
            <Text style={[styles.textSign, {color: '#01b4e4'}]}> Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.signIn,
              {borderColor: '#01b4e4', marginTop: 20, borderWidth: 1},
            ]}>
            <Text style={[styles.textSign, {color: '#01b4e4'}]}> Go Back </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export {LoginScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01b4e4',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
    alignItems: 'center',
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
