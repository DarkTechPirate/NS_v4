module.exports = {
  apps: [
    {
      name: 'backend',
      script: 'index.js',
      cwd: '/app/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
    {
      name: 'worker',
      script: 'workers/index.js',
      cwd: '/app/backend',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
  ],
};
