import React, { useState, useEffect } from "react";
import {
  Alert,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";

const WorkersTableRows = props => (
  <tr>
    <th className="d-none d-md-table-cell">{props.currentWorkersList._id}</th>
    <th>{props.currentWorkersList.name}</th>
    <th>{props.currentWorkersList.position}</th>
    <th>
      <Button
        color="danger"
        className="ml-3"
        onClick={() => {
          props.deleteWorker(props.currentWorkersList._id);
        }}
      >
        {" "}
        x{" "}
      </Button>
    </th>
  </tr>
);

const Workers = () => {
  const [workersList, setWorkersList] = useState([]);
  const [modal, setModal] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputPosition, setInputPosition] = useState("");
  const [formValidation, setFormValidation] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get("api/workers", {
        cancelToken: source.token
      })
      .then(response => {
        setWorkersList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, [workersList]);

  const List = () => {
    return workersList.map(currentWorker => {
      return (
        <WorkersTableRows
          currentWorkersList={currentWorker}
          key={currentWorker._id}
          deleteWorker={() => {
            deleteWorker(currentWorker._id);
          }}
        />
      );
    });
  };

  const toggle = () => setModal(!modal);

  const nameOnChange = e => {
    setInputName(e.target.value);
  };
  const posOnChange = e => {
    setInputPosition(e.target.value);
  };

  const deleteWorker = id => {
    axios.delete(`api/workers/${id}`).then(res => console.log(res.data));
  };

  const submit = () => {
    if (inputName && inputPosition) {
      const workersAdd = {
        name: inputName,
        position: inputPosition
      };
      axios.post("api/workers", workersAdd).then(res => console.log(res.data));
      setInputName("");
      setInputPosition("");
      setModal(!modal);
    } else {
      setFormValidation(true);
    }
  };

  return (
    <>
      <h3 className="text-center my-3">Table of Employees:</h3>
      <Table>
        <thead>
          <tr>
            <th className="d-none d-md-table-cell">Id</th>
            <th>Name</th>
            <th>Position</th>
            <th>Action</th>
          </tr>
          {List()}
        </thead>
      </Table>
      <Button className="ml-2" onClick={toggle}>
        Add a new Employee
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a new employee</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="inputName">Name:</Label>
              <Input
                id="inputName"
                type="text"
                placeholder="Employees name"
                value={inputName}
                onChange={nameOnChange}
              ></Input>
              <Label className="mt-2" for="inputpos">
                Position:
              </Label>
              <Input
                id="inputPos"
                type="text"
                placeholder="Employees position"
                value={inputPosition}
                onChange={posOnChange}
              ></Input>
              <Button className="mt-3 mr-2" color="success" onClick={submit}>
                Add
              </Button>
              <Button className="mt-3" color="danger" onClick={toggle}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
          {formValidation ? (
            <Alert className="mt-3" color="danger">
              Please, fill all form fields!
            </Alert>
          ) : null}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Workers;
