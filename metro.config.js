const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
exports.resolver = {
  ...defaultResolver,
  sourceExts: [...defaultResolver.sourceExts, "cjs"],
};

/* RN metro bundler & apollo-client error 해결
  @apollo/client의 업데이트로 인해 발생 
  https://github.com/apollographql/apollo-client/releases/tag/v3.5.4 */
