import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const Button = (props) => {
  const style = props.noBorder ? button_outline : button;
  return (
    <TouchableOpacity
      style={[style.container, {backgroundColor: props.var}]}
      onPress={props.onPress}>
      <Text style={style.title}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export {Button};

const button = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const button_outline = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    color: 'purple',
    fontWeight: 'bold',
  },
});

//   <Button
//     title="Sign Up"
//     noBorder
//     onPress={() => props.navigation.navigate('Sign')}
//   />;
