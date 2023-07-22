function factoryError<T>(error: T) {
  if (typeof error === 'string') {
    return {
      errors: [
        {
          message: error
        }
      ]
    };
  }
  if (Array.isArray(error)) {
    return {
      errors: error
    };
  }
  return {
    errors: [error]
  };
}

export default factoryError;
