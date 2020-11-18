/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Genres({genres}) {
  return (
    <View style={styles.genres}>
      {genres.map((genre, i) => {
        return (
          <View key={i} style={styles.genre}>
            <Text style={styles.genreText}>{genre}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  genre: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#ccc',
    marginRight: 4,
    marginBottom: 4,
    backgroundColor: 'tomato',
  },
  genreText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
  },
});
