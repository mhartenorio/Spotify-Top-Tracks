import { StyleSheet, Text, Image, View, SafeAreaView, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import utils from "./utils/millisToMinuteSeconds.js"
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds.js";

export default function GroceryItem({ title, id, index, artist, album, image, duration }) {
    return (
        <View style={{height: '16%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '4%', marginEnd: '-8%', marginBottom: '-8%'}}>
            <View style={{width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.secondaryText}>{index}</Text>
            </View>
            <View style={{width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={styles.image} source={image}/>
            </View>
            <View style={{width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                <Text numberOfLines={1} style={styles.text}>{title}</Text>
                <Text numberOfLines={1} style={styles.secondaryText}>{artist}</Text>
            </View>
            <View style={{width: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                <Text numberOfLines={1} style={styles.text}>{album}</Text>
            </View>
            <View style={{width: '10%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>{millisToMinutesAndSeconds(duration)} </Text>
            </View>
        </View>
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
    image: {
      width: 50,
      height: 50,
      resizeMode: 'contain'
    }
  });