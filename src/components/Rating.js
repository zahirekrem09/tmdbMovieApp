/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Rating({rating}) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <View style={styles.voteContainer}>
        <Text style={styles.voteText}>{rating}</Text>
      </View>
      {r.map((type, index) => {
        return <AntDesign key={index} name={type} size={12} color="tomato" />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: {marginRight: 4, fontSize: 14, fontWeight: 'bold'},
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  voteContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'tomato',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    marginRight: 5,
  },
  voteText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});
