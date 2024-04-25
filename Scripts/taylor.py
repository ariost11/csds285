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

            if first_letter.isalpha():
                common_words_by_letter[first_letter].append(word)

    for letter, word_list in common_words_by_letter.items():
        if word_list:
            counter = Counter(word_list)
            most_common_word = counter.most_common(1)[0][0]
            common_words_by_letter[letter] = most_common_word

    return common_words_by_letter

filename = "all_tswift_lyrics.txt"

result = most_common_words_by_letter(filename)

for letter, word in result.items():
    print(f"'{letter}': {word}")
