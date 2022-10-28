import React, { useEffect, useState } from 'react';
import About from './ABOUT.md';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

export function AboutComponent () {

  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(About)
      .then((response) => response.text()).then((text) => {
        setContent(text)
      });
  }, []);

  return (
    <div className="container max-w-full flex-grow px-10 bg-white/[.85] dark:bg-slate-800 text-slate-900 dark:text-white overflow-auto">
      <ReactMarkdown children={ content } remarkPlugins={ [remarkGfm] } />
    </div>
  );
}