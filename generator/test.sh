#!/usr/bin/env bash

mvn package

JAVA_OPTS="-cp ./target/typescript-generator-1.0.0.jar:./target/openapi-generator-cli-4.3.1.jar"

if [ "$1" == "-d" ]; then
  echo "Starting in debug mode (suspended, waiting for remote debugger)"
  echo "For more details read https://openapi-generator.tech/docs/debugging"

  JAVA_OPTS="${JAVA_OPTS} -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005"
fi

java $JAVA_OPTS org.openapitools.codegen.OpenAPIGenerator generate \
    -g tamtam-bot-api-typescript \
    -i https://raw.githubusercontent.com/tamtam-chat/tamtam-bot-api-schema/master/schema.yaml \
    -o generated
