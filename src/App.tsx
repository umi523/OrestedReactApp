
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { fetchAllEmployees } from "./shared/apiClient";
import { useState } from "react";
import { Employee, ServiceResult } from "./shared/types";
import { AddNewItem } from "./shared/AddEmployee";

function App() {
  const [employees, setEmployees] = useState<Employee[] | undefined>(undefined);
  const [addItemModal, setAddItemModal] = useState<boolean>(false);

  useEffect(() => {
    if (!employees) {
      const apiReturn = fetchAllEmployees();
      apiReturn.then(function (result: ServiceResult<Employee[]>) {
        setEmployees(result.data);
      });
    }
  }, [employees]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 2 }} className="text-center">
          <Button
            className="mb-3"
            variant="primary"
            onClick={() => setAddItemModal(true)}
          >
            Add New Item
          </Button>
          <Table striped bordered hover responsive="sm" variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Employment Status</th>
              </tr>
            </thead>
            <tbody>
              {!employees?.length ? (
                <>
                  <tr>
                    <td colSpan={4}>No Data Found</td>
                  </tr>
                </>
              ) : (
                employees.map((data, index) => {
                  return (
                    <tr key={`tr-${index}`}>
                      <td>{data.id}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td
                        style={{
                          color: data.status === 0 ? "green" : "yellow",
                        }}
                      >
                        {data.status === 0 ? "Regular" : "Contracter"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddNewItem show={addItemModal} onHide={() => setAddItemModal(false)} />
    </Container>
  );
}

export default App;
