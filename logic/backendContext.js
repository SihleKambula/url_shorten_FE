import axios from "axios";

// //Handle post request to backend
async function postLongUrl(longUrl) {
  const response = await axios.post("http://localhost:5000/api/url/shorten", {
    longUrl,
  });
  return response.data;
}
