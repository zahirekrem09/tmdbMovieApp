/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {MovieItem} from '../components/MovieItem';
import {View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

const WishlistScreen = ({navigation}) => {
  // useEffect(() => {
  //   console.log(wishList);
  // }, [wishList]);

  const wishList = useSelector((state) => state.users.wishList);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={wishList.reverse()}
        renderItem={({item}) => (
          <MovieItem singleData={item} category={item.category} />
        )}
        keyExtractor={(item) => item.key}
        numColumns={2}
        // showsHorizontalScrollIndicator={false}
        // horizontal
      />
    </View>
  );
};

export {WishlistScreen};
