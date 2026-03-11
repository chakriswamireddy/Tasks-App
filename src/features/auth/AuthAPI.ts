


export const loginRequest = async (data: { username:  string, password:  string }) => {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  return response.json()
}