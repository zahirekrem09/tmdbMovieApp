/* eslint-disable prettier/prettier */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
const {width} = Dimensions.get('window');

const HeaderBtn = ({focused, onPress, label}) => (
  <TouchableOpacity
    style={[styles.headerBtn, focused ? styles.headerBtnActive : null]}
    {...{onPress}}>
    <Text
      style={[
        styles.headerBtnText,
        focused ? styles.headerBtnActiveText : styles.headerBtnInactive,
      ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export {HeaderBtn};

const styles = StyleSheet.create({
  headerBtn: {
    marginRight: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'tomato',
  },
  headerBtnText: {fontSize: 16, fontWeight: 'bold'},
  headerBtnActiveText: {
    color: '#fff',
  },
  headerBtnActive: {
    backgroundColor: 'tomato',
  },
  headerBtnInactive: {color: '#00000040'},
});
