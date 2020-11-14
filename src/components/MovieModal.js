/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Rating from './Rating';
import Genres from './Genres';
import {useDispatch, useSelector} from 'react-redux';
const MovieModal = (props) => {
  const handleClose = () => props.onClose();
  const {colors} = useTheme();
  const {movieData} = props;
  const navigation = useNavigation();

  const wishList = useSelector((state) => state.users.wishList);
  const dispatch = useDispatch();

  const detailPress = () => {
    // console.log(props.category);
    navigation.navigate('Detail', {
      id: movieData.key,
      category: props.category,
    });
  };

  const handleAddFav = () => {
    dispatch({
      type: 'ADD_TO_FAVLIST',
      payload: movieData,
      category: props.category,
    });
  };

  const handleRemoveFav = () => {
    dispatch({type: 'REMOVE_FROM_FAVLIST', payload: movieData});
  };
  const isExist = () => {
    if (wishList.filter((item) => item.key === movieData.key).length > 0) {
      return true;
    }
    return false;
  };
  return (
    <Modal
      //   isVisible={props.showModal}
      style={styles.modal}
      animationType="slideInUp"
      onBackdropPress={handleClose}
      visible={props.showModal}
      onRequestClose={handleClose}>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.rowModal}>
          <Image
            resizeMode="cover"
            style={styles.posterImage}
            source={{uri: movieData.poster}}
          />
          <View style={styles.dateLabel}>
            <Text style={styles.dateText}>
              {movieData.releaseDate?.slice(0, 4)}
            </Text>
          </View>

          <View style={{position: 'absolute', bottom: -10}}>
            <Rating rating={movieData.rating} />
          </View>

          <View style={{marginLeft: 5}}>
            <Text
              style={{fontWeight: 'bold', fontSize: 18, color: colors.text}}>
              {movieData.title}
            </Text>
            <Genres genres={movieData.genres} />

            <Text
              numberOfLines={6}
              style={[styles.descText, {color: colors.text}]}>
              {movieData.description}
            </Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => detailPress()}
            style={styles.detailBtn}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
              Detail
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              isExist() ? handleRemoveFav() : handleAddFav(); //1. yontem
            }}>
            <Icon
              name={
                isExist() ? 'book-plus-multiple' : 'book-plus-multiple-outline'
              }
              color="tomato"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export {MovieModal};

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  container: {
    padding: 8,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 1,
    borderColor: 'grey',
  },
  rowModal: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },
  posterImage: {
    width: 120,
    height: 120 * 1.3,
    resizeMode: 'cover',
    borderRadius: 12,
    margin: 0,
    position: 'relative',
    // backgroundColor: 'red',
  },
  dateLabel: {
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#fff',
    marginBottom: 0,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 2,
    top: 2,
  },
  dateText: {fontSize: 10, fontWeight: 'bold', color: '#fff'},
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
    marginRight: 7,
    alignItems: 'center',
  },
  detailBtn: {
    backgroundColor: 'tomato',
    paddingHorizontal: 4,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 80,
    borderRadius: 20,
    marginRight: 50,
    borderColor: '#fff',
    borderWidth: 2,
  },
  descText: {
    fontSize: 12,
    fontStyle: 'italic',
    padding: 5,
    color: 'black',
    width: Dimensions.get('window').width * 0.65,
  },
});
