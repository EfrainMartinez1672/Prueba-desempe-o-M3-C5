export const saveSession = (user) => {
  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );
};

export const getSession = () => {
  return JSON.parse(
    localStorage.getItem("user")
  );
};

export const removeSession = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  return !!getSession();
};

export const isAdmin = () => {
  return getSession()?.role === "admin";
};

export function authGuard(){
  const activeSession = getSession();
  
  if(activeSession === null){
      console.log("There is no active session");
      window.location.hash = '/login';
  }else{
      console.log("active session");
      return true
  }
}

export function roleGuard(role){
    const user = getSession()
    const userRole = user.role 

    if(userRole === role){
        console.log("¡Access granted!")
        return true
    }else{
        console.log("¡Access denied!")
        document.getElementById('content').innerHTML = `
            <h2>¡Access denied!</h2>
            <p>You don't have permission to access this page.</p>
        `
        return false
    }
}
