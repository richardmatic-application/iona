import { useEffect, useState, useContext } from "react";
import http from "./../api/index";
import { CatContext } from "../contexts/CatContext";
import { CatAction } from "../contexts/CatContext";

interface ParamsType {
  endpoint: string;
  action: CatAction
  params?: Object;
  options?: Object;
}

interface IUseFetch {
  loading: boolean;
  response: any;
  error: Error | null
}

const UseFetch = (params: ParamsType): IUseFetch => {
  const [loading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<any>([]);
  const [error, setError] = useState<Error | null>(null);
  const { state, dispatch } = useContext(CatContext);

  const fetchData = async () => {
    if(state.data.breeds.length !== 0 && params.endpoint === '/breeds') {
      setResponse(state.data.breeds);
      setLoading(false);
      return;
    }

    try {
      const result = await http.get(params.endpoint,
        { data: params },
      );
    
      dispatch({ type: params.action, payload: result.data });
      setResponse(result.data);
    } catch (error) {
      const err = error as Error;
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, response, error };
};

export default UseFetch;
