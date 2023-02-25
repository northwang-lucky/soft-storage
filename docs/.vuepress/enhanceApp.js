export default ({ Vue, isServer }) => {
  if (!isServer) {
    Vue.prototype.$basePath = window.BASE_PATH;
  }
};
