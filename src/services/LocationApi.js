export function LocationApi() {
  return fetch("https://localhost:44308/api/Org/loc", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Token: localStorage.getItem("tok"),
    }),
  }).then((res) => res.json());
}
 