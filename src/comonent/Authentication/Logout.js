import { useHistory } from "react-router-dom";

const Logout = () => {
  const TokenValue = localStorage.getItem("tokenValue");
  const history = useHistory()
  
  history.push("/login");
  return (<>
    {
        window.localStorage.removeItem(TokenValue)
    }
    </>
  );
};

export default Logout;
