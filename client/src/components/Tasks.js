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
import Moment from "react-moment";

const TasksTableRows = props => (
  <tr>
    <th className="d-none d-md-table-cell">{props.currentTasksList._id}</th>
    <th>{props.currentTasksList.name}</th>
    <th>{props.currentTasksList.worker}</th>
    <th className="d-none d-md-table-cell">
      <Moment format="YYYY-MM-DD">{props.currentTasksList.deadline}</Moment>
    </th>
    <th>
      {!props.currentTasksList.done ? (
        <>
          <Button
            color="success"
            className=" mt-1"
            onClick={() => {
              props.finishTask(props.currentTasksList._id);
            }}
          >
            Done
          </Button>{" "}
          <Button
            color="danger"
            className="ml-3 mt-1"
            onClick={() => {
              props.deleteTask(props.currentTasksList._id);
            }}
          >
            {" "}
            x{" "}
          </Button>{" "}
        </>
      ) : (
        <span className="text-center border rounded-lg border-success text-success px-1 py-1">
          TASK DONE!
        </span>
      )}
    </th>
  </tr>
);

const Option = props => <option>{props.name}</option>;

const Tasks = () => {
  const [tasksList, setTasksList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [modal, setModal] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmployee, setInputEmployee] = useState();
  const [inputDate, setInputDate] = useState("2020-04-01");
  const [formValidation, setFormValidation] = useState(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get("api/tasks", {
        cancelToken: source.token
      })
      .then(response => {
        setTasksList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, [tasksList]);
  useEffect(() => {
    let source = axios.CancelToken.source();

    axios
      .get("api/workers", {
        cancelToken: source.token
      })
      .then(response => {
        setEmployeeList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, [employeeList]);

  const deleteTask = id => {
    axios.delete(`api/tasks/${id}`).then(res => console.log(res.data));
  };

  const finishTask = id => {
    axios.post(`api/tasks/update/${id}`).then(res => console.log(res.data));
  };

  const List = () => {
    return tasksList.map(currentTask => {
      return (
        <TasksTableRows
          currentTasksList={currentTask}
          key={currentTask._id}
          deleteTask={() => {
            deleteTask(currentTask._id);
          }}
          finishTask={() => {
            finishTask(currentTask._id);
          }}
        />
      );
    });
  };

  const optionList = () => {
    return employeeList.map(listOfEmployees => {
      return <Option name={listOfEmployees.name} key={listOfEmployees._id} />;
    });
  };

  const toggle = () => {
    setModal(!modal);
    setInputName("");
  };
  const nameOnChange = e => {
    setInputName(e.target.value);
  };

  const selectOnChange = e => {
    setInputEmployee(e.target.value);
  };

  const dateOnChange = e => {
    console.log(inputDate);
    setInputDate(e.target.value);
  };

  const submit = () => {
    if (inputName && inputEmployee && inputDate) {
      const tasksAdd = {
        name: inputName,
        worker: inputEmployee,
        deadline: inputDate,
        done: false
      };
      axios.post("api/tasks", tasksAdd).then(res => console.log(res.data));
      setInputName("");
      setModal(!modal);
    } else {
      setFormValidation(true);
    }
  };

  return (
    <>
      <h3 className="text-center my-3">Current tasks:</h3>
      <Table>
        <thead>
          <tr>
            <th className="d-none d-md-table-cell">Id</th>
            <th>Task</th>
            <th>Employee</th>
            <th className="d-none d-md-table-cell">Due to</th>
            <th>Action</th>
          </tr>
          {List()}
        </thead>
      </Table>
      <Button className="ml-2" onClick={toggle}>
        Add a new Task
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a new employee</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="inputName">Task name:</Label>
              <Input
                id="inputName"
                type="text"
                placeholder="Task name"
                value={inputName}
                onChange={nameOnChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label className="mt-2" for="employeeSelect">
                Employee responsible for the task:
              </Label>
              <Input
                type="select"
                value={inputEmployee}
                name="select"
                id="employeeSelect"
                onChange={e => selectOnChange(e)}
              >
                <option defaultValue hidden>
                  choose employee for this task..
                </option>
                {optionList()}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate">Date</Label>
              <Input
                type="date"
                name="date"
                id="exampleDate"
                value={inputDate}
                onChange={e => dateOnChange(e)}
              />
            </FormGroup>
            <Button className="mr-2 mt-3" color="success" onClick={submit}>
              Add
            </Button>
            <Button className="mt-3" color="danger" onClick={toggle}>
              Cancel
            </Button>
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

export default Tasks;
