#!/bin/bash
generate_password() {
    local length=$1
    local password=$(head /dev/urandom | tr -dc 'A-Za-z0-9!"#$%&\''()*+,-./:;<=>?@[\]^_`{|}~' | head -c "$length")
    echo "$password"
}

if [ $# -ne 1 ]; then
    echo "Usage: $0 <length>"
    exit 1
fi

length=$1

generate_password "$length"
