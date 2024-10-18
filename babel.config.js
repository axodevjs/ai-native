module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // Import variables from '@env'
          path: ".env", // Path to your .env file
        },
      ],
    ],
  };
};
