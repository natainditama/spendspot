/**
 * Configures Babel compiler presets and plugins for Expo mobile application.
 * Enables the Expo preset alongside React Native Worklets runtime support.
 */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [require.resolve("babel-preset-expo")],
  };
};
