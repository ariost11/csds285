from flask import Flask, render_template, request
import json
from collections import defaultdict

app = Flask(__name__)

@app.route('/')
def index():
    # Load JSON data
    with open('n-2024-02-26_05-00-01.json', 'r') as file:
        data = json.load(file)

    # Process JSON data
    lb_groups = defaultdict(lambda: defaultdict(set))
    for domain, lb_info in data.items():
        domain_as = lb_info.get("domain_info", "Unknown AS")
        for lb_ip, as_info in lb_info.items():
            if lb_ip != "domain_info" and as_info != "UCB, US":  # Skip 'domain_info' and 'UCB, US'
                lb_groups[lb_ip][domain_as].add(domain)

    # Flatten the groups to a list of (count, lb_ip, domain_as, domains) tuples
    flat_groups = []
    for lb_ip, domain_groups in lb_groups.items():
        for domain_as, domains in domain_groups.items():
            flat_groups.append((len(domains), lb_ip, domain_as, ', '.join(domains)))

    # Sort the list by count (descending)
    sorted_groups = sorted(flat_groups, key=lambda x: x[0], reverse=True)

    # Convert processed data to JSON format
    json_data = [{'count': count, 'lb_ip': lb_ip, 'domain_as': domain_as, 'domains': domains} 
                 for count, lb_ip, domain_as, domains in sorted_groups]

    return render_template('index.html', json_data=json_data)

if __name__ == '__main__':
    app.run(debug=True)
