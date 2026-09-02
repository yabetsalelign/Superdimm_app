// SuperDimm Mobile — Login Screen (Phase 1 Placeholder)
// Clearly marked as a temporary test placeholder before Phase 2 JWT integration.

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BrandHeader } from '@/components/BrandHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Phase 1: Simulate validation and return to main tabs
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Phase 1 Navigation Test',
        'Real JWT authentication will be implemented in Phase 2. Navigating back to home.',
        [{ text: 'Continue', onPress: () => router.replace('/(tabs)') }]
      );
    }, 600);
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Top Bar with back button */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              accessibilityLabel="Back"
            >
              <Ionicons name="arrow-back" size={24} color={theme.foreground} />
            </TouchableOpacity>
            <Badge label="Phase 1 Placeholder" variant="warning" />
          </View>

          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            {/* SuperDimm Branding */}
            <BrandHeader />

            <Card style={styles.loginCard}>
              <ThemedText variant="h2" style={styles.cardTitle}>
                Sign In
              </ThemedText>
              <ThemedText variant="caption" muted style={styles.cardSubtitle}>
                Access your telecom subscription and manage support tickets.
              </ThemedText>

              <View style={styles.fieldGroup}>
                <ThemedText variant="label">Email Address</ThemedText>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="subscriber@example.com"
                  placeholderTextColor={theme.placeholderText}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={[
                    styles.input,
                    {
                      backgroundColor: theme.input,
                      borderColor: theme.border,
                      color: theme.foreground,
                    },
                  ]}
                />
              </View>

              <View style={styles.fieldGroup}>
                <ThemedText variant="label">Password</ThemedText>
                <View style={styles.passwordContainer}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••••••"
                    placeholderTextColor={theme.placeholderText}
                    secureTextEntry={!showPassword}
                    style={[
                      styles.passwordInput,
                      {
                        backgroundColor: theme.input,
                        borderColor: theme.border,
                        color: theme.foreground,
                      },
                    ]}
                  />
                  <TouchableOpacity
                    style={styles.eyeBtn}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={theme.mutedForeground}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <Button
                label="Sign In to Customer Portal"
                variant="primary"
                loading={isLoading}
                onPress={handleLogin}
                style={{ marginTop: Spacing[2] }}
              />

              <View style={[styles.cardDivider, { backgroundColor: theme.border }]} />

              <View style={styles.noticeBox}>
                <ThemedText variant="caption" muted style={{ textAlign: 'center' }}>
                  Real token exchange and encrypted storage will be activated in Phase 2.
                </ThemedText>
              </View>
            </Card>

            <TouchableOpacity
              style={styles.cancelLink}
              onPress={() => router.replace('/(tabs)')}
            >
              <ThemedText variant="caption" primary style={{ fontWeight: '600' }}>
                Return to Dashboard
              </ThemedText>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
  },
  backBtn: {
    padding: Spacing[1],
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[5],
    paddingBottom: Spacing[8],
  },
  loginCard: {
    padding: Spacing[5],
    gap: Spacing[4],
  },
  cardTitle: {
    fontSize: 22,
  },
  cardSubtitle: {
    marginTop: -Spacing[2],
  },
  fieldGroup: {
    gap: Spacing[2],
  },
  input: {
    height: 46,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    fontSize: 14,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    height: 46,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingLeft: Spacing[3],
    paddingRight: 44,
    fontSize: 14,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  cardDivider: {
    height: 1,
    marginVertical: Spacing[1],
  },
  noticeBox: {
    alignItems: 'center',
  },
  cancelLink: {
    alignItems: 'center',
    marginTop: -Spacing[2],
  },
});
