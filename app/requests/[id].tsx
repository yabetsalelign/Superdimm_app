// SuperDimm — Request Details Screen
// Mobile-first layout for scanning ticket status, assignment, and problem history.

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import type { ServiceRequest } from '@/types';

function getStatusBadge(status?: string): { label: string; variant: BadgeVariant } {
  const norm = status?.toLowerCase() || 'open';
  switch (norm) {
    case 'open':
      return { label: 'Open', variant: 'info' };
    case 'assigned':
      return { label: 'Assigned', variant: 'info' };
    case 'in_progress':
      return { label: 'In Progress', variant: 'warning' };
    case 'pending_customer':
      return { label: 'Action Required', variant: 'warning' };
    case 'resolved':
      return { label: 'Resolved', variant: 'success' };
    case 'closed':
      return { label: 'Closed', variant: 'default' };
    default:
      return { label: status || 'Unknown', variant: 'default' };
  }
}

export default function RequestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const theme = useTheme();
  const router = useRouter();

  const requestId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : undefined;

  const [ticket, setTicket] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadTicket() {
      if (!requestId) {
        setIsLoading(false);
        return;
      }
      setErrorMessage(null);
      const res = await api.requests.getById(requestId);
      if (res.success && res.data) {
        setTicket(res.data);
      } else {
        setErrorMessage(res.error?.message || 'Unable to load ticket details.');
      }
      setIsLoading(false);
    }
    loadTicket();
  }, [requestId]);

  const badge = getStatusBadge(ticket?.status);
  const caseRef = ticket ? `SR-${ticket.id.slice(-5).toUpperCase()}` : 'SR-.....';

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: theme.border }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Back to requests"
          >
            <Ionicons name="arrow-back" size={24} color={theme.foreground} />
          </TouchableOpacity>
          <ThemedText variant="h3" style={styles.headerTitle}>
            Case Details
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {isLoading ? (
          <LoadingState message="Loading ticket details..." />
        ) : errorMessage || !ticket ? (
          <View style={styles.notFound}>
            <Ionicons name="alert-circle-outline" size={48} color={theme.error} />
            <ThemedText variant="h3">
              {errorMessage || 'Ticket Not Found'}
            </ThemedText>
            <ThemedText variant="bodySmall" muted style={{ textAlign: 'center', maxWidth: 300 }}>
              This service request could not be located or you do not have permission to view it.
            </ThemedText>
            <Button
              label="Back to Requests"
              variant="secondary"
              size="sm"
              onPress={() => router.back()}
              style={{ marginTop: Spacing[2] }}
            />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {/* Main Case Info */}
            <Card style={styles.caseCard}>
              <View style={styles.caseTop}>
                <ThemedText variant="mono" primary style={styles.caseRef}>
                  {caseRef}
                </ThemedText>
                <Badge label={badge.label} variant={badge.variant} />
              </View>

              <ThemedText variant="h2" style={styles.caseTitle}>
                {ticket.title}
              </ThemedText>

              <View style={styles.categoryRow}>
                <Badge
                  label={ticket.category ? ticket.category.toUpperCase() : 'GENERAL'}
                  variant="default"
                />
                <ThemedText variant="caption" muted>
                  Reported on {new Date(ticket.createdAt).toLocaleDateString()}
                </ThemedText>
              </View>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <ThemedText variant="label" style={styles.sectionLabel}>
                Problem Description
              </ThemedText>
              <ThemedText variant="bodySmall" style={styles.descriptionText}>
                {ticket.description || 'No additional details provided.'}
              </ThemedText>
            </Card>

            {/* Ticket Assignment & Status Card */}
            <View style={styles.section}>
              <ThemedText variant="h3" style={styles.sectionTitle}>
                Case Status & Technical Support
              </ThemedText>

              <Card style={styles.metaCard}>
                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Priority Classification</ThemedText>
                  <ThemedText variant="label" style={{ textTransform: 'capitalize' }}>
                    {ticket.priority || 'Normal'}
                  </ThemedText>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Technical Queue</ThemedText>
                  <ThemedText variant="label">
                    {ticket.assignedUser?.name || 'Tier 2 Engineering Queue'}
                  </ThemedText>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Last Activity</ThemedText>
                  <ThemedText variant="label">
                    {new Date(ticket.updatedAt).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </ThemedText>
                </View>
              </Card>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[3],
    borderBottomWidth: 1,
  },
  backButton: {
    padding: Spacing[1],
  },
  headerTitle: {
    fontSize: 18,
  },
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing[6],
    gap: Spacing[3],
  },
  caseCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
  caseTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  caseRef: {
    fontSize: 13,
    fontWeight: '700',
  },
  caseTitle: {
    fontSize: 18,
    lineHeight: 22,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    marginVertical: 2,
  },
  divider: {
    height: 1,
    marginVertical: Spacing[1],
  },
  sectionLabel: {
    marginTop: 2,
  },
  descriptionText: {
    lineHeight: 18,
  },
  section: {
    gap: Spacing[2],
  },
  sectionTitle: {
    fontSize: 16,
  },
  metaCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing[2],
  },
});
