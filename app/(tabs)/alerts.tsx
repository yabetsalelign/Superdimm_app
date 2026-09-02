// SuperDimm — Alerts Tab
// Displays important account and service notifications.

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

interface AlertItem {
  id: string;
  title: string;
  message: string;
  type: 'maintenance' | 'billing' | 'security';
  badgeLabel: string;
  badgeVariant: BadgeVariant;
  timestamp: string;
}

const SAMPLE_ALERTS: AlertItem[] = [
  {
    id: '1',
    title: 'Scheduled Fiber Core Maintenance',
    message: 'Upstream optical node upgrade in Sector 4 will occur on Sep 05 between 02:00 and 04:00 AM UTC. Short failover reboots may occur.',
    type: 'maintenance',
    badgeLabel: 'Maintenance',
    badgeVariant: 'warning',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    title: 'Monthly Service Statement Ready',
    message: 'Your telecom billing statement for August 2026 has been generated and settled.',
    type: 'billing',
    badgeLabel: 'Billing',
    badgeVariant: 'info',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    title: 'New Device Login Detected',
    message: 'SuperDimm Customer Portal session initiated from iOS device.',
    type: 'security',
    badgeLabel: 'Security',
    badgeVariant: 'default',
    timestamp: '3 days ago',
  },
];

export default function AlertsScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="Alerts"
          subtitle="System notifications and account announcements"
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            {SAMPLE_ALERTS.map((alert) => (
              <Card key={alert.id} style={styles.alertCard}>
                <View style={styles.alertHeader}>
                  <View style={styles.alertTitleRow}>
                    <Ionicons
                      name={
                        alert.type === 'maintenance'
                          ? 'construct-outline'
                          : alert.type === 'billing'
                          ? 'receipt-outline'
                          : 'shield-outline'
                      }
                      size={20}
                      color={theme.primary}
                    />
                    <ThemedText variant="label" style={styles.alertTitle}>
                      {alert.title}
                    </ThemedText>
                  </View>
                  <Badge label={alert.badgeLabel} variant={alert.badgeVariant} />
                </View>

                <ThemedText variant="bodySmall" muted style={styles.alertMessage}>
                  {alert.message}
                </ThemedText>

                <ThemedText variant="caption" muted style={styles.alertTimestamp}>
                  {alert.timestamp}
                </ThemedText>
              </Card>
            ))}
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
  alertTitle: {
    fontSize: 14,
    flex: 1,
  },
  alertMessage: {
    lineHeight: 18,
  },
  alertTimestamp: {
    alignSelf: 'flex-end',
    marginTop: Spacing[1],
  },
});
