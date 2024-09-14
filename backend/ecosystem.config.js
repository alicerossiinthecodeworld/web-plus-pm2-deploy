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

  deploy : {
    production : {
      user : 'anproskuryakova',
      host : '84.201.146.41',
      ref  : 'origin/main',
      repo : 'git@github.com:username/mesto.git',
      path : '/var/www/mesto',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
