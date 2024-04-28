from scapy.all import IP, IPv6, TCP, sr1, send
import time
from datetime import datetime
import sys
import json

google_ips = '142.250.191.46'
target_port = 80
source_port = 4152

def get_tcp_timestamp_ipv4(ip, target_port, source_port):
    syn_packet = IP(dst=ip) / TCP(dport=target_port, sport=source_port, flags='S', options=[('Timestamp', (0, 0))]) 
    response = sr1(syn_packet, timeout=2)

def handshake_ip(ip):
    if ip == "demo":
        ip = google_ips
    for i in range(20):
        get_tcp_timestamp_ipv4(ip, target_port, source_port)
        time.sleep(0.25)

if len(sys.argv) == 2:
    handshake_ip(sys.argv[1])     
else:
    print('Incorrect Usage')
