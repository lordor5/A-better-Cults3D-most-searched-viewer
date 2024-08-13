interface Dataset {
  label: string;
  data: Array<number | null>;
  average: number;
  emptySlots: number;
}

export function orderDataset(dataset: Array<Dataset>) {
  let newDataset: Array<Dataset> = [];

  for (let i = 0; i < dataset.length; i++) {
    let average = Math.round(dataset[i].average);

    console.log(newDataset, average);

    if (newDataset[average] === undefined) {
      newDataset[average] = dataset[i];
    } else if (dataset[i].average > newDataset[average].average) {
      let pos = 0;

      for (let j = 0; j < dataset.length; j++) { // busca el hueco por encima del average completo
        if (newDataset[average+j]) {  // si existe, busca por si hay mas datos después 
          for (let k = j; k < dataset.length; k++) {
            if (newDataset[average+k] >) { // si encuentra los datos, campara para ver cual es el mas grande

            }
          }
        }
        else if (dataset[i].average > newDataset[average + j].average) {
          pos = j;
          break;
        }
      }

      //console.log(dataset[i].average, ">", newDataset[average + pos].average);
      newDataset.splice(average + pos, 0, dataset[i]);
    } else if (dataset[i].average < newDataset[average].average) {
      let pos = 0;
      while (
        //newDataset[average + pos] &&
        dataset[i].average > newDataset[average + pos].average &&
        pos > -1000
      ) {
        pos--;
      }
      //console.log(dataset[i].average, "<", newDataset[average + pos].average);
      newDataset.splice(average + pos, 0, dataset[i]);
    }
  }

  for (let i = 0; i < newDataset.length; i++) {
    if (!newDataset[i]) {
      newDataset.splice(i, 1);
      i--;
    }
  }
  return newDataset;
}

const testDataset = [
  { label: "5", average: 6.3, emptySlots: 2, data: [] },
  { label: "2", average: 1.4, emptySlots: 2, data: [] },
  { label: "3", average: 2, emptySlots: 2, data: [] },
  { label: "4", average: 5, emptySlots: 2, data: [] },
  { label: "1", average: 1.2, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },
  { label: "5", average: 6.3, emptySlots: 2, data: [] },
  { label: "2", average: 1.4, emptySlots: 2, data: [] },
  { label: "3", average: 2, emptySlots: 2, data: [] },
  { label: "4", average: 5, emptySlots: 2, data: [] },
  { label: "1", average: 1.2, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },
  { label: "5", average: 6.3, emptySlots: 2, data: [] },
  { label: "2", average: 1.4, emptySlots: 2, data: [] },
  { label: "3", average: 2, emptySlots: 2, data: [] },
  { label: "4", average: 5, emptySlots: 2, data: [] },
  { label: "1", average: 1.2, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },

  { label: "6", average: 6.4, emptySlots: 2, data: [] },
  { label: "7", average: 6.8, emptySlots: 2, data: [] },
  { label: "8", average: 6.9, emptySlots: 2, data: [] },
  { label: "9", average: 7.1, emptySlots: 2, data: [] },
];

export async function GET() {
  orderDataset(testDataset);
  return new Response();
}
