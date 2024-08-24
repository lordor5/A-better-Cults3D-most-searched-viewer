import { inferRemoteSize } from "astro/assets/utils";

// Devuelve un array de keywords diferentes
export function getKeywords(data: Array<Array<string>>) {
  let keywords: Array<string> = [];
  for (let i = 0; i < data.length; i++) {
    //recorre los meses en busca de nuevas palabras
    for (let j = 0; j < data[i].length; j++) {
      //recorre los datos de cada mes
      let esta = false;
      for (let k = 0; k < keywords.length; k++) {
        //recorre las palabras en busca de coincidencias
        if (data[i][j].toLowerCase() === keywords[k]) {
          esta = true;
        }
      }
      //console.log(data[i][j].toLowerCase());
      if (!esta) {
        keywords.push(data[i][j].toLowerCase());
      }
    }
  }

  return keywords;
}

export function populatePositions(
  keywords: Array<string>,
  monthYearArray: Array<string>
) {
  let position: Array<Array<number | null>> = [];

  for (let i = 0; i < keywords.length; i++) {
    position.push([]);
    for (let j = 0; j < monthYearArray.length; j++) {
      position[i].push(0);
    }
  }
  return position;
}

export function OrderData(
  keywords: Array<string>,
  positions: Array<Array<number | null>>,
  data: Array<string>,
  mes: number
) {
  for (let i = 0; i < data.length; i++) {
    //Recorrer los datos
    for (let j = 0; j < positions.length; j++) {
      // recorrer las keywords
      if (data[i].toLowerCase() === keywords[j]) {
        //cuando los datos y la keyword coinciden, añadir en el mes la posición
        if (
          i + 1 < (positions[j][mes] ?? Infinity) ||
          positions[j][mes] === 0
        ) {
          positions[j][mes] = i + 1;
        }
      }
    }
  }

  return positions;
}

export function createData(
  data: Array<Array<string>>,
  keyword: string,
  months: Array<String>
): Array<number | null> {
  let orderedData: Array<number | null> = [];

  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j].toLowerCase() === keyword.toLowerCase()) {
        if (orderedData[i] ?? 0 < j + 1) {
          orderedData[i] = j + 1;
          break;
        }
      } else {
        orderedData[i] = null;
      }
    }
  }
  return orderedData;
}
export function calculateAverage(dataset: Array<number | null>) {
  let average: number = 0;
  let numberOfTimes = 0;

  for (let j = 0; j < dataset.length; j++) {
    if (dataset[j] !== null) {
      average += dataset[j] ?? 0;
      numberOfTimes++;
    }
  }

  average /= numberOfTimes;

  const emptySlots = dataset.length - numberOfTimes;
  const ret = { average, emptySlots };
  return ret;
}
