import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../shared/api';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { type SubscriptionStatus } from '../shared/types';

const services = [
  { key: 'accounts', name: 'Accounts service' },
  { key: 'transfers', name: 'Transfers service' },
];

const purposes: Record<string, string> = {
  'read-models': 'Projects events into the tables the screens read.',
  'integration-events': 'Turns events into messages for the other service, through RabbitMQ.',
};

export function ProjectionsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Projections</h1>
        <p className="lede">
          Each service follows its own event store with checkpointed subscriptions. Rebuilding a read model deletes it
          and replays every event from the start; the screens fill up again as the checkpoint moves.
        </p>
      </header>
      <div className="services">
        {services.map((service) => (
          <ServiceSubscriptions key={service.key} service={service.key} name={service.name} />
        ))}
      </div>
    </div>
  );
}

function ServiceSubscriptions({ service, name }: { service: string; name: string }) {
  const queryClient = useQueryClient();
  const subscriptions = useQuery({
    queryKey: ['ops', service],
    queryFn: () => get<SubscriptionStatus[]>(`/ops/${service}/subscriptions`),
    refetchInterval: 1000,
  });
  const rebuild = useMutation({
    mutationFn: (subscription: string) => post<undefined>(`/ops/${service}/subscriptions/${subscription}/rebuild`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ops', service] }),
  });

  return (
    <section className="panel" aria-label={name}>
      <h2>{name}</h2>
      <ErrorMessage error={subscriptions.error ?? rebuild.error} />
      <ul className="subscriptions">
        {subscriptions.data?.map((subscription) => (
          <li key={subscription.name} className="subscription">
            <div>
              <h3>{subscription.name}</h3>
              <p className="muted">{purposes[subscription.name]}</p>
            </div>
            <dl className="checkpoint">
              <dt>Checkpoint</dt>
              <dd>
                {subscription.position} of {subscription.headPosition}
              </dd>
              <dt>Behind</dt>
              <dd>{subscription.lag === 0 ? 'Caught up' : `${subscription.lag} events`}</dd>
              <dt>Last moved</dt>
              <dd>{formatTime(subscription.updatedAt)}</dd>
            </dl>
            {subscription.name === 'read-models' && (
              <button
                type="button"
                className="button"
                disabled={rebuild.isPending || subscription.rebuildRequested}
                onClick={() => {
                  rebuild.mutate(subscription.name);
                }}
              >
                {subscription.rebuildRequested ? 'Rebuilding…' : 'Rebuild from events'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
