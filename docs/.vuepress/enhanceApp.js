import { events, getTracker } from './instance/event-tracker';

export default ({ router, isServer }) => {
  if (isServer) {
    return;
  }

  const tracker = getTracker();
  router.afterEach(to => {
    tracker.action(events.show_page, {
      key: to.path,
      value: 1,
    });
  });
};
