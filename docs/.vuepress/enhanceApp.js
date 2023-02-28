import { events, getTracker } from './instance/event-tracker';

export default ({ router, isServer }) => {
  if (isServer) {
    return;
  }

  const tracker = getTracker();
  let reportedLangEvent = false;

  router.afterEach(to => {
    if (!reportedLangEvent) {
      tracker.action(events.doc_language, {
        key: to.path.startsWith('/zh') ? 'Simplified-Chinese' : 'English',
        value: 1,
      });
      reportedLangEvent = true;
    }
    tracker.action(events.show_page, {
      key: to.path.replace(/^\/zh/, ''),
      value: 1,
    });
  });
};
