#!/usr/bin/env bash

GENERATOR_VERSION="4.3.1"
JAR_NAME="openapi-generator-cli-$GENERATOR_VERSION.jar"
REMOTE_JAR_URL="https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/$GENERATOR_VERSION/$JAR_NAME"
LOCAL_JAR_DIR=".openapi-generator"
LOCAL_JAR_PATH="./$LOCAL_JAR_DIR/$JAR_NAME"

mkdir -p $LOCAL_JAR_DIR

test -f $LOCAL_JAR_PATH || curl -o $LOCAL_JAR_PATH $REMOTE_JAR_URL

mvn package -f ./generator/pom.xml

JAVA_OPTS="-cp ./generator/target/typescript-generator-0.1.0.jar:$LOCAL_JAR_PATH"

if [ "$1" == "-d" ]; then
  echo "Starting in debug mode (suspended, waiting for remote debugger)"
  echo "For more details read https://openapi-generator.tech/docs/debugging"

  JAVA_OPTS="${JAVA_OPTS} -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005"
fi

java $JAVA_OPTS org.openapitools.codegen.OpenAPIGenerator generate \
    -g tamtam-bot-api-typescript \
    -i https://raw.githubusercontent.com/tamtam-chat/tamtam-bot-api-schema/master/schema.yaml \
    -o ./
