/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
  // Enable CSS handling
  serverDependenciesToBundle: [/^remix-utils.*/],
}; 