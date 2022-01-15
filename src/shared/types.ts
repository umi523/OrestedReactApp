export type ServiceResult<T> = {
  data: T;
  success: boolean;
  message: string;
};

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  status: number;
};

export type ErrorMessage = {
  hasError: boolean;
  errorMessage: string;
};
