import React from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Card, Container } from 'react-bootstrap';
import { AlertBanner } from '../components/AlertBanner';
import { CatAction } from '../contexts/CatContext';
import UseFetch from '../hooks/useFetch';

const CatDetails = (): JSX.Element => {
  const params = useParams();
  const {
    loading: catDetailsLoading,
    response: catDetailsResponse,
    error: catDetailsError,
  } = UseFetch({ endpoint: `/images/${params.id}`, action: CatAction.FetchCatDetails });

  return (
    <div>
      <Container>
        {catDetailsError &&
          <AlertBanner message='Apologies but
          we could not load new cats for you at this time! Miau!' />}
      </Container>
      <NavBar />
      <div>
        {catDetailsLoading && 'Fetching cat details...'}
      </div>
      {catDetailsResponse &&
        <Card style={{ margin: '5rem auto', width: '60rem' }}>
          <Card.Img variant="top" src={catDetailsResponse.url} />
          <Card.Body>
            <Card.Title>
              Name: {catDetailsResponse.breeds?.[0].name}
            </Card.Title>
            <Card.Text>
              Origin: {catDetailsResponse.breeds?.[0].origin}
            </Card.Text>
            <Card.Text>
              Temperament: {catDetailsResponse.breeds?.[0].temperament}
            </Card.Text>
            <Card.Text>
              Description: {catDetailsResponse.breeds?.[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
      }
  </div>
  );
}

export default CatDetails;
