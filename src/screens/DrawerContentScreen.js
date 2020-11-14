/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
('react-native-paper');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
// import {useTheme as navUseTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';

const DrawerContent = (props) => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((s) => s.users.isDarkTheme);
  const paperTheme = useTheme();
  const {colors} = paperTheme;

  const singOut = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch({type: 'LOGOUT'});
    auth()
      .signOut()
      .then(() => Alert.alert('TMDB-App', 'User signed out!'));
  };

  const toggleTheme = () => {
    dispatch({type: 'DARK_MOD'});
  };

  const userName =
    '@' +
    auth().currentUser.uid.slice(0, 3) +
    '_' +
    auth().currentUser.displayName?.replace(' ', '_').toLowerCase();

  return (
    <View style={{flex: 1, backgroundColor: colors.background}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png',
                  // uri: auth().currentUser.photoURL,
                }}
                size={50}
              />
              <View style={{marginLeft: 15}}>
                <Title style={styles.title}>
                  {' '}
                  {auth().currentUser.displayName}
                </Title>
                <Caption style={styles.caption}>
                  {userName.toLowerCase()}
                </Caption>
              </View>
            </View>
            {/* <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  179
                </Paragraph>
                <Caption style={styles.caption}>following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  179
                </Paragraph>
                <Caption style={styles.caption}>following</Caption>
              </View>
            </View> */}
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={(color, size) => (
                <Icon name="home-outline" color={colors.text} size={25} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            {/* <DrawerItem
              icon={(color, size) => (
                <Icon name="account-outline" color={colors.text} size={25} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            /> */}
            <DrawerItem
              icon={(color, size) => (
                <Icon name="bookmark-outline" color={colors.text} size={25} />
              )}
              label="Wishlists"
              onPress={() => {
                props.navigation.navigate('Wishlist');
              }}
            />
            {/* <DrawerItem
              icon={(color, size) => (
                <Icon2 name="settings-outline" color={colors.text} size={25} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Explore');
              }}
            /> */}
            {/* <DrawerItem
              icon={(color, size) => (
                <Icon
                  name="account-check-outline"
                  color={colors.text}
                  size={25}
                />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            /> */}
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={(color, size) => (
            <Icon name="exit-to-app" color={colors.text} size={25} />
          )}
          label="Sing Out"
          onPress={() => {
            singOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export {DrawerContent};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginTop: 10,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
