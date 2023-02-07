from cmath import inf
from platform import node
from turtle import distance
from typing import List


class Graph: 

    def __init__(self, edges: dict) -> None: 
        self.graph = dict()
        self.init_graph(edges)
    
    def init_graph(self, edges: dict) -> None:
        self.graph = edges

    def get_edges(self) -> None:
        edges = list()
        for key in self.graph.keys():
            edges.append((key, self.graph.get(key)))
        return edges

    def get_nodes(self) -> list:
        return list(self.graph.keys())

    def get_graph(self) -> dict:
        return self.graph

    def adjacent_list(self) -> dict:
        adjacents = {x:{} for x in self.get_nodes()}
        for node, neighbours in self.get_edges():
            for neighbour, distance in neighbours:
                adjacents.setdefault(node, dict())[neighbour] = distance 
                adjacents.setdefault(neighbour, dict())[node] = distance 
        return adjacents

    def distances_list(self, start: str) -> dict:
        distances = {}
        for node, neighbours in self.get_edges():
            for neighbour, distance in neighbours:
                distances[node] = (inf, None)
                distances[neighbour] = (inf, None)
        distances[start] = (0, start)
        return distances


    def dijkstra(self, start: str) -> dict:
        nodes = self.get_nodes()
        distances = self.distances_list(start)
        adjacents = self.adjacent_list()

        tmp = [x for x in nodes]
        while len(tmp) > 0:
            upper = {x: distances[x] for x in tmp}
            lower = min(upper, key = lambda x: upper.get(x)[0])
            tmp.remove(lower)
            for node, distance in adjacents[lower].items():
                new = (distances[lower][0] + distance, lower)
                distances[node] = min(distances[node], new, key = lambda x: x[0])
        return distances

    def find_shortest_path(self, start: str, end: str, path=[]) -> list:
        path = []
        path.append(end)
        dijkstra = self.dijkstra(start)
        _, node = dijkstra.get(end)
        while node != start:
            path.append(node)
            _, node = dijkstra.get(node)
        path.append(start)

        path.reverse()

        return path  

    def knapSack(self, W: int, wt: List[int], val:List[int], n: int):
      K = [[0 for x in range(W + 1)] for x in range(n + 1)] 
      for i in range(n + 1): 
          for w in range(W + 1): 
              if i == 0 or w == 0: 
                  K[i][w] = 0
              elif wt[i-1] <= w: 
                  K[i][w] = max(val[i-1] 
                            + K[i-1][w-wt[i-1]],   
                                K[i-1][w]) 
              else: 
                  K[i][w] = K[i-1][w] 
      return K[n][W]                 
                