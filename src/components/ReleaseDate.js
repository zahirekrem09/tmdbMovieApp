/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const ReleaseDate = ({label}) => (
  <View style={styles.dateLabel}>
    <Text style={styles.dateText}>{label?.slice(0, 4)}</Text>
  </View>
);

export {ReleaseDate};

const styles = StyleSheet.create({
  dateLabel: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#fff',
    marginBottom: 4,
    backgroundColor: 'tomato',
  },
  dateText: {fontSize: 10, fontWeight: 'bold', color: '#fff'},
});
