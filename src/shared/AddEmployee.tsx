import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { importExcel, postEmployee } from "./apiClient";
import { Employee, ErrorMessage, ServiceResult } from "./types";

export const AddNewItem = (props: any) => {
    const [employeeFormData, setEmployeeFormData] = useState<Employee>({
      firstName: "",
      lastName: "",
      status: 0,
      id: 0,
    });
    
    const [error, setError] = useState<ErrorMessage | undefined>(undefined);
    
    const [selectedFile, setSelectedFile] = useState<File | undefined>(
      undefined
    );

    const handleFileInput = (e: any) => {
      setError({ hasError: false, errorMessage: "" });
      setSelectedFile(e.target.files[0]);
    };

    const handleExcelImport = () => {
      if (selectedFile) {
        const apiReturn = importExcel(selectedFile);
        apiReturn.then(function (result: ServiceResult<Employee[]>) {
          if (result.success) {
            setError({ errorMessage: "", hasError: false });
            setEmployees(undefined);
            props.onHide();
          } else {
            setError({ errorMessage: result.message, hasError: true });
          }
        });
      }
    };

    const handleSubmit = (event: any) => {
      event.preventDefault();
      const apiReturn = postEmployee(employeeFormData);
      apiReturn.then(function (result: ServiceResult<Employee>) {
        if (result.success) {
          setError({ errorMessage: "", hasError: false });
          setEmployees(undefined);
          props.onHide();
        } else {
          setError({ errorMessage: result.message, hasError: true });
        }
      });
    };

    const handleChange = (event: any) => {
      setError({ hasError: false, errorMessage: "" });
      event.preventDefault();
      const name = event.target.name;
      const value = event.target.value;
      setEmployeeFormData((values) => ({ ...values, [name]: value }));
    };

    const handleRadioChange = (event: any) => {
      setError({ hasError: false, errorMessage: "" });
      const value = parseInt(event.target.value);
      setEmployeeFormData((values) => ({ ...values, ["status"]: value }));
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add New Item
          </Modal.Title>

          {error?.hasError && (
            <p className="text-danger">{error?.errorMessage}</p>
          )}
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h4>Import Excel File</h4>
              <form>
                <div className="form-group">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileInput}
                  />
                </div>
                <div className="form-group mt-3 text-center">
                  <Button
                    onClick={handleExcelImport}
                    variant="primary"
                    disabled={!selectedFile?.name.length}
                  >
                    Import
                  </Button>
                </div>
              </form>
            </Col>
            <Col md={6}>
              <h4>Add Item</h4>
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name Here"
                        value={employeeFormData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name Here"
                        value={employeeFormData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <div className="form-group mt-3">
                    <label htmlFor="status">Employment Status</label>
                    <div key={`inline`} className="mb-3">
                      <Form.Check
                        type="radio"
                        inline
                        label="Regular"
                        name="status"
                        value={0}
                        onChange={handleRadioChange}
                      />
                      <Form.Check
                        type="radio"
                        inline
                        label="Contractor"
                        value={1}
                        name="status"
                        onChange={handleRadioChange}
                      />
                    </div>
                  </div>
                </Row>
                <Row>
                  <Col md={12} className="text-center">
                    <Button type="submit" variant="primary">
                      Save
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    );
  }
function setEmployees(undefined: undefined) {
    throw new Error("Function not implemented.");
}

