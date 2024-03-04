import pandas as pd
import re
from urllib.parse import urlparse
# import matplotlib.pyplot as plt
import seaborn as sns
import sys

# Load dataset
data = pd.read_csv('/Users/neerajbaipureddy/Desktop/safeMail/Safe-Mail-BE/malicious_phish.csv')

# Preprocess dataset: Mark non-'benign' as 'malicious'
data['type'] = data['type'].apply(lambda x: 'benign' if x == 'benign' else 'malicious')

# Extract domain from URL
data['domain'] = data['url'].apply(lambda x: urlparse(x).netloc if urlparse(x).netloc else urlparse(x).path.split('/')[0])

# EDA: Analyze domain features to inform regex creation
# Feature 1: Count of hyphens in domain
data['hyphen_count'] = data['domain'].apply(lambda x: x.count('-'))
# Feature 2: Presence of digits in domain
data['has_digit'] = data['domain'].apply(lambda x: bool(re.search(r'\d', x)))

# Visualize the EDA findings
# plt.figure(figsize=(12, 5))

# Hyphen count distribution
# plt.subplot(1, 2, 1)
# sns.boxplot(x='type', y='hyphen_count', data=data)
# plt.title('Hyphen Count by Domain Type')

# Presence of digits in domain
# plt.subplot(1, 2, 2)
# sns.countplot(x='has_digit', hue='type', data=data)
# plt.title('Presence of Digits in Domain by Type')

# plt.tight_layout()
# plt.show()

# Based on EDA, define regex pattern for classification
regex_pattern = r'(?:[^-]*-){2,}[^-]*\d.*|.*\d[^-]*-(?:[^-]*-){1,}.*'

# Function to classify a new domain based on dataset and regex
def classify_domain(new_domain):
    # Direct Lookup in dataset
    match = data[data['domain'] == new_domain]
    if not match.empty:
        return match['type'].values[0]
    
    # Regex Analysis for Unknown Domains
    if re.match(regex_pattern, new_domain):
        return 'malicious'
    else:
        return 'benign'

# Example usage
domain_to_classify = sys.stdin.read().strip()
classification_result = classify_domain(domain_to_classify)
print(f"{classification_result} domain")