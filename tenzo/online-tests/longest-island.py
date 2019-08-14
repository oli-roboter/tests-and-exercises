""" 
Find longest seguence of connected 1 in below matrix

response is 5:

[.,.,.,1]
[.,1,1,1]
[.,.,1,.]
[.,.,.,.]

"""

matrix = [
    [1,0,0,1],
    [0,1,1,1],
    [0,0,1,0],
    [1,1,0,0],
]

# RESULT

checked = []

def count_neighbours(i, j):
    if matrix[i][j] is 0 or (i, j) in checked:
        return 0
    else:
        checked.append((i, j))
        return (1 + 
                (count_neighbours(i-1, j) if i > 0 else 0) + 
                (count_neighbours(i+1, j) if i < 3 else 0) +
                (count_neighbours(i, j-1) if j > 0 else 0) +
                (count_neighbours(i, j+1) if j < 3 else 0))

n = 0
for i in range(4):
    for j in range(4):
        n = max(n, count_neighbours(i, j))

print(n)