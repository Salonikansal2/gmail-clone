import axios from "axios";

const API_URI = "https://gmail-clone-otb6.onrender.com";

const API_GMAIL = async (serviceUrlObject, requestData = {}, type) => {
  return await axios({
    method: serviceUrlObject.method,
    url: `${API_URI}/${serviceUrlObject.endpoint}/${type}`,
    data: requestData,
  });
};

export default API_GMAIL;
