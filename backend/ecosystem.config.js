module.exports = {
  apps : [{
    name: 'mesto-backend',
    script: 'index.js',
    watch: '.',
    env: {
      NODE_ENV: 'production'
    }
  }, {
    name: 'mesto-frontend',
    script: 'npm run start',
    cwd: './client',
    watch: false
  }],

  production: {
    user: process.env.DEPLOY_USER,
    host: process.env.DEPLOY_HOST,
    ref: 'origin/main',
    repo: process.env.REPO_URL,
    path: '/var/www/mesto',
    'pre-deploy-local': '',
    'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    'pre-setup': '',
  },
};
