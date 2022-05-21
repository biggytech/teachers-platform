import RedirectError from "@lib/RedirectError";
import logger from "@logger";

const handleRedirectError = (error: any) => {
  if (error instanceof RedirectError) {
    logger.info(`Redirected user to "${error.destination}"`)
    return {
      redirect: {
        destination: error.destination,
        permanent: false,
      },
    };
  } else {
    logger.err(error.message);
    return error;
  }
}

export default handleRedirectError;