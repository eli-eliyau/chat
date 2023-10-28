import axios from "axios";

export const API_SERVER = "http://localhost:4000/api";

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
