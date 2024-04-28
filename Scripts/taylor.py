import string
from collections import Counter

def most_common_words_by_letter(filename):
    common_words_by_letter = {}

    for letter in string.ascii_lowercase:
        common_words_by_letter[letter] = []

    with open(filename, 'r') as file:
        text = file.read().lower()
        words = text.split()

        for word in words:
            first_letter = word[0]

            if first_letter.isalpha() and word != 'x2]':
                common_words_by_letter[first_letter].append(word)

    for letter, word_list in common_words_by_letter.items():
        if word_list:
            counter = Counter(word_list)
            max_count = max(counter.values())
            most_common_words = [word for word, count in counter.items() if count == max_count]
            common_words_by_letter[letter] = most_common_words

    return common_words_by_letter

filename = "all_tswift_lyrics.txt"

result = most_common_words_by_letter(filename)

for letter, words in result.items():
    if words:
        print(f"'{letter}': {', '.join(words)}")
