// SuperDimm — Profile Tab
// Mobile subscriber account screen with provisioning metadata and danger-styled sign out.

import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import { storage } from '@/services/storage';
import type { CustomerProfileDetail } from '@/types';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [customer, setCustomer] = useState<CustomerProfileDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadProfile = async () => {
    const res = await api.customer.getProfile();
    if (res.success && res.data) {
      setCustomer(res.data);
    } else {
      const cached = await storage.getCustomer();
      if (cached) {
        setCustomer(cached as CustomerProfileDetail);
      }
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadProfile();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to log out of your subscriber account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await api.auth.logout();
            router.replace('/auth/login');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="Account Profile"
          subtitle="Subscriber details and application settings"
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
            />
          }
        >
          {isLoading && !customer ? (
            <LoadingState fullScreen={false} message="Loading account profile..." />
          ) : (
            <>
              {/* Customer Avatar & Primary Info */}
              <Card style={styles.profileHeaderCard}>
                <View style={[styles.avatarBox, { backgroundColor: theme.primarySubtle }]}>
                  <Ionicons name="person" size={36} color={theme.primary} />
                </View>
                <View style={styles.profileMeta}>
                  <ThemedText variant="h2" style={styles.nameText} numberOfLines={1}>
                    {customer?.name || 'Subscriber Account'}
                  </ThemedText>
                  <ThemedText variant="caption" muted numberOfLines={1}>
                    {customer?.email || 'No email registered'}
                  </ThemedText>
                  {customer?.id ? (
                    <ThemedText variant="mono" primary style={styles.idText}>
                      ACC-{customer.id.slice(-6).toUpperCase()}
                    </ThemedText>
                  ) : null}
                </View>
                <Badge
                  label={customer?.status === 'active' ? 'Verified Subscriber' : 'Pending Activation'}
                  variant={customer?.status === 'active' ? 'success' : 'warning'}
                />
              </Card>

              {/* Provisioning Details */}
              <View style={styles.section}>
                <ThemedText variant="h3" style={styles.sectionTitle}>
                  Provisioning Details
                </ThemedText>

                <Card style={styles.detailsCard}>
                  <View style={styles.detailRow}>
                    <ThemedText variant="caption" muted>Primary Contact</ThemedText>
                    <ThemedText variant="label" numberOfLines={1}>
                      {customer?.phone || customer?.email || 'Registered'}
                    </ThemedText>
                  </View>

                  <View style={[styles.divider, { backgroundColor: theme.border }]} />

                  <View style={styles.detailRow}>
                    <ThemedText variant="caption" muted>Active Service Plan</ThemedText>
                    <ThemedText variant="label" numberOfLines={1} style={{ maxWidth: '60%' }}>
                      {customer?.plan || 'Standard Service'}
                    </ThemedText>
                  </View>

                  <View style={[styles.divider, { backgroundColor: theme.border }]} />

                  <View style={styles.detailRow}>
                    <ThemedText variant="caption" muted>Troubleshooting Cases</ThemedText>
                    <ThemedText variant="label">
                      {customer?.totalRequestsCount ?? 0} total ({customer?.activeRequestsCount ?? 0} active)
                    </ThemedText>
                  </View>
                </Card>
              </View>

              {/* Navigation Actions */}
              <View style={styles.section}>
                <ThemedText variant="h3" style={styles.sectionTitle}>
                  Account Navigation
                </ThemedText>

                <Card style={styles.menuCard}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(tabs)/services')}
                  >
                    <View style={styles.menuItemLeft}>
                      <Ionicons name="wifi-outline" size={20} color={theme.foreground} />
                      <ThemedText variant="bodySmall">View Service Subscription</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
                  </TouchableOpacity>

                  <View style={[styles.divider, { backgroundColor: theme.border }]} />

                  <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(tabs)/requests')}
                  >
                    <View style={styles.menuItemLeft}>
                      <Ionicons name="clipboard-outline" size={20} color={theme.foreground} />
                      <ThemedText variant="bodySmall">Support Tickets & History</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
                  </TouchableOpacity>

                  <View style={[styles.divider, { backgroundColor: theme.border }]} />

                  <TouchableOpacity
                    style={styles.menuItem}
                    activeOpacity={0.7}
                    onPress={() => router.push('/(tabs)/alerts')}
                  >
                    <View style={styles.menuItemLeft}>
                      <Ionicons name="notifications-outline" size={20} color={theme.foreground} />
                      <ThemedText variant="bodySmall">System Alerts & Notices</ThemedText>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
                  </TouchableOpacity>
                </Card>
              </View>

              {/* Danger-Styled Sign Out Button */}
              <TouchableOpacity
                style={[
                  styles.signOutBtn,
                  {
                    borderColor: theme.errorBorder,
                    backgroundColor: theme.errorBackground,
                  },
                ]}
                onPress={handleSignOut}
                activeOpacity={0.8}
              >
                <Ionicons name="log-out-outline" size={20} color={theme.error} />
                <ThemedText
                  variant="label"
                  style={{ color: theme.error, fontWeight: '700' }}
                >
                  Sign Out
                </ThemedText>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  profileHeaderCard: {
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[2],
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[1],
  },
  profileMeta: {
    alignItems: 'center',
    gap: 3,
  },
  nameText: {
    fontSize: 20,
  },
  idText: {
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    gap: Spacing[2],
  },
  sectionTitle: {
    fontSize: 16,
  },
  detailsCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing[2],
  },
  divider: {
    height: 1,
  },
  menuCard: {
    padding: Spacing[2],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[2],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    height: 48,
    borderRadius: Radius.md,
    borderWidth: 1,
    marginTop: Spacing[1],
  },
});
