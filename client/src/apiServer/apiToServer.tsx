import axios from "axios";

export const API_SERVER = "http://localhost:3005/api";
export const API_CLINTE ='http://localhost:3000'
export const API_SOCKET_IO ="http://localhost:3005"


const apiPost = async (data: object | [{}], toUrlServer: string) => {
  try {

    const res = await axios({
      method: "post",
      url: `${API_SERVER}/${toUrlServer}`,
      data,
    });
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const apiAllUsers = async (toUrlServer: string) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API_SERVER}/${toUrlServer}`,
    });
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export { apiPost, apiAllUsers };
