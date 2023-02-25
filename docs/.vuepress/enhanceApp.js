export default ({ Vue, isServer }) => {
  if (!isServer) {
    Vue.prototype.$baseName = window.BASE_NAME;
  }
};
