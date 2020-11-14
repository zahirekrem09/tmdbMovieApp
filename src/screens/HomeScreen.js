/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import {getMovies, getTVShows} from '../config/rest';
import {MovieTypes} from '../components/MovieTypes';
import {HeaderBtn} from '../components/HeaderBtn';
import {MovieModal} from '../components/MovieModal';

const HomeScreen = ({navigation}) => {
  const [topData, setTopData] = useState(null);
  const [popData, setPopData] = useState(null);
  const [upData, setUpData] = useState(null);
  const [playData, setPlayData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMovieData, setModalMovieData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('Movie');
  // const [currentMovie, setCurrentMovie] = useState(undefined);
  const {colors} = useTheme();

  const movieTypes = [
    {
      title: "What's Top Rated",
      movies: topData,
    },
    {
      title: 'Popular',
      movies: popData,
    },
    {
      title: 'Now Playing',
      movies: playData,
    },
    {
      title: 'Upcoming',
      movies: upData,
    },
  ];

  const handleItemDataOnPress = (movieData) => {
    setModalMovieData(movieData);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalMovieData({});
    setModalVisible(false);
  };

  const getTopData = async () => {
    if (category === 'Movie') {
      const data = await getMovies('movie', 'top_rated', page);
      setTopData(data);
      setIsLoading(false);
    } else {
      const data = await getTVShows('tv', 'top_rated', page);
      setTopData(data);
      setIsLoading(false);
    }
  };
  const getPopData = async () => {
    if (category === 'Movie') {
      const data = await getMovies('movie', 'popular', page);
      setPopData(data);
      setIsLoading(false);
    } else {
      const data = await getTVShows('tv', 'popular', page);
      setPopData(data);
      setIsLoading(false);
    }
  };

  const getPlayingData = async () => {
    if (category === 'Movie') {
      const data = await getMovies('movie', 'now_playing', page);
      setPlayData(data);
      setIsLoading(false);
    } else {
      const data = await getTVShows('tv', 'on_the_air', page);
      setPlayData(data);
      setIsLoading(false);
    }
  };

  const getUpcomingData = async () => {
    if (category === 'Movie') {
      const data = await getMovies('movie', 'upcoming', page);
      setUpData(data);
      setIsLoading(false);
    } else {
      const data = await getTVShows('tv', 'airing_today', page);
      setUpData(data);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getTopData();
    getPopData();
    getPlayingData();
    getUpcomingData();
  }, [category]);

  const renderItem = ({item, index}) => (
    <MovieTypes
      onPress={handleItemDataOnPress}
      title={`${item.title}-${category}`}
      data={item.movies}
      index={index}
      category={category}
    />
  );

  let Content = isLoading ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
      }}>
      <ActivityIndicator size="large" color="tomato" />
      <Text style={{marginTop: 10, color: colors.text}}>Please Wait..</Text>
    </View>
  ) : (
    <FlatList
      data={movieTypes}
      keyExtractor={(item) => item.title}
      renderItem={renderItem}
    />
  );
  return (
    <View
      style={{
        backgroundColor: colors.background,
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{flexDirection: 'row', marginBottom: 10, marginLeft: 20}}>
        {['Movie', 'TV'].map((headerBtn, i) => (
          <HeaderBtn
            key={`header-btn-${i}`}
            label={headerBtn}
            onPress={() => setCategory(headerBtn)}
            focused={headerBtn == category}
          />
        ))}
      </View>
      {Content}
      <MovieModal
        showModal={modalVisible}
        movieData={modalMovieData}
        onClose={handleModalClose}
        category={category}
      />
    </View>
  );
};

export {HomeScreen};
