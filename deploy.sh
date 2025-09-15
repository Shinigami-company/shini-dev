set -a && source .env && set +a
git pull
pm2 restart $PM2_NAME