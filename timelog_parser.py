# Small script to compute the total number of hours spent on the project.

import re

hours = 0

with open('timelog.md', 'r') as timelog:
    for line in timelog:
        pattern = re.search('(\d*\.?\d) hours*', line)
        if pattern:
            hours += float(pattern.group(1))

print(f'Total timelog hours: {hours}')
