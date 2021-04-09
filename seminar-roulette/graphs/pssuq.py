from collections import Counter
from math import pi

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

data = pd.read_csv('../../data/raw/final-evaluation/final-evaluation.csv')


def pssuq_scores():
    all_responses = data[data.columns[2:18]].values.flatten()
    system_usefulness_responses = data[data.columns[2:8]].values.flatten()
    information_quality_responses = data[data.columns[8:14]].values.flatten()
    interface_quality_responses = data[data.columns[14:17]].values.flatten()

    all_responses = list(filter(lambda x: not pd.isnull(x), all_responses))
    system_usefulness_responses = list(
        filter(lambda x: not pd.isnull(x), system_usefulness_responses)
    )
    information_quality_responses = list(
        filter(lambda x: not pd.isnull(x), information_quality_responses)
    )
    interface_quality_responses = list(
        filter(lambda x: not pd.isnull(x), interface_quality_responses)
    )

    overall_score = np.mean(all_responses)
    system_usefulness_score = np.mean(system_usefulness_responses)
    information_quality_score = np.mean(information_quality_responses)
    interface_quality_score = np.mean(interface_quality_responses)

    print()
    print('Overall score:', overall_score)
    print('System usefulness score:', system_usefulness_score)
    print('Information quality score:', information_quality_score)
    print('Interface quality score:', interface_quality_score)
    print()


def pssuq_question_graph(question, graph_title, y_ticks, file_name):
    responses = data[question].values

    responses = list(filter(lambda x: not pd.isnull(x), responses))

    values = Counter(responses)

    for i in range(1, 8):
        if not i in values:
            values[i] = 0

    ordered_values = dict(sorted(values.items()))

    graph = plt.figure()

    plt.bar(range(1, 8), ordered_values.values())
    plt.title(graph_title)
    plt.xlabel('Seven-point Likert scale')
    plt.ylabel('No. of Participants')
    plt.yticks(y_ticks)
    plt.show()

    graph.savefig(file_name, bbox_inches='tight')


if __name__ == '__main__':
    pssuq_scores()
    pssuq_question_graph(
        'It was simple to use this system.',
        'Participant responses for how simple it was to use the system',
        range(0, 25, 5), 'simple_system_responses.pdf'
    )
    pssuq_question_graph(
        'The system gave error messages that clearly told me how to fix problems. ',
        'Participant responses for the system gave error messages to fix problems',
        range(0, 6, 1), 'system_error_messages.pdf'
    )
