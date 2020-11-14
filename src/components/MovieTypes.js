/* eslint-disable no-unreachable */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {MovieItem} from './MovieItem';

const MovieTypes = ({title, data, onPress, category}) => {
  const renderItem = ({item}) => (
    <MovieItem singleData={item} onPress={onPress} category={category} />
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export {MovieTypes};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    color: 'tomato',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
  },
});
