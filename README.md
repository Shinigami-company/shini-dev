# description

This will redirect discord interaction to URL.

## install

### prerequisites

In a new node (`npm init` to make one) project:

```bash
# pm2 global install (premanent running)
npm install -g pm2
# https modules install (for requests)
npm install tweetnacl dotenv fastify fastify-raw-body
# checkup modules install (for checking and sending discord requests)
npm install discord-interactions node-fetch
# typescript install
npm install -D tsx @types/node
```

### variables

in `.env` you should have:

```.env
DISCORD_PUBLIC_KEY=thediscordpublickey123IsRealyLongAndAlphaNum
INTERNAL_PORT=3000
PM2_NAME=static
```

## start

### with node

start with tsx for contextual launch:

```bash
tsx index.ts
```

this is not a production solution!

### with pm2 console

start with pm2 for persistence:

```bash
pm2 start index.ts --interpreter tsx --name shinimisc
```

### with pm2 ecosystem

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

## update

you can deploy using github workflow.

### pipeline

- github workflow trigger when pushing to `main` or `dev`
- taking variables from the corresponding environement
- `deploy.sh` is executed in the DNS

### setup

you have to setup the corresponding environements in repo/settings/environements

you need to set:

- variables -> `DEPLOY_DIR`
- secrets -> `SERVER_IP` and `SSH_PRIVATE_KEY`

here, `developpement.yml` and `production.yml` are workflows.