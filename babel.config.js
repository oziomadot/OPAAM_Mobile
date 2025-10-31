module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            // This must match the paths in tsconfig.json
            '@': '.',
          },
        },
      ],
    ],
  };
};
