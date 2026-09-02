// SuperDimm — Profile Tab
// Customer profile, settings, and session options.

import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

export default function ProfileScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScreenHeader
          title="Account Profile"
          subtitle="Subscriber details and application preferences"
        />

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer Avatar & Primary Info */}
          <Card style={styles.profileHeaderCard}>
            <View style={[styles.avatarBox, { backgroundColor: theme.primarySubtle }]}>
              <Ionicons name="person" size={36} color={theme.primary} />
            </View>
            <View style={styles.profileMeta}>
              <ThemedText variant="h2" style={styles.nameText}>
                Alex Mercer
              </ThemedText>
              <ThemedText variant="caption" muted>
                subscriber.mercer@example.com
              </ThemedText>
              <ThemedText variant="mono" primary style={styles.idText}>
                ACC-992014-X
              </ThemedText>
            </View>
            <Badge label="Verified Subscriber" variant="success" />
          </Card>

          {/* Account Details */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Contact & Provisioning
            </ThemedText>

            <Card style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <ThemedText variant="caption" muted>Primary Phone</ThemedText>
                <ThemedText variant="label">+1 (555) 019-2834</ThemedText>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.detailRow}>
                <ThemedText variant="caption" muted>Service Address</ThemedText>
                <ThemedText variant="label">452 Telecom Blvd, Suite 300</ThemedText>
              </View>
              <View style={[styles.divider, { backgroundColor: theme.border }]} />
              <View style={styles.detailRow}>
                <ThemedText variant="caption" muted>Authentication Mode</ThemedText>
                <ThemedText variant="label">Bearer JWT (Phase 2 Prep)</ThemedText>
              </View>
            </Card>
          </View>

          {/* Settings Section */}
          <View style={styles.section}>
            <ThemedText variant="h3" style={styles.sectionTitle}>
              Preferences
            </ThemedText>

            <Card style={styles.menuCard}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="lock-closed-outline" size={20} color={theme.foreground} />
                  <ThemedText variant="bodySmall">Security & Credentials</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <Ionicons name="notifications-outline" size={20} color={theme.foreground} />
                  <ThemedText variant="bodySmall">Notification Preferences</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.mutedForeground} />
              </TouchableOpacity>

              <View style={[styles.divider, { backgroundColor: theme.border }]} />

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => router.push('/auth/login')}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name="log-in-outline" size={20} color={theme.primary} />
                  <ThemedText variant="bodySmall" primary>
                    Sign In (Placeholder Flow)
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.primary} />
              </TouchableOpacity>
            </Card>
          </View>

          <Button
            label="Sign Out (Simulated)"
            variant="ghost"
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
  scroll: {
    padding: Spacing[4],
    gap: Spacing[4],
    paddingBottom: Spacing[8],
  },
  profileHeaderCard: {
    alignItems: 'center',
    padding: Spacing[4],
    gap: Spacing[2],
  },
  avatarBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[1],
  },
  profileMeta: {
    alignItems: 'center',
    gap: 3,
  },
  nameText: {
    fontSize: 20,
  },
  idText: {
    fontSize: 12,
    fontWeight: '700',
  },
  section: {
    gap: Spacing[2],
  },
  sectionTitle: {
    fontSize: 17,
  },
  detailsCard: {
    padding: Spacing[4],
    gap: Spacing[3],
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
  },
  menuCard: {
    padding: Spacing[2],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing[3],
    paddingHorizontal: Spacing[2],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
});
