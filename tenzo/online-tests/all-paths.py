from typing import Iterator, List


def get_paths(graph: dict, start_node: str, end_node: str, path=None) -> Iterator[List]:
    '''
    Implement this function such that all possible paths between two nodes are returned
    
    You may either modify the function args or define a helper function if required.
    '''
    
    """SOLUTION"""
    if path is None:
        path = [start_node]
    
    if start_node == end_node:
        print('success')
        yield path
    
    print(path)
    for node in graph[start_node] - set(path):
        yield from get_paths(graph, node, end_node, path + [node])
    """END OF SOLUTION"""
        
if __name__ == "__main__":
    
    network = {
        'A': {'B', 'C'},
        'B': {'A', 'D', 'E'},
        'C': {'A', 'F'},
        'D': {'E'},
        'E': {'B', 'F'},
        'F': {'C', 'E'}
    }
    
    for path in get_paths(network, 'A', 'F'):
        # each path should be list/tuple from start to end nodes, e.g. ['A', 'C', 'F']
        print(path)
        

''' comments
  initial get_paths(network, A, F, None)
  it-0 on None to A: get_paths(network, None, F, [A]) => {'B', 'C'} - {'A'} = {'B', 'C'}, start_node == end_node: false 
  it_1 on A->B: get_paths(network, B, F, [A] + [B]) => {'A', 'D', 'E'} - {'A'} = {'D', 'E'}, start_node == end_node: false
  it-2: on B->D: get_paths(network, D, F, [A, B] + [D]) => {'E'} - {'A', 'B'} = {'E'}, start_node == end_node: false
  it-3 on D->E: get_paths(network, E, F, [A, B, D] + [E]) => {'B', 'F'}  - {'A', 'B', 'D'} = {'F'}, start_node == end_node: true -> yeld path
  it-4 on E->F: get_paths(network, F, F, [A, B, D, E] + [F]) => {'C', 'E'}  - {'A', 'B', 'D', E'} = {'C'}, start_node == end_node: false
  all iterations for this path are finished, move on to do do the 'C' in 'A': {'B', 'C'}
'''