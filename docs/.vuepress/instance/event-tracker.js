import * as ackeeTracker from 'ackee-tracker';

/** @type {ackeeTracker.AckeeInstance} */
let tracker;

export function getTracker() {
  if (!tracker) {
    tracker = ackeeTracker.create(window.ACKEE_SERVER, JSON.parse(window.ACKEE_OPTS));
  }
  return tracker;
}

export const events = {
  show_page: '3b8ba189-1096-4d0d-912a-d42eb2281195',
  doc_language: 'ca6b6799-c5b8-4dda-bd51-dee0989a2ded',
};
