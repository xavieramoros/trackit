module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.ios.js', '.android.js', '.json', '.ts', '.tsx'],
        alias: {
          "@hooks": "./src/hooks/",
          "@types": "./src/types/",
          "@navigation": "./src/navigation",
          "@components": "./src/components",
          "@data": "./src/data",
          "@screens": "./src/screens",
          "@constants": "./src/constants",
        }
      }
    ]
  ]

  };
};
