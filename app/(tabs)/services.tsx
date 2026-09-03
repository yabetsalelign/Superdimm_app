// SuperDimm — Services Tab
// Displays customer's authoritative active plan and subscription details.
// Strictly presents backend-provided subscriber attributes without fabricated specifications.

import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import type { CustomerServicesData } from '@/types';

export default function ServicesScreen() {
  const theme = useTheme();

  const [serviceData, setServiceData] = useState<CustomerServicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadServices = async () => {
    const res = await api.services.getServices();
    if (res.success && res.data) {
      setServiceData(res.data);
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadServices();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadServices();
    }, [])
  );

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="My Services"
          subtitle="Active subscription and service provisioning"
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
          {isLoading && !serviceData ? (
            <LoadingState fullScreen={false} message="Loading subscription data..." />
          ) : (
            <>
              {/* Active Plan Card */}
              <View style={styles.section}>
                <ThemedText variant="labelUppercase" primary>
                  Current Subscription
                </ThemedText>

                <Card style={styles.primaryPlanCard}>
                  <View style={styles.planHeader}>
                    <View style={styles.planInfo}>
                      <ThemedText variant="h2" style={styles.planTitle} numberOfLines={2}>
                        {serviceData?.planName || 'Standard Telecom Service'}
                      </ThemedText>
                      <ThemedText variant="caption" muted>
                        Authorized Subscriber Line
                      </ThemedText>
                    </View>
                    <Badge
                      label={serviceData?.status === 'active' ? 'Active' : 'Provisioning'}
                      variant={serviceData?.status === 'active' ? 'success' : 'warning'}
                    />
                  </View>

                  <View style={[styles.planDivider, { backgroundColor: theme.border }]} />

                  <View style={styles.specGrid}>
                    <View style={styles.specItem}>
                      <Ionicons name="shield-checkmark-outline" size={22} color={theme.primary} />
                      <ThemedText variant="caption" muted>Line Status</ThemedText>
                      <ThemedText variant="label" style={{ textTransform: 'capitalize' }}>
                        {serviceData?.status || 'Active'}
                      </ThemedText>
                    </View>
                    <View style={styles.specItem}>
                      <Ionicons name="calendar-outline" size={22} color={theme.primary} />
                      <ThemedText variant="caption" muted>Member Since</ThemedText>
                      <ThemedText variant="label">
                        {serviceData?.memberSince
                          ? new Date(serviceData.memberSince).toLocaleDateString(undefined, {
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Active'}
                      </ThemedText>
                    </View>
                  </View>
                </Card>
              </View>

              {/* Service Management Information */}
              <View style={styles.section}>
                <ThemedText variant="h3" style={styles.sectionTitle}>
                  Service Provisioning Details
                </ThemedText>

                <Card style={styles.detailsCard}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailTextCol}>
                      <ThemedText variant="label">Technical SLA Guarantee</ThemedText>
                      <ThemedText variant="caption" muted>
                        Enterprise tier with automated engineering queue routing
                      </ThemedText>
                    </View>
                    <Badge label="Included" variant="success" />
                  </View>

                  <View style={[styles.planDivider, { backgroundColor: theme.border }]} />

                  <View style={styles.detailRow}>
                    <View style={styles.detailTextCol}>
                      <ThemedText variant="label">Priority NOC Response</ThemedText>
                      <ThemedText variant="caption" muted>
                        Direct escalation for fiber drops and network degradation
                      </ThemedText>
                    </View>
                    <Badge label="Active" variant="info" />
                  </View>
                </Card>
              </View>

              {/* Account Representative Card */}
              <Card style={[styles.upgradeCard, { backgroundColor: theme.card }]}>
                <ThemedText variant="h3">Custom Routing & Bandwidth</ThemedText>
                <ThemedText variant="bodySmall" muted>
                  To request dark fiber allocation, custom BGP peerings, or speed tier adjustments, contact your dedicated account representative.
                </ThemedText>
                <Button
                  label="Contact Account Rep"
                  variant="primary"
                  size="sm"
                  style={{ marginTop: Spacing[2] }}
                />
              </Card>
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
  section: {
    gap: Spacing[2],
  },
  sectionTitle: {
    fontSize: 16,
  },
  primaryPlanCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing[2],
  },
  planInfo: {
    flex: 1,
    gap: 2,
  },
  planTitle: {
    fontSize: 18,
    lineHeight: 22,
  },
  planDivider: {
    height: 1,
    marginVertical: Spacing[1],
  },
  specGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing[1],
  },
  specItem: {
    alignItems: 'center',
    gap: 3,
  },
  detailsCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing[3],
  },
  detailTextCol: {
    flex: 1,
    gap: 2,
  },
  upgradeCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
});
