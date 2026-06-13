import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GAME_HTML from './gameHtml';

const SAVE_KEY = 'puffyCitrus_v2';

export default function App() {
  const [saved, setSaved] = useState(null); // null = still loading
  const lastWrite = useRef('');

  // Load saved progress from device storage before showing the game
  useEffect(() => {
    (async () => {
      try {
        const s = await AsyncStorage.getItem(SAVE_KEY);
        setSaved(s || '');
      } catch (e) {
        setSaved('');
      }
    })();
  }, []);

  if (saved === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#d8557e" />
      </View>
    );
  }

  // Inject the saved game state so the web game can pick it up on boot
  const inject = saved
    ? `window.__INITIAL_SAVE__ = ${JSON.stringify(saved)}; true;`
    : 'true;';

  // The game posts its full state on every save; we persist it to the device
  const onMessage = (e) => {
    const data = e.nativeEvent.data;
    if (data && data !== lastWrite.current) {
      lastWrite.current = data;
      AsyncStorage.setItem(SAVE_KEY, data).catch(() => {});
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fffdf7" />
      <WebView
        originWhitelist={['*']}
        source={{ html: GAME_HTML }}
        injectedJavaScriptBeforeContentLoaded={inject}
        onMessage={onMessage}
        style={styles.web}
        scrollEnabled={false}
        bounces={false}
        overScrollMode="never"
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fffdf7' },
  web: { flex: 1, backgroundColor: '#fffdf7' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffd9a0' },
});
