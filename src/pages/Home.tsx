import { useState, useEffect, useContext } from 'react';
import { Button, Container, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import UseFetch from '../hooks/useFetch';
import { AlertBanner } from '../components/AlertBanner';
import UseOnChange from '../hooks/useOnChange';
import UseHandleClick from '../hooks/useOnClick';
import { ICatsByBreed } from '../helpers/types';
import { CatAction, CatContext } from '../contexts/CatContext';

interface ICatsBreed {
  id: string;
  name: string;
};

const Home = (): JSX.Element => {
  const {
    loading: catBreedsLoading,
    response: catBreedsResponse,
    error: catBreedsError,
  } = UseFetch({ endpoint: '/breeds', action: CatAction.FetchCatsByBreed });

  const [page, setPage] = useState<number>(1);
  const [catCount, setCatCount] = useState<number>(0);
  const [catsByBreed, setCatsByBreed] = useState<Array<ICatsByBreed>>([]);
  const [error, setError] = useState<Error | null>(null);
  const { state } = useContext(CatContext)

  const {
    disabled,
    handleChange,
    hide,
    selected,
    setDisabled,
    setHide,
    setSelected,
  } = UseOnChange({ page, setCatCount, setCatsByBreed, setError, setPage });

  const {
    handleClick,
  } = UseHandleClick({
    catCount,
    catsByBreed,
    page,
    selected,
    setCatCount,
    setCatsByBreed,
    setError,
    setHide,
    setPage,
  });

  useEffect(() => {
    if (state.data.selectedCat.length) {
      setDisabled(false);
      setCatsByBreed(state.data.selectedCat);
      setSelected(state.data.selectedCat[0].breeds[0].id);
    }
  }, [setDisabled, setSelected, state.data.selectedCat]);

  return (
    <div>
      <NavBar />
      <Container>
        {(catBreedsError || error)
          && <AlertBanner message='Apologies but
          we could not load new cats for you at this time! Miau!' />}
      </Container>
    
      <Container>
        <Form>
          <Form.Label style={{ margin: '1rem 0' }}>Breed</Form.Label>
          <Form.Select aria-label="Breed"  value={selected} onChange={handleChange}>
            <option>
              {
                catBreedsLoading
                  ? 'Fetching Breed...'
                  : 'Select Breed'
              }
            </option>
            {catBreedsResponse.map((value: ICatsBreed) => {
              return (
                  <option value={value.id} key={value.id}>
                    {value.name}
                  </option>
                );
              })
            }
          </Form.Select>
        </Form>
      </Container>

      <Container style={{ marginTop: '1rem' }}>
        {catsByBreed && catsByBreed.map((details) => {
          return (
            <Card style={{ width: '12rem', margin: '2rem 1rem', display: 'inline-block' }} key={details.id}>
              <Card.Img variant="top" src={details.url} />
              <Card.Body>
                <Link to={`/cat/${details.id}`}>
                  <Button variant="primary">
                    View More
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          );
        })}
      </Container>

      <Container>
        {!hide &&
          <Button
            style={{ marginTop: '1rem' }}
            type="submit"
            onClick={handleClick}
            disabled={disabled}
          >
            Load more
          </Button>
        }
      </Container>
    </div>
  );
}

export default Home;
