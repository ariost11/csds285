from flask import Flask, request, render_template
from textblob import TextBlob
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.probability import FreqDist
from nltk.tokenize import RegexpTokenizer
from nltk import pos_tag, ne_chunk
import matplotlib.pyplot as plt
from wordcloud import WordCloud

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        text = request.form['text']
        sentiment, confidence = analyze_sentiment(text)
        key_phrases = extract_key_phrases(text)
        entities = extract_entities(text)
        generate_wordcloud(text)
        return render_template('results.html', text=text, sentiment=sentiment, confidence=confidence, key_phrases=key_phrases, entities=entities)
    
    return render_template('index.html')

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment = blob.sentiment.polarity
    confidence = abs(sentiment)
    if confidence <= 0.5:
        return 'Neutral', confidence
    elif sentiment > 0:
        return 'Positive', confidence
    else:
        return 'Negative', confidence

def extract_key_phrases(text):
    stop_words = set(stopwords.words('english'))
    tokenizer = RegexpTokenizer(r'\w+')
    words = tokenizer.tokenize(text.lower())
    filtered_words = [word for word in words if word not in stop_words]
    fdist = FreqDist(filtered_words)
    return fdist.most_common(5)

def extract_entities(text):
    sentences = nltk.sent_tokenize(text)
    words = [nltk.word_tokenize(sent) for sent in sentences]
    tagged_words = [nltk.pos_tag(word) for word in words]
    chunked_sentences = [ne_chunk(tagged) for tagged in tagged_words]
    entities = []
    for tree in chunked_sentences:
        for chunk in tree:
            if hasattr(chunk, 'label'):
                entities.append(' '.join(c[0] for c in chunk.leaves()))
    return entities[:5]

def generate_wordcloud(text):
    wordcloud = WordCloud(width=800, height=400).generate(text)
    plt.figure(figsize=(10, 5))
    plt.imshow(wordcloud, interpolation='bilinear')
    plt.axis('off')
    plt.savefig('static/wordcloud.png')

if __name__ == '__main__':
    app.run(debug=True)
