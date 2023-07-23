import axios from "axios";
import { API_SERVER } from "./apiToServer";

const apiInsertMessage = async (message: object, toUrlServer: string) => {
  try {
    console.log(message);

    const res = await axios({
      method: "post",
      url: `${API_SERVER}/${toUrlServer}`,
      data: {
        // _id_from_user:
        // _id_to_user:
        _message: message,
      },
    });
    if (res.data === true) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export { apiInsertMessage };
