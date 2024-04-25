#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 X"
    exit 1
fi

X=($1-1)
for ((i=0; i<=X; i++)); do
    sudo python3 handshake.py demo &
done