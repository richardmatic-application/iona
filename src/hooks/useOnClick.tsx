import catService from '../api/catService';
import { removeDuplicate } from '../helpers/utils';
import { ICatsByBreed } from '../helpers/types';

interface ParamsType {
  catCount: number,
  catsByBreed: Array<ICatsByBreed>,
  page: number,
  selected: string,
  setCatCount: (value: number) => void,
  setCatsByBreed: (value: Array<ICatsByBreed>) => void,
  setError: (value: Error | null) => void,
  setHide: (value: boolean) => void,
  setPage: (value: number) => void,
}

interface IUseHandleClick {
  handleClick: () => Promise<void>
}

const UseHandleClick = (params: ParamsType): IUseHandleClick => {
  const { 
    catCount,
    catsByBreed,
    page,
    selected,
    setCatCount,
    setCatsByBreed,
    setError,
    setHide,
    setPage,
  } = params;

  const handleClick = async () => {
    try {
      const { data } = await catService.getCatsByBreed({
        id: selected,
        page,
      });

      const catBreedsDeDuplicate = removeDuplicate(catsByBreed, data);
      
      if (catBreedsDeDuplicate.length === catCount) {
        setHide(true);
        return;
      }

      setPage(page + 1);
      setCatCount(catBreedsDeDuplicate.length);
      setCatsByBreed(catBreedsDeDuplicate);
    } catch (error) {
      const err = error as Error;
      setError(err);
    }
  };

  return { handleClick };
};

export default UseHandleClick;
