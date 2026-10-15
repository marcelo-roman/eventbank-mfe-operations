export interface SubscriptionStatus {
  name: string;
  position: number;
  headPosition: number;
  lag: number;
  rebuildRequested: boolean;
  updatedAt: string;
}
