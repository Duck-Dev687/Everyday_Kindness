
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/Form"; // Ensure the import path is correct

// Define a mock type for onSuccess

interface FormProps {
  onSuccess: (name: string) => void;
}

describe("Form Component", () => {
  it("renders the name step initially", () => {
    render(<Form onSuccess={() => {}} />); // TypeScript should infer types from FormProps
    expect(screen.getByText(/Welcome to Everyday Kindness!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your name/i)).toBeInTheDocument();
  });

  it("advances to age step when name is entered", () => {
    render(<Form onSuccess={() => {}} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: "John" } });
    fireEvent.click(screen.getByText(/Next/i));
    
    expect(screen.getByText(/Hello, John!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your age/i)).toBeInTheDocument();
  });

  it("does not proceed without a valid name", () => {
    render(<Form onSuccess={() => {}} />);
    fireEvent.click(screen.getByText(/Next/i)); // Click Next without entering a name

    expect(screen.getByText(/Please enter your name./i)).toBeInTheDocument();
  });

  it("calls onSuccess for valid age > 18", () => {
    const mockOnSuccess = jest.fn(); // Automatically inferred as (name: string) => void
    render(<Form onSuccess={mockOnSuccess} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: "John" } });
    fireEvent.click(screen.getByText(/Next/i));
    fireEvent.change(screen.getByPlaceholderText(/Your age/i), { target: { value: "25" } });
    fireEvent.click(screen.getByText(/Next/i));
    
    expect(mockOnSuccess).toHaveBeenCalledWith("John"); // Ensure it was called with the correct argument
  });

  it("displays error for age <= 18", () => {
    render(<Form onSuccess={() => {}} />);
    
    fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: "John" } });
    fireEvent.click(screen.getByText(/Next/i));
    fireEvent.change(screen.getByPlaceholderText(/Your age/i), { target: { value: "15" } });
    fireEvent.click(screen.getByText(/Next/i));
    
    expect(screen.getByText(/Our app is designed for users above 18 years old./i)).toBeInTheDocument();
  });
});
