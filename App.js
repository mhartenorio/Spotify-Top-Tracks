import { StyleSheet, Text, Image, View, SafeAreaView, Pressable, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors"
import Song from './Extra Screens/Screen 1';
import Screen2 from './Extra Screens/Screen 2';
import Screen3 from './Extra Screens/Screen 3';
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery,
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    if (token) {
      // TODO: Select which option you want: Top Tracks or Album Tracks
      // Comment out the one you are not using
      myTopTracks(setTracks, token);
      // albumTracks(ALBUM_ID, setTracks, token);
    }
  }, [token]);

  const renderItem = (item, index) => (
    <Song
      title={item.name}
      id={item.id}
      index={String(index)}
      artist={item.artists[0].name}
      album={item.album.name}
      duration={item.duration_ms}
      image={item.album.images[0]} 
      preview={item.preview_url} 
      info={item.external_urls.spotify} />
  );

  if (token) {
    function Home({}) {
      return (
      <SafeAreaView style={styles.container}>
        <View style={{height: '8%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '2%'}}>
            <Image source={require("./assets/spotify-logo.png")} style={{flex: 1, width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain', marginRight: '-20%' }}/>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 24, alignSelf: 'center', marginRight: '20%' }}>MY TOP TRACKS</Text>
        </View>
        <FlatList
          data={tracks} 
          renderItem={({item, index}) => renderItem(item, index + 1)} 
          keyExtractor={(item) => item.id} 
        />
      </SafeAreaView>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator 
        screenOptions= {{
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            alignSelf: 'center',
            color: 'white',
            fontWeight: 'bold',
          },
        }}>
          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Song details" component={Screen2}/>
          <Stack.Screen name="Song preview" component={Screen3}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={() => {promptAsync()}}>
          <View style={{width: '65%', height: '24%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center', backgroundColor: Colors.spotify, borderRadius: '100%'}}>
            <Image source={require("./assets/spotify-logo.png")} style={{flex: 1, width: 30, height: 30, alignSelf: 'center', resizeMode: 'contain' }}/>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16, alignSelf: 'center', marginRight: '5%' }}>CONNECT WITH SPOTIFY</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexGrow: 1
  }
});
