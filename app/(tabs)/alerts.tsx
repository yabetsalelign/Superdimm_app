// SuperDimm — Alerts Tab
// Real subscriber notifications derived from active tickets and account activity.

import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
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

export default function AlertsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [alerts, setAlerts] = useState<CustomerAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadAlerts = async () => {
    const res = await api.notifications.list();
    if (res.success && res.data) {
      setAlerts(res.data);
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadAlerts();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="Alerts & Notices"
          subtitle="System notifications and account announcements"
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
          <View style={styles.section}>
            {isLoading ? (
              <LoadingState fullScreen={false} message="Loading account notifications..." />
            ) : alerts.length === 0 ? (
              <EmptyState
                iconName="notifications-off-outline"
                title="No new alerts"
                description="Your subscriber account has no pending operational notices."
              />
            ) : (
              alerts.map((alert) => {
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

                return (
                  <TouchableOpacity
                    key={alert.id}
                    activeOpacity={alert.actionRoute ? 0.7 : 1}
                    onPress={() => {
                      if (alert.actionRoute) {
                        router.push(alert.actionRoute as any);
                      }
                    }}
                  >
                    <Card style={styles.alertCard}>
                      <View style={styles.alertHeader}>
                        <View style={styles.alertTitleRow}>
                          {!alert.isRead ? (
                            <View style={[styles.unreadDot, { backgroundColor: theme.primary }]} />
                          ) : null}
                          <Ionicons name={iconName} size={20} color={theme.primary} />
                          <ThemedText variant="label" style={styles.alertTitle}>
                            {alert.title}
                          </ThemedText>
                        </View>
                        <Badge
                          label={alert.type ? alert.type.toUpperCase() : 'ALERT'}
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
                        {alert.actionRoute ? (
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
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
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
