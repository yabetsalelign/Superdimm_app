// SuperDimm — Requests Tab
// Displays service tickets, support cases, and allows creating new requests.

import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

interface MockRequest {
  id: string;
  reference: string;
  title: string;
  category: string;
  status: string;
  badgeVariant: BadgeVariant;
  date: string;
}

const SAMPLE_REQUESTS: MockRequest[] = [
  {
    id: '1',
    reference: 'SD-2026-0819',
    title: 'Intermittent optical loss on ONT port',
    category: 'Network Issue',
    status: 'In Progress',
    badgeVariant: 'warning',
    date: 'Sep 01, 2026',
  },
  {
    id: '2',
    reference: 'SD-2026-0744',
    title: 'Static IP reconfiguration request',
    category: 'Technical Support',
    status: 'Resolved',
    badgeVariant: 'success',
    date: 'Aug 24, 2026',
  },
];

export default function RequestsScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="My Requests"
          subtitle="Track troubleshooting cases and technical support"
          rightAction={
            <Button
              label="+ New"
              size="sm"
              onPress={() => router.push('/requests/create')}
            />
          }
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Quick Notice */}
          <Card style={[styles.noticeCard, { backgroundColor: theme.primarySubtle }]} flat>
            <View style={styles.noticeRow}>
              <Ionicons name="information-circle-outline" size={24} color={theme.primary} />
              <View style={styles.noticeText}>
                <ThemedText variant="label" primary>
                  Automated Queue Processing
                </ThemedText>
                <ThemedText variant="caption" muted>
                  New service tickets are automatically prioritized and dispatched to engineering.
                </ThemedText>
              </View>
            </View>
          </Card>

          {/* Ticket List */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Active & Past Cases
            </ThemedText>

            {SAMPLE_REQUESTS.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => router.push(`/requests/${item.id}` as any)}
              >
                <Card style={styles.requestCard}>
                  <View style={styles.requestHeader}>
                    <ThemedText variant="mono" primary style={styles.referenceText}>
                      {item.reference}
                    </ThemedText>
                    <Badge label={item.status} variant={item.badgeVariant} />
                  </View>

                  <ThemedText variant="label" style={styles.requestTitle}>
                    {item.title}
                  </ThemedText>

                  <View style={styles.requestFooter}>
                    <ThemedText variant="caption" muted>
                      {item.category}
                    </ThemedText>
                    <ThemedText variant="caption" muted>
                      {item.date}
                    </ThemedText>
                  </View>
                </Card>
              </TouchableOpacity>
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
  noticeCard: {
    padding: Spacing[3],
    borderRadius: Radius.md,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  noticeText: {
    flex: 1,
    gap: 2,
  },
  section: {
    gap: Spacing[3],
  },
  sectionTitle: {
    fontSize: 17,
  },
  requestCard: {
    padding: Spacing[4],
    gap: Spacing[2],
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referenceText: {
    fontSize: 12,
    fontWeight: '700',
  },
  requestTitle: {
    fontSize: 15,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing[1],
  },
});
