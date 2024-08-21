interface Dataset {
  label: string;
  data: Array<number | null>;
  average: number;
  emptySlots: number;
  numberOfModels: number;
}

export function insertionSort(arr: Array<Dataset>) {
  for (let i = 1; i < arr.length; i++) {
    // Start comparing current element with every element before it
    for (let j = i - 1; j > -1; j--) {
      // Swap elements as required
      if (arr[j + 1].average < arr[j].average) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}

export function SortByNumberOfModels(arr: Array<Dataset>) {
  for (let i = 1; i < arr.length; i++) {
    // Start comparing current element with every element before it
    for (let j = i - 1; j > -1; j--) {
      // Swap elements as required
      if (arr[j + 1].numberOfModels < arr[j].numberOfModels) {
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}
