"use client";
import React from "react";

export default function NotFound() {
  const [url, setUrl] = React.useState("");
  React.useEffect(() => {
    setUrl(window.location.pathname.replace('/post/', ''))
  }, []);
  return <>Post `{url}` Not Found</>;
}
