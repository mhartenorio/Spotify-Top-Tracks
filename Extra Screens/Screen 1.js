import { StyleSheet, Text, Image, View, SafeAreaView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "../utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "../utils/constants";
import Colors from "../Themes/colors"
import utils from "../utils/millisToMinuteSeconds.js"
import millisToMinutesAndSeconds from "../utils/millisToMinuteSeconds.js";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Screen2 from './Screen 2';
import Screen3 from './Screen 3';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

export default function SongObject({ title, id, index, artist, album, image, duration, preview, info }) {
  const navigation = useNavigation();
    return (
      <Pressable onPress={() => {navigation.navigate("Song details", {paramName: info})}} >
        <View style={{height: 96, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '4%', marginEnd: '-8%', marginBottom: '-8%'}}>
            <Pressable onPress={(e) => {e.stopPropagation(); navigation.navigate("Song preview", {paramName: preview})}}>
              <View style={{width: 20, height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '100%', resizeMode: 'contain'}}>
                <Ionicons name="play-circle" size={20} color={Colors.spotify} />
              </View>
            </Pressable>
            <View style={{width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={image}/>
            </View>
            <View style={{width: '40%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                <Text numberOfLines={1} style={styles.text}>{title}</Text>
                <Text numberOfLines={1} style={styles.secondaryText}>{artist}</Text>
            </View>
            <View style={{width: '30%', height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                <Text numberOfLines={1} style={styles.text}>{album}</Text>
            </View>
            <View style={{width: '10%', height: '100%',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>{millisToMinutesAndSeconds(duration)} </Text>
            </View>
        </View>
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 12,
      color: 'white',
    },
    secondaryText: {
        fontSize: 12,
       color: Colors.gray,
    },

    playButton: {
      fontSize: 12,
      color: Colors.background,
    }, 
    image: {
      width: 50,
      height: 50,
      resizeMode: 'contain'
    }
  });