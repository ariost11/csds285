#!/bin/bash
if [ -z "$1" ]; then
    echo "Usage: $0 <name>"
    exit 1
fi
name=$(echo "$1" | tr '[:upper:]' '[:lower:]') # Convert name to lowercase
curl -s https://ocw.mit.edu/ans7870/6/6.006/s08/lecturenotes/files/t8.shakespeare.txt | grep -io "\b[a-z]*${name}[a-z]*\b" | sort | uniq -ic | sort -nr | head -n 10
