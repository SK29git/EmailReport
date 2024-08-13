import { fetcher } from "../Utils/useFetchWrapper";

//const fetchWrapper = fetcher();
const baseUrl = "http://10.20.8.88/CBIEMAIL_REPORT_API/api";
//"https://localhost:44380/api";  //"https://10.5.8.88/Speechminer/api"; //"https://10.5.8.88/CBI_REPORT_API/api";




export const GetEmailReportApi = (reqobj) => {

  return fetch(`${baseUrl}/Report/GetEmailReport`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqobj),
  });
};
// export const GetFormDataApi = () => {

//   return fetch(`${baseUrl}/Report/GetForms`, {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },

//   });
// };

