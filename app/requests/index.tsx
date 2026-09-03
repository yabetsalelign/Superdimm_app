// SuperDimm — Requests Sub-route Redirect
// Redirects to the main (tabs)/requests screen to preserve single source of truth.

import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ui/ThemedView';
import { LoadingState } from '@/components/ui/LoadingState';

export default function RequestsSubrouteRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/requests');
  }, [router]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <LoadingState fullScreen message="Loading requests..." />
    </ThemedView>
  );
}
