// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra } from '../../algorithms/dijkstra';
import { dfs } from '../../algorithms/dfs';
import { bfs } from '../../algorithms/bfs';
import styled from 'styled-components';
import { Button } from '@material-ui/core';


export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      START_NODE_ROW: 5,
      START_NODE_COL: 5,
      FINISH_NODE_ROW: 19,
      FINISH_NODE_COL: 29,
      mousePressed: false,
      ROW_COUNT: 25,
      COLUMN_COUNT: 35,
      isRunning: false,
      isStartNode: false,
      isFinishNode: false,
      isWallNode: false, 
      currRow: 0,
      currCol: 0,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.toggleIsRunning = this.toggleIsRunning.bind(this);
  }

  componentDidMount() {
    const grid = this.getInitialGrid();
    this.setState({ grid });
  }

  toggleIsRunning() {
    this.setState({ isRunning: !this.state.isRunning });
  }


  getInitialGrid = (rowCount = this.state.ROW_COUNT, colCount = this.state.COLUMN_COUNT) => {
    const initialGrid = [];

    for (let row = 0; row < rowCount; row++) {
      const currentRow = [];
      for (let col = 0; col < colCount; col++) {
        currentRow.push(this.createNode(row, col));
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
      isFinish: row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
      distance: Infinity,
      distanceToFinishNode: Math.abs(this.state.FINISH_NODE_ROW - row) + Math.abs(this.state.FINISH_NODE_COL - col),
      isVisited: false,
      isWall: false,
      previousNode: null,
      isNode: true,
    };
  };

  handleMouseDown = (row, col) => {
    if (!this.state.isRunning) {
      if (this.isGridClear()) {
        if (document.getElementById(`node-${row}-${col}`).className === 'node node-start') {
          this.setState({
            mousePressed: true,
            isStartNode: true,
            currRow: row,
            currCol: col,
          });
        } else if (document.getElementById(`node-${row}-${col}`).className === 'node node-finish') {
          this.setState({
            mousePressed: true,
            isFinishNode: true,
            currRow: row,
            currCol: col,
          });
        } else {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({
            grid: newGrid,
            mousePressed: true,
            isWallNode: true,
            currRow: row,
            currCol: col,
          });
        }
      } else {
        this.clearGrid();
      }
    }
  }

  isGridClear = () => {
    for (const row of this.state.grid) {
      for (const node of row) {
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
        if (nodeClassName === 'node node-visited' || nodeClassName === 'node node-shortest-path') {
          return false;
        }
      }
    }
    return true;
  }

  handleMouseEnter = (row, col) => {
    if (!this.state.isRunning) {
      if (this.state.mousePressed) {
        const nodeClassName = document.getElementById(`node-${row}-${col}`).className;
        if (this.state.isStartNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevStartNode = this.state.grid[this.state.currRow][this.state.currCol];
            prevStartNode.isStart = false;
            document.getElementById(`node-${this.state.currRow}-${this.state.currCol}`).className = 'node';

            this.setState({ currRow: row, currCol: col });

            const currStartNode = this.state.grid[row][col];
            currStartNode.isStart = true;
            document.getElementById(`node-${row}-${col}`).className = 'node node-start';
          }
          this.setState({ START_NODE_ROW: row, START_NODE_COL: col });
        } else if (this.state.isFinishNode) {
          if (nodeClassName !== 'node node-wall') {
            const prevFinishNode = this.state.grid[this.state.currRow][this.state.currCol];
            prevFinishNode.isFinish = false;
            document.getElementById(`node-${this.state.currRow}-${this.state.currCol}`).className = 'node';

            this.setState({ currRow: row, currCol: col });

            const currFinishNode = this.state.grid[row][col];
            currFinishNode.isFinish = true;
            document.getElementById(`node-${row}-${col}`).className = 'node node-finish';
          }
          this.setState({ FINISH_NODE_ROW: row, FINISH_NODE_COL: col });
        } else if (this.state.isWallNode) {
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({ grid: newGrid });
        }
      }
    }
  }

  handleMouseUp = (row, col) => {
    if (!this.state.isRunning) {
      this.setState({ mousePressed: false });
      
      if (this.state.isStartNode) {
        const isStartNode = !this.state.isStartNode;
        this.setState({ isStartNode, START_NODE_ROW: row, START_NODE_COL: col });
      } else if (this.state.isFinishNode) {
        const isFinishNode = !this.state.isFinishNode;
        this.setState({
          isFinishNode,
          FINISH_NODE_ROW: row,
          FINISH_NODE_COL: col,
        });
      }
      this.getInitialGrid();
    }
  }

  handleMouseLeave = () => {
    if (this.state.isStartNode) {
      const isStartNode = !this.state.isStartNode;
      this.setState({ isStartNode, mousePressed: false });
    } else if (this.state.isFinishNode) {
      const isFinishNode = !this.state.isFinishNode;
      this.setState({ isFinishNode, mousePressed: false });
    } else if (this.state.isWallNode) {
      const isWallNode = !this.state.isWallNode;
      this.setState({ isWallNode, mousePressed: false });
      this.getInitialGrid();
    }
  }

  clearGrid = () => {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();

      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;

          if (
            nodeClassName !== 'node node-start' &&
            nodeClassName !== 'node node-finish' &&
            nodeClassName !== 'node node-wall'
          ) {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) + Math.abs(this.state.FINISH_NODE_COL - node.col);
          }

          if (nodeClassName === 'node node-finish') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode = 0;
          }
          
          if (nodeClassName === 'node node-start') {
            node.isVisited = false;
            node.distance = Infinity;
            node.distanceToFinishNode =
              Math.abs(this.state.FINISH_NODE_ROW - node.row) + Math.abs(this.state.FINISH_NODE_COL - node.col);
            node.isStart = true;
            node.isWall = false;
            node.previousNode = null;
            node.isNode = true;
          }
        }
      }
    }
  }

  clearWalls = () => {
    if (!this.state.isRunning) {
      const newGrid = this.state.grid.slice();

      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;

          if (nodeClassName === 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node';
            node.isWall = false;
          }
        }
      }
    }
  }

  handleClear = () => {
    this.clearGrid()
    this.clearWalls()
  }

  visualize = (algo) => {
    if (!this.state.isRunning) {
      this.clearGrid();
      this.toggleIsRunning();

      const { grid } = this.state;
      const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
      const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];

      let visitedNodesInOrder;
      switch (algo) {
        case 'Dijkstra':
          visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
          break;
        case 'BFS':
          visitedNodesInOrder = bfs(grid, startNode, finishNode);
          break;
        case 'DFS':
          visitedNodesInOrder = dfs(grid, startNode, finishNode);
          break;
        default:
          break;
      }

      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      nodesInShortestPathOrder.push('end');
      this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }
  }

  animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;

        if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
          document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
        }
      }, 10 * i);
    }
  }


  animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if (nodesInShortestPathOrder[i] === 'end') {
        setTimeout(() => {
          this.toggleIsRunning();
        }, i * 50);
      } else {
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          const nodeClassName = document.getElementById(`node-${node.row}-${node.col}`).className;
          if (nodeClassName !== 'node node-start' && nodeClassName !== 'node node-finish') {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
          }
        }, i * 40);
      }
    }
  }

  render() {
    const { grid, mousePressed } = this.state;
    return (
      <Wrapper>
        <ChartWrapper onMouseLeave={() => this.handleMouseLeave()}>
            {grid.map((row, rowIdx) => {
              return (
                <ChartRowWrapper key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isFinish, isStart, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        isFinish={isFinish}
                        isStart={isStart}
                        isWall={isWall}
                        mousePressed={mousePressed}
                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                        onMouseUp={() => this.handleMouseUp(row, col)}
                        row={row}
                      ></Node>
                    );
                  })}
                  <br />
                </ChartRowWrapper>
              );
            })}
        </ChartWrapper>
        <ButtonWrapper>
          <Button variant='contained' style={ButtonStyle} onClick={() => this.handleClear()}>
            Clear
          </Button>
          <Button variant='contained' style={ButtonStyle} onClick={() => this.visualize('BFS')}>
            BFS
          </Button>
          <Button variant="contained" style={ButtonStyle} onClick={() => this.visualize('DFS')}>
            DFS
          </Button>
          <Button variant='contained' style={ButtonStyle} onClick={() => this.visualize('Dijkstra')}>
            Dijkstra
        </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!node.isStart && !node.isFinish && node.isNode && !node.isWall) {
    const newNode = {
      ...node,
      isWall: !node.isWall  ,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};


function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

const ButtonStyle = { width: '15%', height: '100%', margin: '1%' };

const Wrapper = styled.div`
  width: 100vw;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 8vh;
  padding: 1.5vh;
`;

const ChartWrapper = styled.div`
  width: 80%;
  height: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center; 

  padding: 1%;
  border: 3px solid #5f5f5f;
  border-radius: 10px;
`;

const ChartRowWrapper = styled.div`
  display: flex;
  height: 4%;
  
`