module.exports = function solveSudoku(matrix) {
  // your solution
  const size = 9;
  const boxSize = 3;

  //ищем пустые места
  const findNull = (matrix) => {
    for (let r = 0; r < size; r++) {//rows
      for (let c = 0; c < size; c++) { //cols
        if (matrix[r][c] === 0) {
          return [r, c]; //findNull всегда возвращает массис со строкой и колонкой
        }
      }
    }
    return null; //если нет свободных ячеек
  }
  const validate = (num, pos, matrix) => { //проверка подходит ли число
    const [r, c] = pos;

    //check rows 
    for (let i = 0; i < size; i++) {
      if (matrix[i][c] === num && i !== r) {
        return false;
      }
    }

    //check cols
    for (let i = 0; i < size; i++) {
      if (matrix[r][i] === num && i !== c) {
        return false;
      }
    }

    //check box
    const boxRow = Math.floor(r / boxSize) * boxSize;
    const boxCol = Math.floor(c / boxSize) * boxSize;

    for (let i = boxRow; i < boxRow + boxSize; i++) {
      for (let j = boxCol; j < boxCol + boxSize; j++) {
        if (matrix[i][j] === num && i !== r && j !== c) { // ТУТ ОШИБКА БЫЛА
          return false;
        }
      }
    }
    return true;
  }
  const solve = () => {
    const curPos = findNull(matrix); //поиск нуля

    if (!curPos) return true;
    for (let i = 1; i <= size; i++) {//перебор возможных для ячейки чисел // ТУТ ПЕРЕПИСАЛ УСЛОВИЕ

      const isValid = validate(i, curPos, matrix);

      if (isValid) {
        const [x, y] = curPos;
        matrix[x][y] = i;

        if (solve()) {
          return true;
        }

        matrix[x][y] = 0;
      }
    }
    return false;
  }
  solve();
  return matrix;
}

