module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@modules': './src/modules',
          '@infra': './src/infra',
          '@core': './src/core',
          '@helpers': './src/helpers',
          '@contracts': './src/contracts',
        },
      },
    ],
  ],
}
