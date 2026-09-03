// SuperDimm — Home Tab
// Customer account overview with live subscriber data, SLA indicator, and quick actions.
// Optimized for 375-430px viewports with responsive card layouts and robust states.

import React, { useEffect, useState, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import { storage } from '@/services/storage';
import type { CustomerProfileDetail } from '@/types';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isNarrow = width < 390;

  const [customer, setCustomer] = useState<CustomerProfileDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const loadData = async () => {
    setErrorMsg(null);
    const res = await api.customer.getProfile();
    if (res.success && res.data) {
      setCustomer(res.data);
    } else {
      const cached = await storage.getCustomer();
      if (cached) {
        setCustomer(cached as CustomerProfileDetail);
      } else {
        setErrorMsg('Unable to retrieve account profile. Pull down to retry.');
      }
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const firstName = customer?.name ? customer.name.split(' ')[0] : 'Subscriber';

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
            accessibilityLabel="View Alerts"
          >
            <Ionicons name="notifications-outline" size={20} color={theme.primary} />
          </TouchableOpacity>
        </View>

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
          {/* ── Welcome Greeting ── */}
          <View style={styles.greeting}>
            <ThemedText variant="h1" numberOfLines={1}>
              {isLoading && !customer ? 'Welcome' : `Welcome, ${firstName}`}
            </ThemedText>
            <ThemedText variant="bodySmall" muted numberOfLines={1}>
              {customer?.email ? customer.email : 'Telecom Subscriber Services'}
            </ThemedText>
          </View>

          {/* ── Error Banner if any ── */}
          {errorMsg ? (
            <View
              style={[
                styles.errorCard,
                { backgroundColor: theme.errorBackground, borderColor: theme.errorBorder },
              ]}
            >
              <Ionicons name="alert-circle-outline" size={20} color={theme.error} />
              <ThemedText variant="caption" style={{ color: theme.error, flex: 1 }}>
                {errorMsg}
              </ThemedText>
            </View>
          ) : null}

          {/* ── Account Summary Cards (Responsive Grid / Stack) ── */}
          <View style={[styles.cardGrid, isNarrow && styles.cardGridNarrow]}>
            <Card style={styles.summaryCard}>
              <View style={styles.cardHeaderRow}>
                <ThemedText variant="caption" muted>Account Status</ThemedText>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={16}
                  color={customer?.status === 'active' ? theme.success : theme.warning}
                />
              </View>
              <ThemedText variant="h3" style={styles.cardValue}>
                {customer?.status ? customer.status.toUpperCase() : 'ACTIVE'}
              </ThemedText>
              <Badge
                label={customer?.status === 'active' ? 'In Good Standing' : 'Pending'}
                variant={customer?.status === 'active' ? 'success' : 'warning'}
              />
            </Card>

            <Card style={styles.summaryCard}>
              <View style={styles.cardHeaderRow}>
                <ThemedText variant="caption" muted>Service Plan</ThemedText>
                <Ionicons name="wifi-outline" size={16} color={theme.primary} />
              </View>
              <ThemedText variant="h3" style={styles.cardValue} numberOfLines={1}>
                {customer?.plan || 'Enterprise Fiber'}
              </ThemedText>
              <ThemedText variant="caption" muted numberOfLines={1}>
                {customer?.activeRequestsCount
                  ? `${customer.activeRequestsCount} active case${customer.activeRequestsCount > 1 ? 's' : ''}`
                  : 'SLA Guaranteed'}
              </ThemedText>
            </Card>
          </View>

          {/* ── Action Banner: Report Outage / Issue ── */}
          <Card style={[styles.actionBanner, { borderColor: theme.border }]} flat>
            <View style={styles.actionBannerContent}>
              <View style={styles.actionBannerText}>
                <ThemedText variant="label" style={{ fontWeight: '600' }}>
                  Experiencing network drops or issues?
                </ThemedText>
                <ThemedText variant="caption" muted>
                  Submit an official case for automated dispatch.
                </ThemedText>
              </View>
              <Button
                label="Report"
                variant="primary"
                size="sm"
                onPress={() => router.push('/requests/create')}
              />
            </View>
          </Card>

          {/* ── Recent Activity / Cases ── */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ThemedText variant="h3" style={styles.sectionTitle}>
                Recent Account Activity
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/(tabs)/requests')}>
                <ThemedText variant="caption" primary style={{ fontWeight: '600' }}>
                  View All
                </ThemedText>
              </TouchableOpacity>
            </View>

            <Card>
              {isLoading && !customer ? (
                <LoadingState fullScreen={false} message="Loading activity..." />
              ) : customer?.recentTransactions && customer.recentTransactions.length > 0 ? (
                customer.recentTransactions.slice(0, 3).map((txn, index) => (
                  <View
                    key={txn.id || String(index)}
                    style={[
                      styles.activityRow,
                      index > 0 && {
                        borderTopWidth: 1,
                        borderTopColor: theme.border,
                        paddingTop: Spacing[3],
                      },
                    ]}
                  >
                    <View style={styles.activityInfo}>
                      <ThemedText variant="label" numberOfLines={1}>
                        {txn.description}
                      </ThemedText>
                      <ThemedText variant="caption" muted>
                        {new Date(txn.createdAt).toLocaleDateString()} • {txn.type.toUpperCase()}
                      </ThemedText>
                    </View>
                    <ThemedText variant="label" primary style={{ fontWeight: '700' }}>
                      ${txn.amount.toFixed(2)}
                    </ThemedText>
                  </View>
                ))
              ) : customer?.recentRequests && customer.recentRequests.length > 0 ? (
                customer.recentRequests.slice(0, 3).map((req, index) => (
                  <TouchableOpacity
                    key={req.id || String(index)}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/requests/${req.id}` as any)}
                    style={[
                      styles.activityRow,
                      index > 0 && {
                        borderTopWidth: 1,
                        borderTopColor: theme.border,
                        paddingTop: Spacing[3],
                      },
                    ]}
                  >
                    <View style={styles.activityInfo}>
                      <ThemedText variant="label" numberOfLines={1}>
                        {req.title}
                      </ThemedText>
                      <ThemedText variant="caption" muted>
                        {new Date(req.createdAt).toLocaleDateString()} • {req.category.toUpperCase()}
                      </ThemedText>
                    </View>
                    <Badge
                      label={req.status === 'resolved' ? 'Resolved' : 'Active'}
                      variant={req.status === 'resolved' ? 'success' : 'warning'}
                    />
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyRow}>
                  <Ionicons name="receipt-outline" size={24} color={theme.mutedForeground} />
                  <ThemedText variant="bodySmall" muted style={styles.emptyText}>
                    No recent transactions or tickets recorded.
                  </ThemedText>
                </View>
              )}
            </Card>
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <ThemedText variant="caption" muted style={styles.footerText}>
              Need immediate support? Call +1 555-SUPER-DIMM
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
    width: 32,
    height: 32,
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
    width: 38,
    height: 38,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  greeting: {
    gap: 2,
    paddingTop: Spacing[1],
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[3],
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  cardGrid: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  cardGridNarrow: {
    flexDirection: 'column',
  },
  summaryCard: {
    flex: 1,
    gap: Spacing[1],
    padding: Spacing[4],
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardValue: {
    marginVertical: Spacing[1],
    fontSize: 18,
  },
  actionBanner: {
    backgroundColor: 'transparent',
    padding: Spacing[3],
  },
  actionBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  actionBannerText: {
    flex: 1,
    gap: 2,
  },
  section: {
    gap: Spacing[2],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16,
  },
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing[2],
  },
  activityInfo: {
    flex: 1,
    gap: 2,
    marginRight: Spacing[2],
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
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing[2],
  },
  footerText: {
    textAlign: 'center',
  },
});
