// SuperDimm — Requests Tab
// Live service tickets and troubleshooting cases with filter chips, search, and tappable rows.

import React, { useEffect, useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge, type BadgeVariant } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingState } from '@/components/ui/LoadingState';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';
import { api } from '@/services/api';
import type { ServiceRequest } from '@/types';

type FilterTab = 'all' | 'open' | 'in_progress' | 'resolved';

function getStatusBadge(status: string): { label: string; variant: BadgeVariant } {
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
      return { label: status, variant: 'default' };
  }
}

export default function RequestsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [requestsList, setRequestsList] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadRequests = async () => {
    setErrorMessage(null);
    const res = await api.requests.list();
    if (res.success && res.data) {
      setRequestsList(res.data);
    } else {
      setErrorMessage('Unable to load requests. Pull down to retry.');
    }
    setIsLoading(false);
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRequests();
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Filtered requests based on active tab & search query
  const filteredRequests = useMemo(() => {
    return requestsList.filter((item) => {
      // 1. Status Filter
      if (activeFilter === 'open' && item.status !== 'open' && item.status !== 'assigned') {
        return false;
      }
      if (activeFilter === 'in_progress' && item.status !== 'in_progress' && item.status !== 'pending_customer') {
        return false;
      }
      if (activeFilter === 'resolved' && item.status !== 'resolved' && item.status !== 'closed') {
        return false;
      }

      // 2. Search Query Filter (Title, ID, or Category)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const ref = `sr-${item.id.slice(-5).toLowerCase()}`;
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q) || ref.includes(q);
        const matchCat = (item.category || '').toLowerCase().includes(q);
        return matchTitle || matchId || matchCat;
      }

      return true;
    });
  }, [requestsList, activeFilter, searchQuery]);

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

        {/* ── Search & Filter Row ── */}
        <View style={[styles.filterBar, { borderBottomColor: theme.border }]}>
          <View style={[styles.searchBox, { backgroundColor: theme.input, borderColor: theme.border }]}>
            <Ionicons name="search" size={16} color={theme.mutedForeground} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by ID or topic..."
              placeholderTextColor={theme.placeholderText}
              style={[styles.searchInput, { color: theme.foreground }]}
              autoCapitalize="none"
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchBtn}>
                <Ionicons name="close-circle" size={16} color={theme.mutedForeground} />
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Filter Pills */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterPillsScroll}
          >
            {(
              [
                { id: 'all', label: `All (${requestsList.length})` },
                {
                  id: 'open',
                  label: `Open (${requestsList.filter((r) => r.status === 'open' || r.status === 'assigned').length})`,
                },
                {
                  id: 'in_progress',
                  label: `In Progress (${requestsList.filter((r) => r.status === 'in_progress' || r.status === 'pending_customer').length})`,
                },
                {
                  id: 'resolved',
                  label: `Resolved (${requestsList.filter((r) => r.status === 'resolved' || r.status === 'closed').length})`,
                },
              ] as const
            ).map((filter) => {
              const isSelected = activeFilter === filter.id;
              return (
                <TouchableOpacity
                  key={filter.id}
                  style={[
                    styles.filterChip,
                    isSelected && {
                      backgroundColor: theme.primary,
                      borderColor: theme.primary,
                    },
                    { borderColor: theme.border },
                  ]}
                  onPress={() => setActiveFilter(filter.id)}
                >
                  <ThemedText
                    variant="caption"
                    style={{
                      color: isSelected ? theme.primaryForeground : theme.foreground,
                      fontWeight: '600',
                      fontSize: 12,
                    }}
                  >
                    {filter.label}
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

          {/* Ticket List */}
          <View style={styles.section}>
            {isLoading ? (
              <LoadingState fullScreen={false} message="Loading support cases..." />
            ) : filteredRequests.length === 0 ? (
              <EmptyState
                iconName="clipboard-outline"
                title={requestsList.length === 0 ? 'No support tickets' : 'No matching tickets'}
                description={
                  requestsList.length === 0
                    ? "You haven't submitted any technical or billing requests yet."
                    : 'No cases match your active filter or search query.'
                }
                actionLabel={requestsList.length === 0 ? 'Create a Request' : 'Reset Filters'}
                onAction={() => {
                  if (requestsList.length === 0) {
                    router.push('/requests/create');
                  } else {
                    setActiveFilter('all');
                    setSearchQuery('');
                  }
                }}
              />
            ) : (
              filteredRequests.map((item) => {
                const badge = getStatusBadge(item.status);
                const caseRef = `SR-${item.id.slice(-5).toUpperCase()}`;

                return (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.7}
                    onPress={() => router.push(`/requests/${item.id}` as any)}
                  >
                    <Card style={styles.requestCard}>
                      <View style={styles.requestHeader}>
                        <ThemedText variant="mono" primary style={styles.referenceText}>
                          {caseRef}
                        </ThemedText>
                        <Badge label={badge.label} variant={badge.variant} />
                      </View>

                      <View style={styles.titleRow}>
                        <ThemedText variant="label" style={styles.requestTitle} numberOfLines={2}>
                          {item.title}
                        </ThemedText>
                        <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
                      </View>

                      {item.description ? (
                        <ThemedText
                          variant="caption"
                          muted
                          numberOfLines={2}
                          style={styles.description}
                        >
                          {item.description}
                        </ThemedText>
                      ) : null}

                      <View style={styles.requestFooter}>
                        <ThemedText variant="caption" muted style={{ textTransform: 'capitalize' }}>
                          {item.category || 'General'}
                        </ThemedText>
                        <ThemedText variant="caption" muted>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </ThemedText>
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
    paddingTop: Spacing[3],
    paddingBottom: Spacing[3],
    gap: Spacing[2],
    borderBottomWidth: 1,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingHorizontal: Spacing[3],
    gap: Spacing[2],
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: 2,
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing[2],
  },
  requestTitle: {
    fontSize: 15,
    lineHeight: 19,
    flex: 1,
  },
  description: {
    lineHeight: 16,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing[1],
  },
});
