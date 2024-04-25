import numpy as np
import matplotlib.pyplot as plt

random_numbers = np.random.randint(1, 101, size=1000000)

unique_numbers, counts = np.unique(random_numbers, return_counts=True)

plt.bar(unique_numbers, counts, color='skyblue')
plt.title('Frequency of Numbers 1-100')
plt.xlabel('Number')
plt.ylabel('Frequency')
plt.xticks(unique_numbers)
plt.savefig('number_frequency_plot.png')
plt.close()