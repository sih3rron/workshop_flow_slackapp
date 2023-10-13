const fetchData = async (method, uri, body={}) => {

    const GETOPTIONS = {
      "method": `${method}`,
      "headers": {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${process.env.MIRO_APP_TOKEN}`,
      },
    };

    const OPTIONS = {
      "method": `${method}`,
      "headers": {
        "accept": "application/json",
        "content-type": "application/json",
        "Authorization": `Bearer ${process.env.MIRO_APP_TOKEN}`,
      },
      "body": JSON.stringify(body),
    };

    const needsBody = method == "GET" ? GETOPTIONS : OPTIONS;

    const URL = uri;
    const req = await fetch(URL, needsBody);
    const res = await req.json();
    return res;
  };
  
exports.fetchData = fetchData;
  