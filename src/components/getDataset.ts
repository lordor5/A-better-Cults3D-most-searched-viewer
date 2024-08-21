import { scrapData, getNumberOfModels } from "../components/scraper.ts";
import { insertionSort } from "./orderDataset.ts";
import { getKeywords, calculateAverage, createData } from "./functions.ts";

interface Dataset {
  label: string;
  data: Array<number | null>;
  average: number;
  emptySlots: number;
  numberOfModels: number;
}

export async function getMonthYearArray() {
  const { monthYearArray } = await scrapData();

  return monthYearArray;
}

interface GetDatasetAverage {
  datasets: Array<Dataset>;
  monthYearArray: Array<string>;
}

export async function getDataset_average(): Promise<GetDatasetAverage> {
  const { data, monthYearArray } = await scrapData();

  const keywords: Array<string> = getKeywords(data);

  let datasets: Array<Dataset> = [];
  for (var i = 0; i < keywords.length; i++) {
    const positions = createData(data, keywords[i], monthYearArray);
    const { average, emptySlots } = calculateAverage(positions);
    datasets.push({
      label: keywords[i],
      data: positions,
      average: average,
      emptySlots: emptySlots,
      numberOfModels: 0,
    });
  }

  datasets = insertionSort(datasets);

  const res = { datasets, monthYearArray };
  return res;
}

export async function getDataset_average_numberOfModels() {
  // const { data, monthYearArray } = await scrapData();

  // const keywords = getKeywords(data);

  // let positions = populatePositions(keywords, monthYearArray);

  // //let positions: Array<Array<number | null>> = [];
  // for (let i = 0; i < data.length; i++) {
  //   positions = OrderData(keywords, positions, data[i], i);
  // }

  const { datasets } = await getDataset_average();
  //TODO: remove some data to have faster builds

  let keywords: Array<string> = [];
  for (let i = 0; i < datasets.length; i++) {
    keywords[i] = datasets[i].label;
  }

  const numberOfModels = await getNumberOfModels(keywords);

  for (var i = 0; i < datasets.length; i++) {
    datasets[i].numberOfModels = numberOfModels[i];
  }

  return datasets;
}
