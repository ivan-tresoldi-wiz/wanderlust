# Use the official PostgreSQL image from the Docker Hub
FROM postgres:latest

# Add initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=adminpassword
ENV POSTGRES_DB=wanderlust
