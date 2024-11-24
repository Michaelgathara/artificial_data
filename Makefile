.DEFAULT_GOAL := help

HOSTNAME_PROD = "localhost"
HOSTNAME_DEV = "localhost"

.PHONY: help deps build

help:
	@echo "Usage:"
	@echo "  make logs    - Check Docker container logs"
	@echo "  make deps    - Build frontend assets"
	@echo "  make build   - Build npm assets"
	@echo ""

deps:
	pip install -r requirements.txt
	npm install

audit:
	npm audit

audit-fix:
	npm audit fix

frontend:
	npm run dev

backend:
	python -m uvicorn api.backend.app:app --reload --host 0.0.0.0 --port 8000 

build:
	npm run build