module.exports = {
  apps : [{
    name: 'mesto-frontend',
    script: 'npm',
    args: 'run start',
    cwd: './client', 
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'anproskuryakova',
      host : '84.201.146.41',
      ref  : 'origin/main',
      repo : 'git@github.com:username/mesto-frontend.git',
      path : '/var/www/mesto-frontend',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
