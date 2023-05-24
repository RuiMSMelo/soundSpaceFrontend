import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";


function Message() {
    const [comment, setComment] = useState("");
  
    const [errorMessage, setErrorMessage] = useState("");
  
    const { token } = useContext(SessionContext);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/api/messages`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
              comment,
            }),
          }
        );
        if (response.status === 201) {
          event.target.reset()
          setComment("")
        } else {
          const errorResponse = await response.json();
          setErrorMessage(errorResponse.message);
        }
      };

  return (
    <div>
    Message me:
    <form onSubmit={handleSubmit}>
        <label>Comment: <textarea name='comment' cols='30' rows='10' value={comment} onChange={(event) => setComment(event.target.value)} required/></label>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <button className="formBtn" type='submit'>Submit Message</button>
    </form>
    </div>
  )
}

export default Message