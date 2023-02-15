FROM node:gallium-alpine3.17 as frontend-build
WORKDIR /app

# Install Ketcher dependencies
COPY ./ketcher/package*.json ./
RUN npm ci

# Build Ketcher app
COPY ./ketcher/tsconfig.json ./tsconfig.json
COPY ./ketcher/public ./public
COPY ./ketcher/src ./src
RUN npm run build

FROM python:3.8.12-slim-buster as python-runtime
WORKDIR /app

# Install Streamlit packages
COPY env/ /env
RUN python -m pip install -r /env/requirements.txt \
    && pip cache purge

# Install libxrender1
RUN apt-get update && \
    apt-get -y install libxrender1

# Install Ketcher
COPY --from=frontend-build /app/build /ketcher/build

# Install custom configuration
COPY config/config.toml /root/.streamlit/config.toml

COPY src/ /app
EXPOSE 8501
CMD [ "streamlit", "run", "app.py" ]
