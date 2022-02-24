const loginReducer = (prevState, action) =>{
    switch(action.type)
    {
      case 'RetrieveToken':
        return{
          ...prevState,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Login':
        return{
          ...prevState,
          userToken : action.userToken,
          isLoading : false
        };
      case 'Logout':
        return{
          ...prevState,
          userToken : null,
        };
      case 'Register':
        return{
          ...prevState,
          userToken : action.userToken,
          isLoading : false
        };
    }
}
const initialLoginState = {
isLoading : true,
userToken : null,
}
export {loginReducer, initialLoginState};