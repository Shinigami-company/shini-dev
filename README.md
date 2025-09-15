# description

This will redirect discord interaction to URL.

# install

In a new node (`npm init` to make one) project:
```bash
# discord js module install 
# npm install discord.js
# pm2 global install (premanent running)
npm install -g pm2
# https modules install (for requests)
npm install tweetnacl dotenv fastify fastify-raw-body
# checkup modules install (for checking and sending discord requests)
npm install discord-interactions node-fetch
# typescript install
npm install -D tsx @types/node
```

# start

## with node
start with tsx for contextuam launch:
```bash
tsx index.ts
```
this is not a production solution!

## with pm2 console
start with pm2 for permanent production:
```bash
pm2 start index.ts --interpreter tsx --name shinimisc
```
you may use `--watch` to update on file update, if you know what you are doing. But pay attention to exclude log folder.

## with pm2 ecosystem
in a parent `ecosystem.config.js` file:
```json
module.exports = {
  apps: [
    {
      name: "shinimisc",
      interpreter: "tsx",
      cwd: "your/path/to/here/",
      script: "./index.ts",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss.SSS",
      merge_logs: true,
    },
    //...
  ],
};
```