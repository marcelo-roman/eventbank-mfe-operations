import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { get, post } from '../shared/api';
import { ErrorMessage } from '../shared/ErrorMessage';
import { formatTime } from '../shared/format';
import { useLocale } from '../shared/i18n/LocaleContext';
import { type SubscriptionStatus } from '../shared/types';

const services = ['customers', 'accounts', 'transfers', 'cards'] as const;

export function ProjectionsPage() {
  const { t } = useLocale();
  return (
    <div className="page">
      <header className="page-header">
        <h1>{t.projections.title}</h1>
        <p className="lede">{t.projections.lede}</p>
      </header>
      <div className="services">
        {services.map((service) => (
          <ServiceSubscriptions key={service} service={service} name={t.projections.services[service]} />
        ))}
      </div>
    </div>
  );
}

function ServiceSubscriptions({ service, name }: { service: string; name: string }) {
  const { locale, t } = useLocale();
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
              <p className="muted">{t.projections.purposes[subscription.name]}</p>
            </div>
            <dl className="checkpoint">
              <dt>{t.projections.checkpoint}</dt>
              <dd>{t.projections.position(subscription.position, subscription.headPosition)}</dd>
              <dt>{t.projections.behind}</dt>
              <dd>{subscription.lag === 0 ? t.projections.caughtUp : t.projections.eventsBehind(subscription.lag)}</dd>
              <dt>{t.projections.lastMoved}</dt>
              <dd>{formatTime(subscription.updatedAt, locale)}</dd>
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
                {subscription.rebuildRequested ? t.projections.rebuilding : t.projections.rebuild}
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
