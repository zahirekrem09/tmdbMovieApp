import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
  return (
    <View style={input.container}>
      <TextInput
        style={input.textInput}
        {...props.inputProps}
        onChangeText={props.onType}
      />
    </View>
  );
};

export {Input};

export const input = StyleSheet.create({
  container: {
    backgroundColor: '#eceff1',
    margin: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  textInput: {},
});

//   <Input
//               inputProps={{
//                 placeholder: 'Type your email address..',
//                 keyboardType: 'email-address',
//               }}
//               onType={(value) => setEmail(value)}
//             />
//             <Input
//               inputProps={{
//                 placeholder: 'Type your password..',
//                 secureTextEntry: true,
//               }}
//               onType={(value) => setPassword(value)}
//             />
