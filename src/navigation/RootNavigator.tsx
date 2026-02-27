import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useAuthStore } from '@/src/stores/authstore';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

export default function RootNavigator() {
  const { isAuthenticated, isHydrated, hydrate } = useAuthStore();

  // Restore session from SecureStore on first launch
  useEffect(() => {
    hydrate();
  }, []);

  // Show a splash/loading screen while SecureStore is being read
  if (!isHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  // Automatically switches navigator when isAuthenticated changes
  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
});
