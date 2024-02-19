import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "./buttonExample.css";

function ButtonExample() {
  return (
    <>
      <Button id="btn-load" variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button>
    </>
  );
}

export default ButtonExample;
