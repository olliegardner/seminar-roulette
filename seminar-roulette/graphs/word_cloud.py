from wordcloud import WordCloud, STOPWORDS

import matplotlib.pyplot as plt
import pandas as pd
import re


def generate_wordcloud():
    data = pd.read_csv('../../data/raw/final-evaluation/final-evaluation.csv')

    responses = data[
        'In five words, how would you describe the overall design and functionality of Seminar Roulette?'
    ]

    all_words = []

    for words in responses:
        for word in words.split(' '):
            word = re.sub(r'[^\w\s]', '', word.lower())

            if not word == '' and not word == 'use':

                all_words.append(word)

    word_cloud = WordCloud(
        width=800,
        height=800,
        background_color='white',
        stopwords=set(STOPWORDS),
        min_font_size=10
    ).generate(' '.join(all_words))

    # plt.figure(figsize=(8, 8), facecolor=None)
    word_cloud_figure = plt.figure(figsize=(8, 8), facecolor=None)

    plt.imshow(word_cloud)
    plt.axis("off")
    plt.tight_layout(pad=0)

    plt.show()

    word_cloud_figure.savefig('word_cloud.pdf', bbox_inches='tight')


if __name__ == '__main__':
    generate_wordcloud()