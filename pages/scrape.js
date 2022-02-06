import Head from "next/head";
import { useState } from "react";
import Button from "../components/button";
import Form from "../components/form";
import Input from "../components/input";
import { validateURL } from "../utils";

function scrapeUrl(url) {
  return fetch(`/api/scraping?url=${encodeURIComponent(url)}`).then((res) =>
    res.json()
  );
}

export default function Scrape() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);
  const [json, setJson] = useState(null);

  const onChange = (name, value) => {
    setUrl(value);
    setError(null);
    setJson(null);
  };

  const scrape = async (e) => {
    if (!validateURL(url)) {
      setError(`${url} is not a valid Poshmark User Info URL`);
    } else {
      const result = await scrapeUrl(url);
      setJson(result);
    }
  };

  return (
    <>
      <Head>
        <title>Scrape Poshmark page</title>
      </Head>
      <div className="w-full max-w-md mx-auto my-10">
        <Form>
          <Input
            label="URL"
            name="url"
            placeholder="https://www.poshmark.com/closet/"
            value={url}
            onChange={onChange}
            error={error}
          />
          <Button onClick={scrape}>Scrape!</Button>
        </Form>
      </div>
      <div className="w-full max-w-md mx-auto my-10">
        {json ? (
          <ul>
            <li>name: {json["name"]}</li>
            <li>listing: {json["listing"]}</li>
            <li>profilePic: {json["profilePic"]}</li>
          </ul>
        ) : null}
      </div>
    </>
  );
}
