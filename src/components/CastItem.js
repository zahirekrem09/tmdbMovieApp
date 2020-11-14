/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React from 'react';
import {
  View,
  Share,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import {useTheme} from 'react-native-paper';

const CastItem = ({castData}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 8,
          alignItems: 'center',
        }}>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{
            uri: castData.poster,
          }}
        />
      </View>
      <View style={{marginLeft: 10, alignItems: 'center'}}>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>{castData.name}</Text>
        <Text style={{fontSize: 14, fontWeight: 'bold', opacity: 0.5}}>
          {castData.character}
        </Text>
      </View>
    </View>
  );
};

export {CastItem};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'tomato',
  },
});
