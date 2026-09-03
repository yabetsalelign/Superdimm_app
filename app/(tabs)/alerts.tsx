// SuperDimm — Alerts Tab
// Real subscriber notifications derived from active tickets and account activity.
// Clear unread/read state styling, category filtering, and direct case navigation.

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import type { CustomerAlert } from '@/types';

type AlertFilter = 'all' | 'request' | 'billing' | 'account';

export default function AlertsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [alerts, setAlerts] = useState<CustomerAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<AlertFilter>('all');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadAlerts = async () => {
    setErrorMessage(null);
    const res = await api.notifications.list();
    if (res.success && res.data) {
      setAlerts(res.data);
    } else {
      setErrorMessage('Unable to load notifications. Pull down to retry.');
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAlerts();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadAlerts();
    }, [])
  );

  const filteredAlerts = useMemo(() => {
    if (activeFilter === 'all') return alerts;
    return alerts.filter((a) => a.type === activeFilter);
  }, [alerts, activeFilter]);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="Alerts & Notices"
          subtitle={
            unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'System notifications and account activity'
          }
        />

        {/* Filter Pills */}
        <View style={[styles.filterBar, { borderBottomColor: theme.border }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsScroll}
          >
            {(
              [
                { id: 'all', label: `All (${alerts.length})` },
                {
                  id: 'request',
                  label: `Tickets (${alerts.filter((a) => a.type === 'request').length})`,
                },
                {
                  id: 'billing',
                  label: `Billing (${alerts.filter((a) => a.type === 'billing').length})`,
                },
                {
                  id: 'account',
                  label: `Account (${alerts.filter((a) => a.type === 'account').length})`,
                },
              ] as const
            ).map((f) => {
              const isSelected = activeFilter === f.id;
              return (
                <TouchableOpacity
                  key={f.id}
                  style={[
                    styles.filterChip,
                    isSelected && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.border },
                  ]}
                  onPress={() => setActiveFilter(f.id)}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: isSelected ? theme.primaryForeground : theme.foreground,
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {f.label}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
          {errorMessage ? (
            <View
              style={[
                styles.errorCard,
                { backgroundColor: theme.errorBackground, borderColor: theme.errorBorder },
              ]}
            >
              <Ionicons name="alert-circle-outline" size={20} color={theme.error} />
              <ThemedText variant="caption" style={{ color: theme.error, flex: 1 }}>
                {errorMessage}
              </ThemedText>
            </View>
          ) : null}

          <View style={styles.section}>
            {isLoading ? (
              <LoadingState fullScreen={false} message="Loading account notifications..." />
            ) : filteredAlerts.length === 0 ? (
              <EmptyState
                iconName="notifications-off-outline"
                title={alerts.length === 0 ? 'No new alerts' : 'No matching alerts'}
                description={
                  alerts.length === 0
                    ? 'Your subscriber account has no active operational notices.'
                    : 'No notifications match the selected filter category.'
                }
                actionLabel={alerts.length > 0 ? 'Show All Alerts' : undefined}
                onAction={alerts.length > 0 ? () => setActiveFilter('all') : undefined}
              />
            ) : (
              filteredAlerts.map((alert) => {
                const badgeVariant: BadgeVariant =
                  alert.severity === 'warning'
                    ? 'warning'
                    : alert.severity === 'error'
                    ? 'error'
                    : alert.severity === 'success'
                    ? 'success'
                    : 'info';

                const iconName =
                  alert.type === 'request'
                    ? 'construct-outline'
                    : alert.type === 'billing'
                    ? 'receipt-outline'
                    : 'shield-outline';

                const isInteractive = Boolean(alert.actionRoute);

                return (
                  <TouchableOpacity
                    key={alert.id}
                    activeOpacity={isInteractive ? 0.7 : 1}
                    disabled={!isInteractive}
                    onPress={() => {
                      if (alert.actionRoute) {
                        router.push(alert.actionRoute as any);
                      }
                    }}
                  >
                    <Card
                      style={[
                        styles.alertCard,
                        !alert.isRead && {
                          borderColor: theme.primaryLight,
                          backgroundColor: theme.surface,
                        },
                      ]}
                    >
                      <View style={styles.alertHeader}>
                        <View style={styles.alertTitleRow}>
                          {!alert.isRead ? (
                            <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />
                          ) : null}
                          <Ionicons name={iconName} size={18} color={theme.primary} />
                          <ThemedText
                            variant="label"
                            style={[styles.alertTitle, !alert.isRead && { fontWeight: '700' }]}
                            numberOfLines={2}
                          >
                            {alert.title}
                          </ThemedText>
                        </View>
                        <Badge
                          label={alert.type ? alert.type.toUpperCase() : 'NOTICE'}
                          variant={badgeVariant}
                        />
                      </View>

                      <ThemedText variant="bodySmall" muted style={styles.alertMessage}>
                        {alert.message}
                      </ThemedText>

                      <View style={styles.alertFooter}>
                        <ThemedText variant="caption" muted style={styles.alertTimestamp}>
                          {new Date(alert.createdAt).toLocaleString(undefined, {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </ThemedText>
                        {isInteractive ? (
                          <View style={styles.actionPrompt}>
                            <ThemedText variant="caption" primary style={{ fontWeight: '600' }}>
                              View Case
                            </ThemedText>
                            <Ionicons name="chevron-forward" size={14} color={theme.primary} />
                          </View>
                        ) : null}
                      </View>
                    </Card>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  filterBar: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderBottomWidth: 1,
  },
  filterPillsScroll: {
    flexDirection: 'row',
    gap: Spacing[2],
    paddingVertical: 2,
  },
  filterChip: {
    paddingVertical: 5,
    paddingHorizontal: Spacing[3],
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[3],
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  section: {
    gap: Spacing[3],
  },
  alertCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing[2],
  },
  alertTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  alertTitle: {
    fontSize: 14,
    lineHeight: 18,
    flex: 1,
  },
  alertMessage: {
    lineHeight: 18,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[1],
  },
  alertTimestamp: {
    fontSize: 11,
  },
  actionPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
