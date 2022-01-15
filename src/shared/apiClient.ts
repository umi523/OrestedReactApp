import { Employee, ServiceResult } from "./types";
import axios from "axios";

const baseUrl = "https://localhost:7100/Employee/";

export const fetchAllEmployees = async (): Promise<
  ServiceResult<Employee[]>
> => {
  return await axios.get(`${baseUrl}GetAll`).then((res) => res.data);
};

export const importExcel = async (
  file: File
): Promise<ServiceResult<Employee[]>> => {
  const formData = new FormData();
  formData.append("fileName", file.name);
  formData.append("fromFile", file);
  return await axios
    .post(`${baseUrl}ImportExcel`, formData)
    .then((res) => res.data);
};

export const postEmployee = async (
  employee: Employee
): Promise<ServiceResult<Employee>> => {
  return await axios.post(`${baseUrl}Create`, employee).then((res) => res.data);
};
