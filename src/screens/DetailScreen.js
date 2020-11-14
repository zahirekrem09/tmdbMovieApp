/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
import {
  getCast,
  getCrew,
  getSimilarMovies,
  getSimilarTvs,
  getVideos,
} from '../config/rest';

import Rating from '../components/Rating';
import {CastItem} from '../components/CastItem';
import {MovieItem} from '../components/MovieItem';
import {MovieModal} from '../components/MovieModal';

const base_url = 'https://api.themoviedb.org/3/';
const api_key = '3488df73f1d5f6c1480437e6ce92b833';
const height = Dimensions.get('window').height * 1;
const width = Dimensions.get('window').width * 1;

const DetailScreen = ({navigation, route}) => {
  const [modalMovieData, setModalMovieData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  // const [videoUrl, setVideoUrl] = useState(null);
  const [similar, setSimilar] = useState(null);
  const {colors} = useTheme();
  const id = route.params.id;
  const category = route.params.category;

  const getDetail = async (cat, movId) => {
    let API_URL = `${base_url}${cat}/${movId}?api_key=${api_key}&language=en-US`;
    const result = await fetch(API_URL).then((res) => res.json());
    return result;
  };

  const handleItemDataOnPress = (movieData) => {
    setModalMovieData(movieData);
    setModalVisible(true);
  };
  const handleModalClose = () => {
    setModalMovieData({});
    setModalVisible(false);
  };

  const getData = async () => {
    if (category === 'Movie') {
      const detail = await getDetail('movie', id);
      const movieCast = await getCast('movie', id);
      const movieCrew = await getCrew('movie', id);
      const similarMovie = await getSimilarMovies('movie', id);
      // const video = await getVideos('movie', id);
      // const videoPath = getVideoPath(video.key);
      // setVideoUrl(videoPath);
      setData(detail);
      setCast(movieCast);
      setCrew(movieCrew);
      setSimilar(similarMovie);
    } else {
      const detail = await getDetail('tv', id);
      const movieCast = await getCast('tv', id);
      const movieCrew = await getCrew('tv', id);
      const similarMovie = await getSimilarTvs('tv', id);
      // const video = await getVideos('tv', id);
      // const videoPath = getVideoPath(video.key);
      // setVideoUrl(videoPath);
      setData(detail);
      setCast(movieCast);
      setCrew(movieCrew);
      setSimilar(similarMovie);
    }
  };
  // const getVideoPath = (path) => `https://www.youtube.com/watch?v=${path}`;
  const getImagePath = (path) =>
    `https://image.tmdb.org/t/p/w600_and_h900_bestv2${path}`;
  // const getBackdropPath = (path) =>
  //   `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

  useEffect(() => {
    getData();
  }, [data]);

  const renderCastItem = ({item}) => (
    <View style={styles.container}>
      <View
        style={{
          padding: 8,
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={styles.imageCast}
          source={{
            uri: item.poster,
          }}
        />
      </View>
      <View style={{marginLeft: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.text}}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            opacity: 0.5,
            color: colors.text,
          }}>
          {item.character}
        </Text>
      </View>
    </View>
  );
  const renderCompanyItem = ({item}) => {
    const poster =
      item.logo_path !== null
        ? getImagePath(item.logo_path)
        : 'https://image.freepik.com/free-vector/vintage-video-camera-logo-movie-cinema-production_57043-424.jpg';
    return (
      <View style={styles.container}>
        <View style={{padding: 8, alignItems: 'center'}}>
          <Image
            resizeMode="cover"
            style={styles.imageCast}
            source={{uri: poster}}
          />
        </View>
        <View style={{marginLeft: 10, alignItems: 'center'}}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: colors.text}}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              opacity: 0.5,
              color: colors.text,
            }}>
            {item.origin_country}
          </Text>
        </View>
      </View>
    );
  };
  const renderSimilarItem = ({item}) => (
    <MovieItem singleData={item} category={category} />
  );
  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View>
        {data != null ? (
          <View>
            {/* Top container */}
            <View style={styles.topContainer}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={{
                  uri:
                    data.poster_path !== null
                      ? getImagePath(data.poster_path)
                      : 'https://image.freepik.com/free-vector/vintage-video-camera-logo-movie-cinema-production_57043-424.jpg',
                }}
              />

              {data.number_of_episodes ? (
                <View style={styles.episodesContainer}>
                  <View style={styles.dateLabel}>
                    <Text style={[styles.dateText, {fontSize: 12}]}>
                      Seasons - {data.number_of_seasons}
                    </Text>
                  </View>
                  <View style={styles.dateLabel}>
                    <Text style={[styles.dateText, {fontSize: 12}]}>
                      Episodes - {data.number_of_episodes}
                    </Text>
                  </View>

                  <View style={styles.dateLabel}>
                    <Text style={[styles.dateText, {fontSize: 12}]}>
                      Status - {data.status}
                    </Text>
                  </View>
                </View>
              ) : null}

              <View
                style={[
                  styles.ratContainer,
                  {backgroundColor: colors.background},
                ]}>
                <Rating rating={data.vote_average} />
                <View style={styles.dateLabel}>
                  <Text style={styles.dateText}>
                    {data.release_date
                      ? data.release_date.slice(0, 4)
                      : data.first_air_date.slice(0, 4)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.titleContainer}>
              <Text style={[styles.title, {color: colors.text}]}>
                {data.original_title ? data.original_title : data.original_name}
              </Text>

              {category == 'TV' ? (
                <Text style={[styles.subTitle, {color: colors.text}]}>
                  created_by {data.created_by[0]?.name}
                </Text>
              ) : null}

              {/* Genres Label */}
              <View style={styles.genres}>
                {data.genres.map((genre) => {
                  return (
                    <View key={genre.id} style={styles.genre}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.descContainer}>
              <Text style={[styles.descTitle, {color: colors.text}]}>
                Plot Summary
              </Text>
              <Text
                style={[styles.desc, {color: colors.text}]}
                numberOfLines={10}>
                {data.overview}
              </Text>
            </View>
            <Text style={[styles.descTitle, {color: colors.text}]}>
              Company Info{' '}
            </Text>
            <FlatList
              data={data.production_companies}
              keyExtractor={(item) => item.id}
              renderItem={renderCompanyItem}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
            <Text style={[styles.descTitle, {color: colors.text}]}>
              Cast & Crew{' '}
            </Text>
            <FlatList
              data={cast}
              keyExtractor={(item) => item.key}
              renderItem={renderCastItem}
              showsHorizontalScrollIndicator={false}
              horizontal
            />

            <FlatList
              data={crew}
              keyExtractor={(item) => item.key + item.character}
              renderItem={renderCastItem}
              showsHorizontalScrollIndicator={false}
              horizontal
            />

            <Text style={[styles.descTitle, {color: colors.text}]}>
              Similar{' '}
            </Text>
            <FlatList
              data={similar}
              renderItem={renderSimilarItem}
              keyExtractor={(item) => item.key}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
            {/* <MovieModal
              showModal={modalVisible}
              movieData={modalMovieData}
              onClose={handleModalClose}
              category={category}
            /> */}

            {/* <WebView
              source={{uri: data.homepage}}
              style={{flex: 1}}
              startInLoadingState
              scalesPageToFit
            /> */}
          </View>
        ) : (
          <ActivityIndicator
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            size="large"
            color="tomato"
          />
        )}
      </View>
    </ScrollView>
  );
};

export {DetailScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {padding: 0, paddingBottom: 5},
  image: {
    width,
    height: height * 0.4,
    opacity: 0.5,
    position: 'relative',
    top: 0,
    left: 0,
    // zIndex: 5,
    borderBottomLeftRadius: 40,
  },
  ratContainer: {
    height: 60,
    width: width * 0.75,
    borderBottomStartRadius: 30,
    borderTopLeftRadius: 30,
    // backgroundColor: 'white',
    position: 'absolute',
    elevation: 5,
    right: 0,
    bottom: -15,
    paddingLeft: 10,
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateLabel: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#fff',
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  dateText: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // marginTop: -50,
    marginHorizontal: 4,
  },
  genre: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#fff',
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
    marginTop: 5,
  },
  genreText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleContainer: {
    marginRight: 4,
    // backgroundColor: 'green',
    // marginTop: -50,
    marginStart: 5,
    padding: 6,
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginTop: -50,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.7,
    fontStyle: 'italic',
  },
  descTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 12,
    opacity: 0.7,
    marginLeft: 8,
  },
  descContainer: {},
  desc: {
    fontSize: 16,
    lineHeight: 20,
    padding: 12,
  },
  imageCast: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'tomato',
  },
  episodesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
