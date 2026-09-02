// SuperDimm — Request Details Screen
// Displays detailed troubleshooting timeline, status, and responses for a ticket.

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function RequestDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();

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

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Main Case Info */}
          <Card style={styles.caseCard}>
            <View style={styles.caseTop}>
              <ThemedText variant="mono" primary style={styles.caseRef}>
                SD-2026-0819 (#{id ?? '1'})
              </ThemedText>
              <Badge label="In Progress" variant="warning" />
            </View>

            <ThemedText variant="h2" style={styles.caseTitle}>
              Intermittent optical loss on ONT port
            </ThemedText>

            <ThemedText variant="caption" muted>
              Reported on Sep 01, 2026 • Category: Network Outage
            </ThemedText>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <ThemedText variant="bodySmall">
              Customer reported sudden red LOS indicator on fiber ONT unit starting around 14:30 local time. Router logs show periodic packet drops.
            </ThemedText>
          </Card>

          {/* Timeline / Activity Section */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Engineering Log
            </ThemedText>

            <Card style={styles.logCard}>
              <View style={styles.timelineItem}>
                <View style={[styles.dot, { backgroundColor: theme.primary }]} />
                <View style={styles.timelineContent}>
                  <ThemedText variant="label">Technician Dispatched</ThemedText>
                  <ThemedText variant="caption" muted>
                    Line diagnostics completed. Field engineer scheduled for inspection.
                  </ThemedText>
                  <ThemedText variant="caption" muted style={{ fontSize: 10 }}>
                    Sep 02, 2026 at 09:15 AM
                  </ThemedText>
                </View>
              </View>

              <View style={[styles.timelineDivider, { backgroundColor: theme.border }]} />

              <View style={styles.timelineItem}>
                <View style={[styles.dot, { backgroundColor: theme.mutedForeground }]} />
                <View style={styles.timelineContent}>
                  <ThemedText variant="label">Ticket Acknowledged</ThemedText>
                  <ThemedText variant="caption" muted>
                    Automated triage assigned ticket to Level 2 Network Operations.
                  </ThemedText>
                  <ThemedText variant="caption" muted style={{ fontSize: 10 }}>
                    Sep 01, 2026 at 02:35 PM
                  </ThemedText>
                </View>
              </View>
            </Card>
          </View>

          <Button
            label="Add Comment (Simulated)"
            variant="secondary"
            style={{ marginTop: Spacing[2] }}
          />
        </ScrollView>
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
  logCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  timelineItem: {
    flexDirection: 'row',
    gap: Spacing[3],
    alignItems: 'flex-start',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    gap: 2,
  },
  timelineDivider: {
    height: 1,
    marginLeft: 18,
  },
});
