// SuperDimm Mobile — Root Layout
// Sets up Expo Router Stack navigator, loads fonts, handles splash screen.

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

// Keep the splash screen visible until we explicitly hide it.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const scheme = useColorScheme();
  const theme = Colors[scheme];

  useEffect(() => {
    // In Phase 2 this is where we will restore a saved auth session
    // before hiding the splash. For now, hide immediately.
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
          animation: 'fade',
        }}
      >
        {/* Main tab shell */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Service request sub-screens */}
        <Stack.Screen name="requests/index" options={{ headerShown: false }} />
        <Stack.Screen name="requests/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="requests/create" options={{ headerShown: false }} />

        {/* Auth group */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}
