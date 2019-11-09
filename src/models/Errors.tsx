import React from "react";
import { Modal } from "antd";

export class UserError extends Error {
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  status: number;
}

export class ValidationError extends Error {
  constructor(property: string, message: string) {
    super(message);
    this.property = property;
  }

  property: string;
}

// Error format coming from the backend
export interface ResponseError {
  property?: string;
  message: string;
}

const formatValidationError: React.FC<ValidationError> = e => {
  return (
    <div>
      <p>Invalid property: {e.property}</p>
      <p>{e.message}</p>
    </div>
  );
};

const formatUserError: React.FC<UserError> = e => {
  return (
    <div>
      <p>Error status: {e.status}</p>
      <p>{e.message}</p>
    </div>
  );
};

const formatUnknownError: React.FC<Error> = e => {
  return (
    <div>
      <p>Error name: {e.name}</p>
      <p>{e.message}</p>
      {e.stack && <p>{e.stack}</p>}
    </div>
  );
};

const showError = (e: Error) => {
  if (e instanceof ValidationError) {
    Modal.warning({
      title: "Validation error",
      content: formatValidationError(e)
    });
  } else if (e instanceof UserError) {
    Modal.error({
      title: "An error has occured",
      content: formatUserError(e)
    });
  } else {
    Modal.error({
      title: "An error has occured",
      content: formatUnknownError(e)
    });
  }
};

export { showError };
