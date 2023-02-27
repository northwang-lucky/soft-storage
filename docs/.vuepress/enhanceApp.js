import { events, getTracker } from './instance/event-tracker';

export default ({ router, isServer }) => {
  if (isServer) {
    return;
  }

  const tracker = getTracker();
  router.afterEach(to => {
    tracker.action(events.doc_language, {
      key: to.path.startsWith('/zh') ? 'Simplified-Chinese' : 'English',
      value: 1,
    });
    tracker.action(events.show_page, {
      key: to.path.replace(/^\/zh/, ''),
      value: 1,
    });
  });
};
