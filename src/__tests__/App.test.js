// src/__tests__/App.test.js
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Size select element
test("size select element initially displays 'Small'", () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  expect(selectSize).toHaveDisplayValue("Small");
});

// Select Size dropdown updates correctly
test("select Size dropdown displays the user's selected value", async () => {
  render(<App />);
  const selectSize = screen.getByLabelText(/select size/i);
  await userEvent.selectOptions(selectSize, "medium");
  expect(selectSize).toHaveDisplayValue("Medium");
  await userEvent.selectOptions(selectSize, "large");
  expect(selectSize).toHaveDisplayValue("Large");
});

// "Your Selection" text
test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

// Selection updates message
test("selecting options updates the 'Your selection' message", async () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const selectSize = screen.getByLabelText(/select size/i);
  await userEvent.click(addPepperoni);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
  await userEvent.selectOptions(selectSize, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

// Contact Info placeholder
test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

// Typing updates field
test("the page shows information the user types into the contact form field", async () => {
  render(<App />);
  const contact = screen.getByLabelText(/enter your email address/i);
  await userEvent.type(contact, "pizzafan@email.com");
  expect(contact).toHaveValue("pizzafan@email.com");
});

// Submit button
test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /submit order/i })).toBeInTheDocument();
});

// Submit shows message
test("clicking the Place Order button displays a thank you message", async () => {
  render(<App />);
  await userEvent.click(screen.getByRole("button", { name: /submit order/i }));
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
