/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import {HeaderBtn} from '../components/HeaderBtn';
import {getSearchMovies, getSearchTVShows} from '../config/rest';
import {MovieItem} from '../components/MovieItem';
const SearchScreen = ({navigation}) => {
  const [dataList, setListData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Movie');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const {colors} = useTheme();
  const handleSearchChange = (val) => {
    setPage(1);
    setListData([]);
    setQuery(val);
  };

  useEffect(() => {
    setIsLoading(false);
    handleSearch();
    return () => {};
  }, [page]);

  const handleSearch = async () => {
    setIsLoading(true);
    if (category === 'Movie') {
      const data = await getSearchMovies(query, page);
      // const updateData = [...data, ...movies];
      setListData(dataList?.concat(data?.movies));
      setTotalPages(data?.total_pages);
      setTotalResults(data?.total_results);
    } else {
      const data = await getSearchTVShows(query, page);
      setListData(dataList?.concat(data?.tvShows));
      setTotalPages(data?.total_pages);
      setTotalResults(data?.total_results);
    }
  };
  const handleLoadMore = () => {
    if (totalPages >= page) {
      setPage(page + 1);
      setIsLoading(true);
    }
    setIsLoading(false);
  };
  const renderSearchItem = ({item}) => (
    <MovieItem singleData={item} category={category} />
  );
  const renderFooter = () => {
    return isLoading ? (
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    ) : null;
  };
  let Content =
    dataList !== null ? (
      <FlatList
        data={dataList}
        renderItem={renderSearchItem}
        keyExtractor={(item) => item.key}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
      />
    ) : (
      //TODO✔: //UseEfeect kullanarak page güncellemeye calışalım...✔
      <View style={styles.noFound}>
        <Text style={[styles.noFoundText, {color: colors.text}]}>No found</Text>
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
            focused={headerBtn === category}
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
      {totalResults ? (
        <View style={{flexDirection: 'row'}}>
          <HeaderBtn label={`Page: ${page - 1}-${totalPages}`} focused />
          <HeaderBtn label={`Total Results: ${totalResults}`} focused />
        </View>
      ) : null}

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
