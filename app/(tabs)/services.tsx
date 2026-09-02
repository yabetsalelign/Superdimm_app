// SuperDimm — Services Tab
// Displays customer's active and available telecom services.

import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function ServicesScreen() {
  const theme = useTheme();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="My Services"
          subtitle="Manage active subscriptions and network packages"
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Active Plan Card */}
          <View style={styles.section}>
            <ThemedText variant="labelUppercase" primary>
              Active Plan
            </ThemedText>

            <Card style={styles.primaryPlanCard}>
              <View style={styles.planHeader}>
                <View style={styles.planInfo}>
                  <ThemedText variant="h2" style={styles.planTitle}>
                    Fiber Gigabit Plus
                  </ThemedText>
                  <ThemedText variant="caption" muted>
                    Account SLA: 99.9% Uptime Guarantee
                  </ThemedText>
                </View>
                <Badge label="Active" variant="success" />
              </View>

              <View style={[styles.planDivider, { backgroundColor: theme.border }]} />

              <View style={styles.specGrid}>
                <View style={styles.specItem}>
                  <Ionicons name="speedometer-outline" size={20} color={theme.primary} />
                  <ThemedText variant="caption" muted>Download</ThemedText>
                  <ThemedText variant="label">1000 Mbps</ThemedText>
                </View>
                <View style={styles.specItem}>
                  <Ionicons name="cloud-upload-outline" size={20} color={theme.primary} />
                  <ThemedText variant="caption" muted>Upload</ThemedText>
                  <ThemedText variant="label">500 Mbps</ThemedText>
                </View>
                <View style={styles.specItem}>
                  <Ionicons name="infinite-outline" size={20} color={theme.primary} />
                  <ThemedText variant="caption" muted>Data Cap</ThemedText>
                  <ThemedText variant="label">Unlimited</ThemedText>
                </View>
              </View>
            </Card>
          </View>

          {/* Add-on Services Placeholder */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Add-on Services
            </ThemedText>

            <Card style={styles.serviceItemCard}>
              <View style={styles.serviceItemRow}>
                <View style={[styles.iconBox, { backgroundColor: theme.primarySubtle }]}>
                  <Ionicons name="shield-checkmark-outline" size={22} color={theme.primary} />
                </View>
                <View style={styles.serviceItemDetails}>
                  <ThemedText variant="label" style={styles.serviceItemTitle}>
                    Static IP Routing
                  </ThemedText>
                  <ThemedText variant="caption" muted>
                    Dedicated IPv4 allocation for home servers
                  </ThemedText>
                </View>
                <Badge label="Enabled" variant="info" />
              </View>
            </Card>

            <Card style={styles.serviceItemCard}>
              <View style={styles.serviceItemRow}>
                <View style={[styles.iconBox, { backgroundColor: theme.primarySubtle }]}>
                  <Ionicons name="tv-outline" size={22} color={theme.primary} />
                </View>
                <View style={styles.serviceItemDetails}>
                  <ThemedText variant="label" style={styles.serviceItemTitle}>
                    IPTV Stream Gateway
                  </ThemedText>
                  <ThemedText variant="caption" muted>
                    HD channel package via dedicated VLAN
                  </ThemedText>
                </View>
                <Badge label="Available" variant="default" />
              </View>
            </Card>
          </View>

          {/* Upgrade Banner */}
          <Card style={[styles.upgradeCard, { backgroundColor: theme.card }]}>
            <ThemedText variant="h3">Need higher bandwidth?</ThemedText>
            <ThemedText variant="bodySmall" muted>
              Contact customer support to inquire about enterprise lines or commercial SLA options.
            </ThemedText>
            <Button
              label="Contact Account Rep"
              variant="secondary"
              size="sm"
              style={{ marginTop: Spacing[2] }}
            />
          </Card>
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
    gap: Spacing[5],
    paddingBottom: Spacing[8],
  },
  section: {
    gap: Spacing[3],
  },
  sectionTitle: {
    fontSize: 17,
  },
  primaryPlanCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planInfo: {
    flex: 1,
    gap: 2,
  },
  planTitle: {
    fontSize: 20,
  },
  planDivider: {
    height: 1,
    marginVertical: Spacing[1],
  },
  specGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specItem: {
    alignItems: 'center',
    gap: 3,
  },
  serviceItemCard: {
    padding: Spacing[3],
  },
  serviceItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceItemDetails: {
    flex: 1,
    gap: 2,
  },
  serviceItemTitle: {
    fontSize: 14,
  },
  upgradeCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
});
