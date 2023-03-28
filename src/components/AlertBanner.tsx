import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type MessageProps = {
  message: string;
};

export const AlertBanner = ({message}: MessageProps): JSX.Element => {
  const [show, setShow] = useState<boolean>(true);

  return (
    <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>something went wrong!</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
}