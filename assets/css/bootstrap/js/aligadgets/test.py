
"""
import os
import sys
import fileinput

#path = "/Users/korchix/Pictures"
path = "/Users/korchix/Documents/GitHub/korchix.github.io/assets/css/bootstrap/js/aligadgets"

# construct full file path recursively
file_list = []
for root, d_names, f_names in os.walk(path):
    for f in f_names:
        file_list.append(os.path.join(root, f))

print("file_list : %s" % file_list)
"""
import os
from glob import glob
path = "/Users/korchix/Documents/GitHub/korchix.github.io/assets/css/bootstrap/js/aligadgets"
result = [y for x in os.walk(path) for y in glob(os.path.join(x[0], '*.csv'))]
print(len(result))
print(result)
