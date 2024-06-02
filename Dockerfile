FROM ubuntu:latest
LABEL authors="akade"

ENTRYPOINT ["top", "-b"]