import { ICatsByBreed } from "./types";

export const removeDuplicate = (catsByBreed: ICatsByBreed[], newCatsByBreed: ICatsByBreed[]) => {
  return [...catsByBreed, ...newCatsByBreed.filter(obj2 => {
    return catsByBreed.findIndex(obj1 => obj1.id === obj2.id) === -1;
  })];
}
