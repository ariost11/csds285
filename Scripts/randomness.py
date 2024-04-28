import numpy as np
import sys
import matplotlib.pyplot as plt

def generate_plot(size):
    random_numbers = np.random.randint(1, size + 1, size=1000000)

    unique_numbers, counts = np.unique(random_numbers, return_counts=True)

    plt.bar(unique_numbers, counts, color='skyblue')
    plt.title(f'Frequency of Numbers 1-{size}')
    plt.xlabel('Number')
    plt.ylabel('Frequency')
    plt.xticks(unique_numbers)
    plt.savefig('number_frequency_plot.png')
    plt.close()

if __name__ == "__main__":
    # Check if exactly one argument (size) is provided
    if len(sys.argv) != 2:
        print("Usage: python script_name.py <size>")
        sys.exit(1)

    try:
        size = int(sys.argv[1])  # Convert the argument to an integer
        if size <= 0:
            raise ValueError("Size must be a positive integer")
    except ValueError:
        print("Error: Size must be a positive integer")
        sys.exit(1)

    generate_plot(size)