// SuperDimm — Request Details Screen
// Live ticket information and status timeline fetched from the backend.

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
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
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();

  const [ticket, setTicket] = useState<ServiceRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTicket() {
      if (!id) return;
      const res = await api.requests.getById(id);
      if (res.success && res.data) {
        setTicket(res.data);
      }
      setIsLoading(false);
    }
    loadTicket();
  }, [id]);

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
            accessibilityLabel="Back"
          >
            <Ionicons name="arrow-back" size={24} color={theme.foreground} />
          </TouchableOpacity>
          <ThemedText variant="h3" style={styles.headerTitle}>
            Ticket Details
          </ThemedText>
          <View style={{ width: 24 }} />
        </View>

        {isLoading ? (
          <LoadingState message="Loading ticket details..." />
        ) : !ticket ? (
          <View style={styles.notFound}>
            <Ionicons name="alert-circle-outline" size={48} color={theme.error} />
            <ThemedText variant="h3">Ticket Not Found</ThemedText>
            <ThemedText variant="bodySmall" muted>
              This service request could not be located or you may not have permission to view it.
            </ThemedText>
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

              <ThemedText variant="caption" muted>
                Reported on {new Date(ticket.createdAt).toLocaleDateString()} • Category:{' '}
                {ticket.category ? ticket.category.toUpperCase() : 'GENERAL'}
              </ThemedText>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <ThemedText variant="bodySmall">
                {ticket.description || 'No additional description provided.'}
              </ThemedText>
            </Card>

            {/* Ticket Metadata / Assignment */}
            <View style={styles.section}>
              <ThemedText variant="h3" style={styles.sectionTitle}>
                Assignment & SLA
              </ThemedText>

              <Card style={styles.metaCard}>
                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Priority Tier</ThemedText>
                  <ThemedText variant="label" style={{ textTransform: 'capitalize' }}>
                    {ticket.priority || 'Normal'}
                  </ThemedText>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Engineering Lead</ThemedText>
                  <ThemedText variant="label">
                    {ticket.assignedUser?.name || 'Automated Queue (Unassigned)'}
                  </ThemedText>
                </View>

                <View style={[styles.divider, { backgroundColor: theme.border }]} />

                <View style={styles.metaRow}>
                  <ThemedText variant="caption" muted>Last Updated</ThemedText>
                  <ThemedText variant="label">
                    {new Date(ticket.updatedAt).toLocaleString()}
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
    gap: Spacing[2],
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
  },
  divider: {
    height: 1,
    marginVertical: Spacing[1],
  },
  section: {
    gap: Spacing[2],
  },
  sectionTitle: {
    fontSize: 17,
  },
  metaCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
