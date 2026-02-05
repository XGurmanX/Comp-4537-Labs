# Docker Redeployment Guide (Cloud Run – COMP 4537)

This document explains how to redeploy updated versions of my Lab 3 backend
(Node.js + Docker + Google Cloud Run).

---

## Mental Model

Cloud Run does NOT auto-update.

Every update follows this loop:
1. Change code
2. Rebuild Docker image
3. Push image to Artifact Registry
4. Redeploy Cloud Run service

Each deploy creates a new revision.

---

## Preconditions

- Docker image already works locally
- Cloud Run service already exists
- Logged in with gcloud
- Project set correctly

Verify:
gcloud config get-value project

Expected:
comp-4537-server

---

## Standard Redeployment Flow

### 1. Make code changes
Edit files inside part-b/ (server.js, modules/, lang/).

---

### 2. Rebuild Docker image
From inside part-b/:
```bash
docker build -t comp4537-lab3-part-b-and-c .
```

Optional (no cache):
```bash
docker build --no-cache -t comp4537-lab3-part-b-and-c .
```

---

### 3. Re-tag image for Google Artifact Registry
```bash
docker tag comp4537-lab3-part-b-and-c us-west1-docker.pkg.dev/comp-4537-server/lab3/comp4537-lab3-part-b-and-c
```

---

### 4. Push updated image
```bash
docker push us-west1-docker.pkg.dev/comp-4537-server/lab3/comp4537-lab3-part-b-and-c
```

---

### 5. Redeploy Cloud Run service
```bash
gcloud run deploy comp-4537-lab3-part-b-and-c 
--image us-west1-docker.pkg.dev/comp-4537-server/lab3/comp4537-lab3-part-b-and-c 
--platform managed 
--region us-west1 
--allow-unauthenticated
```

---

## Verify Deployment

### Part B:
• B: https://comp-4537-lab3.gurmanpannu.dev/getDate/?name=Gurman

### Part C:
• C.1: https://comp-4537-lab3.gurmanpannu.dev/writeFile/?text=BCIT

• C.2: https://comp-4537-lab3.gurmanpannu.dev/readFile/file.txt

---
