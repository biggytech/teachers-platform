class RedirectError extends Error {
  destination: string;

  constructor(message: string, destination: string) {
    super(message);
    this.destination = destination;
  }
}

export default RedirectError;