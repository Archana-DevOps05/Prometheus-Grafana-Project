# Dockerized Node.js Application Monitoring using Prometheus & Grafana 🚀

This repository demonstrates a **real-world DevOps workflow** where a **Node.js application** is containerized using Docker and monitored using **Prometheus, Node Exporter, and Grafana**.

The project is built from a **DevOps Engineer perspective**, showing how an application is deployed, monitored, and visualized in production-like conditions.

---

## 📌 Project Overview

* Built a simple **Node.js developer portfolio application**
* Containerized the application using **Docker**
* Collected **system metrics** using **Node Exporter**
* Configured **Prometheus** to scrape metrics
* Visualized metrics using **Grafana dashboards**

---

## 🛠️ Tech Stack

* **Node.js** – Application
* **Docker** – Containerization
* **Prometheus** – Metrics collection
* **Node Exporter** – System metrics
* **Grafana** – Metrics visualization
* **Linux / AWS EC2** – Deployment environment

---

## 🏗️ Architecture

```
User Browser
   |
   |--> Node.js App (Docker) :3000
   |
   |--> Grafana :3001
            |
            v
        Prometheus :9090
            |
            v
      Node Exporter :9100
```

---

## 📂 Project Structure

```
Prometheus-Grafana/
│
├── server.js
├── Dockerfile
├── package.json
├── package-lock.json
├── public/
│   ├── index.html
│   └── style.css
└── Prometheus_files/
    └── prometheus.yml
```

---

## 🐳 Step 1: Dockerize Node.js Application

### Build Docker Image

```bash
docker build -t node-app .
```

### Run Docker Container

```bash
docker run -d -p 3000:3000 --name node-cont node-app
```

### Access Application

```
http://<EC2-PUBLIC-IP>:3000
```

---

!(docker-node-app.png)

## 📊 Step 2: Setup Node Exporter

Node Exporter is used to collect system-level metrics such as CPU, memory, disk, and network usage.

```bash
docker run -d -p 9100:9100 --name node-exporter prom/node-exporter
```

Verify metrics:

```
http://<EC2-PUBLIC-IP>:9100/metrics
```

!(node-exporter.png)

---

## ⚙️ Step 3: Configure Prometheus

### prometheus.yml

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["<EC2-PUBLIC-IP>:9090"]

  - job_name: "node_exporter"
    static_configs:
      - targets: ["<EC2-PUBLIC-IP>:9100"]
```

### Run Prometheus Container

```bash
docker run -d \
-p 9090:9090 \
-v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml \
--name prometheus \
prom/prometheus
```

Access Prometheus UI:

```
http://<EC2-PUBLIC-IP>:9090
```

---

## 📈 Step 4: Setup Grafana

```bash
docker run -d -p 3001:3000 --name grafana grafana/grafana
```

Access Grafana:

```
http://<EC2-PUBLIC-IP>:3001
```

Login credentials:

```
Username: admin
Password: admin
```

---

## 📊 Step 5: Grafana Dashboard

* Added **Prometheus** as a data source
* Imported **Node Exporter Full Dashboard**
* Dashboard ID: **1860**

This dashboard displays:

* CPU Usage
* Memory Usage
* Disk Usage
* Network Traffic

---

## 📉 Sample PromQL Queries

### CPU Usage Percentage

```promql
100 - (avg by(instance)(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)
```

### Memory Available

```promql
node_memory_MemAvailable_bytes
```

---

## ✅ Final Outcome

* Successfully deployed a Dockerized Node.js application
* Implemented monitoring using Prometheus and Node Exporter
* Visualized metrics using Grafana dashboards
* Gained hands-on experience with real DevOps monitoring tools

---

## 🎯 Interview Explanation

> I containerized a Node.js application using Docker, configured Prometheus to scrape system metrics from Node Exporter, and visualized those metrics using Grafana dashboards. This project demonstrates end-to-end DevOps monitoring and deployment skills.

---

⭐ This project reflects practical DevOps experience with Docker and monitoring tools.
