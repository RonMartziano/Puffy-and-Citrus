import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GAME_HTML from './gameHtml';

const SAVE_KEY = 'puffyCitrus_v2';

// Optional: fill these in to enable cloud sync + login inside the phone app too.
// (Same values as your GitHub secrets. Leave blank to keep the app local-only.)
const SUPABASE = { url: '', anonKey: '' };

function Game() {
  // Insets = the space taken by the status bar (top) and gesture nav / notch.
  // We pad the game by these so the system bars never overlap the UI.
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(null); // null = still loading
  const lastWrite = useRef('');

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

  const inject =
    (saved ? `window.__INITIAL_SAVE__ = ${JSON.stringify(saved)};` : '') +
    (SUPABASE.url ? `window.__SUPABASE__ = ${JSON.stringify(SUPABASE)};` : '') +
    'true;';

  const onMessage = (e) => {
    const data = e.nativeEvent.data;
    if (data && data !== lastWrite.current) {
      lastWrite.current = data;
      AsyncStorage.setItem(SAVE_KEY, data).catch(() => {});
    }
  };

  return (
    <View
      style={[
        styles.safe,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
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
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        allowsBackForwardNavigationGestures={false}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Game />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fffdf7' },
  web: { flex: 1, backgroundColor: '#fffdf7' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffd9a0' },
});
