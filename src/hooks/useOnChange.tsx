import { useState, ChangeEvent, Dispatch, SetStateAction, useContext } from 'react';
import { CatContext, CatAction } from '../contexts/CatContext';
import { ICatsByBreed } from '../helpers/types';
import catService from '../api/catService';


interface ParamsType {
  page: number,
  setCatCount: Dispatch<SetStateAction<number>>,
  setCatsByBreed: Dispatch<SetStateAction<ICatsByBreed[]>>,
  setError: Dispatch<SetStateAction<Error | null>>,
  setPage: Dispatch<SetStateAction<number>>,
}

interface IUseOnChange {
  disabled: boolean,
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => Promise<void>
  hide: boolean,
  selected: string,
  setDisabled: Dispatch<SetStateAction<boolean>>,
  setHide: Dispatch<SetStateAction<boolean>>,
  setSelected: Dispatch<SetStateAction<string>>,
}

const UseOnChange = (params:ParamsType): IUseOnChange => {
  const [selected, setSelected] = useState<string>('');
  const [hide, setHide] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { dispatch } = useContext(CatContext);

  const {
    page,
    setCatCount,
    setCatsByBreed,
    setError,
    setPage,
  } = params;

  const handleChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelected(value);
    setHide(false);
    
    if (value === 'Select Breed') {
      setDisabled(true);
    }

    try {
      const { data } = await catService.getCatsByBreed({
        id: value,
        page,
      });

      setCatCount(data.length);
      setCatsByBreed(data);
      setDisabled(false);
      setPage(page + 1);
      dispatch({ type: CatAction.SelectedCat, payload: data });
    } catch (error) {
      const err = error as Error;
      setError(err);
    }
  };

  return {
    disabled,
    handleChange,
    hide,
    selected,
    setDisabled,
    setHide,
    setSelected,
  };
};

export default UseOnChange;
