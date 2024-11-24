# An insanely lightweight webapp template

This template is meant to be super lightweight, therefore, you will be missing a couple features like Docker or server deployment. This is mostly for prototyping. If you are looking for a template with more features check out: 

- [jayples/webapp-template](https://github.com/jaypyles/webapp-template)
- [michaelgathara/webapp-template](https://github.com/michaelgathara/webapp-template)

## Technologies

- Frontend: React/Next.js

- Backend: FastAPI

- Frameworks/Libraries: TailwindCSS

## Deployment

### Local Deployment/Development
- Create environment: `python3 -m venv venv`
- Activate environment: `source venv/bin/activate`

Uses `make` to quickly dispatch launch commands.

- `deps`: installs needed deps

- `frontend`: starts the frontend (run in one terminal)

- `backend`: starts the backend (run in another terminal)

- `audit`: npm audits

- `audit-fix`: npm audit fix

- `build`: builds the npm assets using `npm build`1

Ex: `make deps`
