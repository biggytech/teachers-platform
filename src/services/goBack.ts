const goBack = () => {
  if (history.length === 1) {
    window.location.replace("/");
  } else {
    history.back();
  }
}

export default goBack;