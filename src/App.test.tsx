import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("test page content Positive", () => {
  render(<App />);
  const linkElement = screen.queryByText(/GitHub Repo Searcher/i);
  expect(linkElement).toBeInTheDocument();
});

test("test page content Negative", () => {
  render(<App />);
  const linkElement = screen.queryByText(/Hello World/i);
  expect(linkElement).toBeNull();
});
