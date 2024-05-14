const API_URL =
  "https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data";

interface Api {
  url: string;
  method?: string;
  tokenKey?: "idToken" | "accessToken";
  headers?: object;
}

async function fetcher(
  api: Api,
  variables: Partial<Record<"path" | "query" | "body", any>>
) {
  const { url: _url, tokenKey, ...init } = api;
  const { path, query, body } = variables;

  let pathname = _url;
  if (path) pathname = generatePathname(pathname, path);
  if (query) pathname += generateSearch(query);

  const url = new URL(pathname, API_URL);

  let token = null;
  // try {
  //   switch (tokenKey) {
  //     case "idToken":
  //       token = await revalidateIdTokenOnce();
  //       break;
  //     case "accessToken":
  //       token =
  //         (await revalidateAccessTokenOnce()) ??
  //         (await revalidateGuestAccessTokenOnce());
  //       console.log("fet2 token : ", token);
  //       break;
  //   }
  // } catch (error) {
  //   console.log("e", error);
  // }

  const headers = {
    // "user-agent": ua,
    // ...(token && {
    //   Authorization: `Bearer ${token}`,
    // }),
    ...(body && {
      "Content-Type":
        body instanceof FormData ? "multipart/form-data" : "application/json",
    }),
    ...init.headers,
  };

  // const res = await fetch(url.toJSON().replace(/\/$/, ""), {
  const res = await fetch(`${API_URL}${pathname}`, {
    ...init,
    headers,
    ...(body && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  });
  const json = await res.json();
  console.log("fetch json : ", json);
  // console.log(
  //   `[${init.method || "GET"} - ${url.toJSON()}] ${
  //     body ? jsonPrettyStringify(body) : ""
  //   }`
  // );

  // if (__DEV__) {
  //   // console.log("----------")
  //   console.log(
  //     `[${init.method || "GET"} - ${url.toJSON()}] ${
  //       body ? jsonPrettyStringify(body) : ""
  //     }`
  //   );
  //   // // console.log(`header: ${jsonPrettyStringify(headers)}`)
  //   // // console.log(`${body ? 'body: ' + jsonPrettyStringify(body) : ''}`)
  //   // console.log(`response: ${jsonPrettyStringify(json)}`);
  //   // console.log("----------")
  // }

  return json;
  // return json.data;
}

export default fetcher;

export const generatePathname = (path: string, params: object) => {
  let result = path;
  for (const [key, value] of Object.entries(params)) {
    result = result.replace(`:${key}`, value);
  }
  return result;
};

export const generateSearch = (params: object) => {
  const result = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return result ? `?${result}` : "";
};

export function jsonPrettyStringify(obj: object) {
  return JSON.stringify(obj, null, 2);
}
