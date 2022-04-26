module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        extensions: [
          ".ios.ts",
          ".android.ts",
          ".ts",
          ".ios.tsx",
          ".android.tsx",
          ".tsx",
          ".jsx",
          ".js",
          ".json",
        ],
        alias: {
          "@components": "./src/components",
          "@interfaces": "./src/interfaces",
          "@routes": "./src/routes",
          "@screens": "./src/screens",
          "@stores": "./src/stores",
          "@styles": "./src/styles",
          "@common": "./src/common",
          "@navigation": "./src/navigation",
          "@redux": "./src/redux",
          "@utils": "./src/utils",
          "@containers": "./src/containers",
          "@services": "./src/services",
          "@assets": "./src/assets",
          "@hooks": "./src/hooks",
        },
      },
    ],
  ],
}
