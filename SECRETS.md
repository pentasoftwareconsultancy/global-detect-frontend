# GitHub Secrets Required for Frontend Repository

Add these secrets to your frontend repository settings:
Settings → Secrets and variables → Actions → New repository secret

## API URLs (Backend endpoints)
```
DEV_API_URL=https://api-dev.yourapp.com
TEST_API_URL=https://api-test.yourapp.com
STAGING_API_URL=https://api-staging.yourapp.com
PROD_API_URL=https://api.yourapp.com
```

## Frontend URLs (For reference in logs)
```
DEV_FRONTEND_URL=https://app-dev.yourapp.com
TEST_FRONTEND_URL=https://app-test.yourapp.com
STAGING_FRONTEND_URL=https://app-staging.yourapp.com
PROD_FRONTEND_URL=https://yourapp.com
```

## Development Server SSH
```
DEV_SERVER_HOST=<dev-server-ip-or-domain>
DEV_SERVER_USER=ubuntu
DEV_SERVER_SSH_KEY=<your-ssh-private-key>
```

## Testing Server SSH
```
TEST_SERVER_HOST=<test-server-ip-or-domain>
TEST_SERVER_USER=ubuntu
TEST_SERVER_SSH_KEY=<your-ssh-private-key>
```

## Staging Server SSH
```
STAGING_SERVER_HOST=<staging-server-ip-or-domain>
STAGING_SERVER_USER=ubuntu
STAGING_SERVER_SSH_KEY=<your-ssh-private-key>
```

## Production Server SSH
```
PROD_SERVER_HOST=<prod-server-ip-or-domain>
PROD_SERVER_USER=ubuntu
PROD_SERVER_SSH_KEY=<your-ssh-private-key>
```

## Notes:
- GITHUB_TOKEN is automatically provided by GitHub Actions
- SSH keys should be the private key content (entire key including headers)
- Make sure your servers have Docker installed
- Ensure GitHub Container Registry access is enabled for your repository
