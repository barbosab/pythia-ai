const { MakerSquirrel } = require("@electron-forge/maker-squirrel");
const { MakerZIP } = require("@electron-forge/maker-zip");
const { MakerDeb } = require("@electron-forge/maker-deb");
const { MakerRpm } = require("@electron-forge/maker-rpm");
const {
  AutoUnpackNativesPlugin,
} = require("@electron-forge/plugin-auto-unpack-natives");
const { WebpackPlugin } = require("@electron-forge/plugin-webpack");
const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  packagerConfig: {
    icon: "./src/images/pythia_purple",
    asar: true,
    extraResource: [
      path.join(__dirname, "/src/service/ollama/runners/ollama-darwin"),
    ],
    osxSign: {
      identity: process.env.APPLE_IDENTITY,
    },
    osxNotarize: {
      appleApiKey: process.env.APPLE_API_KEY || "default_api_key",
      appleApiKeyId: process.env.APPLE_API_KEY_ID || "default_api_key_id",
      appleApiIssuer: process.env.APPLE_API_ISSUER || "default_api_key_id",
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig: require("./webpack.main.config"),
      renderer: {
        config: require("./webpack.renderer.config"),
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
