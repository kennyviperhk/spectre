#!/bin/sh

cd ~/git/spectre
/usr/local/bin/git stash
/usr/local/bin/git pull
/usr/local/Homebrew/bin/yarn install-all
/usr/local/Homebrew/bin/yarn pub-client
/usr/local/Homebrew/bin/pm2 reload ecosystem.config.js --env=production --update-env
