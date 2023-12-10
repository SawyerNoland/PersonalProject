const Logout = () => {
  console.log('logged out');
  localStorage.removeItem("token");
  window.location.reload(); 
};

export default Logout;