// SuperDimm Mobile — Login Screen
// Real JWT Bearer authentication flow with backend validation and error handling.

import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BrandHeader } from '@/components/BrandHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import { storage } from '@/services/storage';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email address and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const res = await api.auth.login(email.trim(), password.trim());

    setIsLoading(false);

    if (res.success) {
      await storage.saveSession(res.data);
      router.replace('/(tabs)');
    } else {
      setErrorMessage(
        res.error.message || 'Authentication failed. Please check your credentials.'
      );
    }
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
          </View>

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* SuperDimm Branding */}
            <BrandHeader />

            <Card style={styles.loginCard}>
              <ThemedText variant="h2" style={styles.cardTitle}>
                Sign In
              </ThemedText>
              <ThemedText variant="caption" muted style={styles.cardSubtitle}>
                Access your telecom subscription, billing statements, and support tickets.
              </ThemedText>

              {errorMessage ? (
                <View
                  style={[
                    styles.errorBanner,
                    {
                      backgroundColor: theme.errorBackground,
                      borderColor: theme.errorBorder,
                    },
                  ]}
                >
                  <Ionicons name="alert-circle" size={18} color={theme.error} />
                  <ThemedText
                    variant="caption"
                    style={{ color: theme.error, flex: 1, fontWeight: '500' }}
                  >
                    {errorMessage}
                  </ThemedText>
                </View>
              ) : null}

              <View style={styles.fieldGroup}>
                <ThemedText variant="label">Email Address</ThemedText>
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errorMessage) setErrorMessage(null);
                  }}
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
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errorMessage) setErrorMessage(null);
                    }}
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
                    accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
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
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[3],
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  fieldGroup: {
    gap: Spacing[2],
  },
  input: {
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    fontSize: 15,
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingLeft: Spacing[3],
    paddingRight: 48,
    fontSize: 15,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  cancelLink: {
    alignItems: 'center',
    marginTop: -Spacing[2],
  },
});
