

export const loginRequest = async (data: { username: string; password: string }) => {

  const body = JSON.stringify(data);
  // console.log("body", body)
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
  })

  const result = await response.json()

  // console.log(result)

  return result
}