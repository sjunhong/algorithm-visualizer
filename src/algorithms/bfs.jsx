// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const bfs = (grid, startNode, finishNode) => {
  let visitedNodesInOrder = [];
  const nextNodesStack = [startNode];
  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.shift();
    if (currentNode === finishNode) return visitedNodesInOrder;

    if (currentNode && !currentNode.isWall && (currentNode.isStart || !currentNode.isVisited)) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      const { col, row } = currentNode;
      let nextNode;
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }
}
