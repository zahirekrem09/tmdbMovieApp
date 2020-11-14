/* eslint-disable prettier/prettier */
import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import {HeaderBtn} from '../components/HeaderBtn';
import {getSearchMovies, getSearchTVShows} from '../config/rest';
import {MovieItem} from '../components/MovieItem';
const SearchScreen = ({navigation}) => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Movie');
  const [page, setPage] = useState(0);
  const {colors} = useTheme();
  const handleSearchChange = (val) => {
    setQuery(val);
  };

  const handleSearch = async (p) => {
    console.log(data);
    if (category === 'Movie') {
      const movies = await getSearchMovies(query, p + 1);
      // const updateData = [...data, ...movies];
      setData(movies);
    } else {
      const tvShows = await getSearchTVShows(query, p + 1);
      setData(tvShows);
    }
    setQuery('');
  };
  const renderSearchItem = ({item}) => (
    <MovieItem singleData={item} category={category} />
  );
  let Content =
    data?.length != 0 ? (
      <FlatList
        data={data}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.key}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        // horizontal
        // onEndReachedThreshold={0.5}
        // onEndReached={({distanceFromEnd}) => {
        //   setPage(page + 1);
        //   handleSearch(page);
        // }}
      />
    ) : (
      //TODO: //UseEfeect kullanarak page güncellemeye calışalım...
      <View style={styles.noFound}>
        <Text style={[styles.noFoundText, {color: colors.text}]}>
          No found news
        </Text>
      </View>
    );
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.btnContainer}>
        {['Movie', 'TV'].map((headerBtn, i) => (
          <HeaderBtn
            key={`header-btn-${i}`}
            label={headerBtn}
            onPress={() => setCategory(headerBtn)}
            focused={headerBtn == category}
          />
        ))}
      </View>
      <View style={styles.action}>
        <TouchableOpacity
          style={{alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            handleSearch(page);
          }}>
          <Icon2 name="search" color="grey" size={32} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search Here"
          style={[styles.textInput, {color: colors.text}]}
          autoCapitalize="none"
          onChangeText={(val) => handleSearchChange(val)}
          placeholderTextColor={colors.text}
          onSubmitEditing={() => {
            handleSearch(page);
          }}
          value={query}
        />
      </View>
      {Content}
    </View>
  );
};

export {SearchScreen};

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    margin: 10,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    borderColor: '#f2f2f2',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20,

    // backgroundColor: 'red',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },

  textInput: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    padding: 15,
    color: '#05375a',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFoundText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
