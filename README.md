# Frontend Repository CI/CD Workflows

This folder contains all the GitHub Actions workflow files for the frontend repository when using separate repos for frontend and backend.

## Workflow Structure



```
dev-* → development → testing → staging → main (production)
```

## Workflows

1. **01-developer-push.yml** - Runs tests and creates PR when pushing to dev-* branches
2. **02-deploy-development.yml** - Manual deployment to development (Team Leader approval)
3. **03-promote-testing.yml** - Auto-promotes development to testing
4. **04-deploy-testing.yml** - Auto-deploys to testing environment
5. **05-qa-approval.yml** - Manual QA approval to promote to staging
6. **06-deploy-staging.yml** - Auto-deploys to staging environment
7. **07-deploy-production.yml** - Manual production deployment

## Setup Instructions

### 1. Copy Files to Frontend Repository

Copy these files to your frontend repository:
```
.github/workflows/01-developer-push.yml
.github/workflows/02-deploy-development.yml
.github/workflows/03-promote-testing.yml
.github/workflows/04-deploy-testing.yml
.github/workflows/05-qa-approval.yml
.github/workflows/06-deploy-staging.yml
.github/workflows/07-deploy-production.yml
Dockerfile
nginx.conf
.dockerignore
```

### 2. Configure GitHub Secrets

See SECRETS.md for all required secrets.

### 3. Prepare Your Servers

Each server needs:
- Docker installed
- SSH access configured
- Ports 80 and 3000 open

### 4. Usage Flow

**Developer:**
1. Create branch: `dev-feature-name`
2. Push code → Workflow 01 runs automatically
3. PR created automatically

**Team Leader:**
1. Review and merge PR to `development`
2. Go to Actions → Run "02 - Deploy to Development"
3. Type: `DEPLOY`

**Automatic:**
- Workflow 03 promotes to testing
- Workflow 04 deploys to testing

**QA Team:**
1. Test the application
2. Go to Actions → Run "05 - QA Approval"
3. Type: `APPROVE`

**Automatic:**
- Workflow 06 deploys to staging

**Production:**
1. Business approval
2. Go to Actions → Run "07 - Deploy to Production"
3. Type: `DEPLOY TO PRODUCTION`

## Docker Deployment

Each environment gets its own Docker container:
- Development: `frontend-dev` (port 3000)
- Testing: `frontend-test` (port 3000)
- Staging: `frontend-staging` (port 3000)
- Production: `frontend-prod` (port 80)

Images are stored in GitHub Container Registry:
- `ghcr.io/yourorg/frontend-repo:development`
- `ghcr.io/yourorg/frontend-repo:testing`
- `ghcr.io/yourorg/frontend-repo:staging`
- `ghcr.io/yourorg/frontend-repo:production`

## Environment Variables

Each environment uses different API URLs:
- Development: DEV_API_URL
- Testing: TEST_API_URL
- Staging: STAGING_API_URL
- Production: PROD_API_URL

These are baked into the Docker image at build time.
