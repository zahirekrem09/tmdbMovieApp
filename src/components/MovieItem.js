/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {useState} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useTheme} from 'react-native-paper';

import Genres from './Genres';
import {MovieModal} from './MovieModal';
import Rating from './Rating';
import {ReleaseDate} from './ReleaseDate';

const {width} = Dimensions.get('window');
const ITEM_SIZE = width * 0.45;

const MovieItem = (props) => {
  const [modalMovieData, setModalMovieData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalMovieData({});
    setModalVisible(false);
  };
  const {singleData, category} = props;
  const {colors} = useTheme();

  const handlePress = () => {
    setModalMovieData(singleData);
    setModalVisible(true);
  };
  return (
    <View>
      <TouchableHighlight
        onPress={handlePress}
        style={{
          width: ITEM_SIZE,
          margin: 8,
          borderRadius: 20,
        }}>
        <View style={[styles.movieCard, {backgroundColor: colors.background}]}>
          <Image
            resizeMode="cover"
            style={styles.posterImage}
            source={{uri: singleData.poster}}
          />
          <View style={{position: 'absolute', right: 5, bottom: 10}}>
            <ReleaseDate label={singleData.releaseDate.slice(0, 4)} />
          </View>
          <View>
            <Rating rating={singleData.rating} />
          </View>
          <View style={{position: 'absolute', left: 5, top: 5}}>
            <Genres genres={singleData.genres} />
          </View>
        </View>
      </TouchableHighlight>
      <MovieModal
        showModal={modalVisible}
        movieData={modalMovieData}
        onClose={handleModalClose}
        category={category}
      />
    </View>
  );
};

export {MovieItem};

const styles = StyleSheet.create({
  movieCard: {
    // backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    elevation: 8,
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE * 1.3,
    resizeMode: 'cover',
    borderRadius: 20,
    margin: 0,
    marginBottom: -35,
    position: 'relative',
  },
});

// import * as React from 'react';
// import {
//   StatusBar,
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   Image,
//   Dimensions,
//   Animated,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// const {width, height} = Dimensions.get('window');
// import {getMovies} from './api';
// import Genres from './Genres';
// import Rating from './Rating';
// import {LinearGradient} from 'expo-linear-gradient';

// const SPACING = 10;
// const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
// const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
// const BACKDROP_HEIGHT = height * 0.65;

// const Loading = () => (
//   <View style={styles.loadingContainer}>
//     <Text style={styles.paragraph}>Loading...</Text>
//   </View>
// );

// const Backdrop = ({movies, scrollX}) => {
//   return (
//     <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute'}}>
//       <FlatList
//         data={movies.reverse()}
//         keyExtractor={(item) => item.key + '-backdrop'}
//         removeClippedSubviews={false}
//         contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
//         renderItem={({item, index}) => {
//           if (!item.backdrop) {
//             return null;
//           }
//           const translateX = scrollX.interpolate({
//             inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
//             outputRange: [0, width],
//             // extrapolate:'clamp'
//           });
//           return (
//             <Animated.View
//               removeClippedSubviews={false}
//               style={{
//                 position: 'absolute',
//                 width: translateX,
//                 height,
//                 overflow: 'hidden',
//               }}>
//               <Image
//                 source={{uri: item.backdrop}}
//                 style={{
//                   width,
//                   height: BACKDROP_HEIGHT,
//                   position: 'absolute',
//                 }}
//               />
//             </Animated.View>
//           );
//         }}
//       />
//       <LinearGradient
//         colors={['rgba(0, 0, 0, 0)', 'white']}
//         style={{
//           height: BACKDROP_HEIGHT,
//           width,
//           position: 'absolute',
//           bottom: 0,
//         }}
//       />
//     </View>
//   );
// };

// export default function App() {
//   const [movies, setMovies] = React.useState([]);
//   const scrollX = React.useRef(new Animated.Value(0)).current;
//   React.useEffect(() => {
//     const fetchData = async () => {
//       const movies = await getMovies();
//       // Add empty items to create fake space
//       // [empty_item, ...movies, empty_item]
//       setMovies([{key: 'empty-left'}, ...movies, {key: 'empty-right'}]);
//     };

//     if (movies.length === 0) {
//       fetchData(movies);
//     }
//   }, [movies]);

//   if (movies.length === 0) {
//     return <Loading />;
//   }

//   return (
//     <View style={styles.container}>
//       <Backdrop movies={movies} scrollX={scrollX} />
//       <StatusBar hidden />
//       <Animated.FlatList
//         showsHorizontalScrollIndicator={false}
//         data={movies}
//         keyExtractor={(item) => item.key}
//         horizontal
//         bounces={false}
//         decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
//         renderToHardwareTextureAndroid
//         contentContainerStyle={{alignItems: 'center'}}
//         snapToInterval={ITEM_SIZE}
//         snapToAlignment="start"
//         onScroll={Animated.event(
//           [{nativeEvent: {contentOffset: {x: scrollX}}}],
//           {useNativeDriver: false},
//         )}
//         scrollEventThrottle={16}
//         renderItem={({item, index}) => {
//           if (!item.poster) {
//             return <View style={{width: EMPTY_ITEM_SIZE}} />;
//           }

//           const inputRange = [
//             (index - 2) * ITEM_SIZE,
//             (index - 1) * ITEM_SIZE,
//             index * ITEM_SIZE,
//           ];

//           const translateY = scrollX.interpolate({
//             inputRange,
//             outputRange: [100, 50, 100],
//             extrapolate: 'clamp',
//           });

//           return (
//             <View style={{width: ITEM_SIZE}}>
//               <Animated.View
//                 style={{
//                   marginHorizontal: SPACING,
//                   padding: SPACING * 2,
//                   alignItems: 'center',
//                   transform: [{translateY}],
//                   backgroundColor: 'white',
//                   borderRadius: 34,
//                 }}>
//                 <Image source={{uri: item.poster}} style={styles.posterImage} />
//                 <Text style={{fontSize: 24}} numberOfLines={1}>
//                   {item.title}
//                 </Text>
//                 <Rating rating={item.rating} />
//                 <Genres genres={item.genres} />
//                 <Text style={{fontSize: 12}} numberOfLines={3}>
//                   {item.description}
//                 </Text>
//               </Animated.View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//   },
//   paragraph: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   posterImage: {
//     width: '100%',
//     height: ITEM_SIZE * 1.2,
//     resizeMode: 'cover',
//     borderRadius: 24,
//     margin: 0,
//     marginBottom: 10,
//   },
// });
