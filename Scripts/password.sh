#!/bin/bash

generate_password() {
    local length=$1
    local password=$(head /dev/urandom | tr -dc 'A-Za-z0-9!"#$%&\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c "$length")
    echo "$password"
}

# Check if exactly one argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <length>"
    exit 1
fi

# Validate if the argument is a positive integer
if ! [[ $1 =~ ^[1-9][0-9]*$ ]]; then
    echo "Error: Length must be a positive integer."
    exit 1
fi

length=$1

generate_password "$length"
