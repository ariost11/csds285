#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 X (where X is a positive integer)"
    exit 1
fi

if ! [[ $1 =~ ^[1-9][0-9]*$ ]]; then
    echo "Error: X must be a positive integer."
    exit 1
fi

X=$(( $1 - 1 ))
for ((i=0; i<=X; i++)); do
    sudo python3 handshake.py demo &
done
