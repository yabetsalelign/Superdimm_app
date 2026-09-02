// SuperDimm — Home Tab
// Customer account overview placeholder.

import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* ── App bar ── */}
        <View style={[styles.appBar, { borderBottomColor: theme.border }]}>
          <View style={styles.appBarBrand}>
            <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
              <ThemedText
                variant="label"
                style={{ color: theme.primaryForeground, fontWeight: '800' }}
              >
                S
              </ThemedText>
            </View>
            <ThemedText variant="h3" style={styles.appBarTitle}>
              SuperDimm
            </ThemedText>
          </View>
          <TouchableOpacity
            style={[styles.notifBtn, { backgroundColor: theme.primarySubtle }]}
            onPress={() => router.push('/(tabs)/alerts')}
            accessibilityLabel="Alerts"
          >
            <Ionicons name="notifications-outline" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Welcome greeting ── */}
          <View style={styles.greeting}>
            <ThemedText variant="h1">Welcome back</ThemedText>
            <ThemedText variant="body" muted>
              Your account overview will appear here once you sign in.
            </ThemedText>
          </View>

          {/* ── Account summary cards ── */}
          <View style={styles.cardGrid}>
            <Card style={styles.summaryCard}>
              <ThemedText variant="caption" muted>Account Status</ThemedText>
              <ThemedText variant="h3" style={styles.cardValue}>Active</ThemedText>
              <Badge label="In Good Standing" variant="success" />
            </Card>

            <Card style={styles.summaryCard}>
              <ThemedText variant="caption" muted>Service Plan</ThemedText>
              <ThemedText variant="h3" style={styles.cardValue} numberOfLines={1}>
                Standard Plan
              </ThemedText>
              <ThemedText variant="caption" muted>100% SLA</ThemedText>
            </Card>
          </View>

          {/* ── Quick actions banner ── */}
          <Card style={[styles.actionBanner, { borderColor: theme.border }]} flat>
            <View style={styles.actionBannerContent}>
              <View style={styles.actionBannerText}>
                <ThemedText variant="label" style={{ fontWeight: '600' }}>
                  Experiencing network issues?
                </ThemedText>
                <ThemedText variant="caption" muted>
                  Submit a support request and track it here.
                </ThemedText>
              </View>
              <Button
                label="Report"
                variant="primary"
                size="sm"
                onPress={() => router.push('/(tabs)/requests')}
              />
            </View>
          </Card>

          {/* ── Recent activity placeholder ── */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Recent Activity
            </ThemedText>
            <Card>
              <View style={styles.emptyRow}>
                <Ionicons
                  name="receipt-outline"
                  size={28}
                  color={theme.mutedForeground}
                />
                <ThemedText variant="bodySmall" muted style={styles.emptyText}>
                  No recent billing or service activity.
                </ThemedText>
              </View>
            </Card>
          </View>

          {/* ── Sign in CTA (Phase 1 placeholder) ── */}
          <View style={[styles.authBanner, { backgroundColor: theme.primarySubtle, borderColor: theme.primaryLight, borderWidth: 1, borderRadius: Radius.lg }]}>
            <ThemedText variant="labelUppercase" primary style={{ marginBottom: Spacing[1] }}>
              Phase 1 — Navigation Testing
            </ThemedText>
            <ThemedText variant="bodySmall" muted>
              Authentication will be implemented in Phase 2. Tap below to preview the login screen.
            </ThemedText>
            <Button
              label="Preview Login Screen"
              variant="secondary"
              size="sm"
              style={{ marginTop: Spacing[3] }}
              onPress={() => router.push('/auth/login')}
            />
          </View>

          <View style={styles.footer}>
            <ThemedText variant="caption" muted style={styles.footerText}>
              Need help? Call +1 555-SUPER-DIMM
            </ThemedText>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
  },
  appBarBrand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  logoMark: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[5],
    paddingBottom: Spacing[8],
  },
  greeting: {
    gap: Spacing[1],
  },
  cardGrid: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  summaryCard: {
    flex: 1,
    gap: Spacing[1],
  },
  cardValue: {
    marginVertical: Spacing[1],
  },
  actionBanner: {
    backgroundColor: 'transparent',
  },
  actionBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  actionBannerText: {
    flex: 1,
    gap: 3,
  },
  section: {
    gap: Spacing[3],
  },
  sectionTitle: {
    fontSize: 17,
  },
  emptyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    paddingVertical: Spacing[2],
  },
  emptyText: {
    flex: 1,
  },
  authBanner: {
    padding: Spacing[4],
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing[2],
  },
  footerText: {
    textAlign: 'center',
  },
});
