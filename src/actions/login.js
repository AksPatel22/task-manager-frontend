import axios from "axios";

const headers = {
  "Content-Type": "application/json",
};

export const loginUser = async (body) => {
  try {
    const response = await axios.post(
      "https://task-manager-server-5gxe.onrender.com/api/v1/auth/login",
      JSON.stringify(body),
      { headers }
    );
    const { status, data } = response;
    if (status === 200) {
      console.log(data);
    } else {
      console.log(status);
    }
  } catch (error) {
    console.log(error);
  }
};
