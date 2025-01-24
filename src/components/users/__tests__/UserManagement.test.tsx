// UsersManagement.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import UserServiceClient from "../../../services/UserService";
import { User } from "../../../interfaces/types";
import UsersManagement from "../UsersManagement";

// Mock the UserServiceClient
jest.mock("../../services/UserService");

describe("UsersManagement Component", () => {
  let mockGetUsers: jest.Mock;
  let mockCreateUser: jest.Mock;
  let mockUpdateUser: jest.Mock;
  let mockDeleteUser: jest.Mock;
  let mockGeneratePDF: jest.Mock;

  beforeEach(() => {
    // Reset the mock functions before each test
    mockGetUsers = jest.fn();
    mockCreateUser = jest.fn();
    mockUpdateUser = jest.fn();
    mockDeleteUser = jest.fn();
    mockGeneratePDF = jest.fn();

    // Mock the UserServiceClient instance
    (UserServiceClient.getInstance as jest.Mock).mockReturnValue({
      getUsers: mockGetUsers,
      createUser: mockCreateUser,
      updateUser: mockUpdateUser,
      deleteUser: mockDeleteUser,
      generatePDF: mockGeneratePDF,
    });
  });

  test("renders UsersManagement component", () => {
    render(<UsersManagement />);

    // Check if the title is rendered
    expect(screen.getByText("User Management")).to.exist;
  });

  test("fetches users on mount", async () => {
    const mockUsers: User[] = [
      { id: "1", email: "test1@example.com", name: "User One", role: "USER" },
      { id: "2", email: "test2@example.com", name: "User Two", role: "ADMIN" },
    ];

    // Mock the getUsers function to return mock users
    mockGetUsers.mockResolvedValue(mockUsers);

    render(<UsersManagement />);

    // Wait for the component to fetch users
    await waitFor(() => expect(mockGetUsers).callCount(1));

    // Check if the users are displayed in the table
    expect(screen.getByText("User One")).to.exist;
    expect(screen.getByText("User Two")).to.exist;
  });

  test("adds a new user", async () => {
    render(<UsersManagement />);

    // Click the 'Add User' button
    fireEvent.click(screen.getByText("Add User"));

    // Fill out the new user form in the dialog
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "newuser@example.com" } });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "New User" } });
    fireEvent.change(screen.getByLabelText("Role"), { target: { value: "USER" } });

    // Mock the createUser function
    mockCreateUser.mockResolvedValueOnce(undefined);

    // Click the save button
    fireEvent.click(screen.getByText("Save"));

    // Wait for the component to fetch users after creation
    await waitFor(() => expect(mockCreateUser).calledOn(1));
    expect(mockGetUsers).calledOn(2); // fetchUsers is called again after adding a user
  });

  test("edits an existing user", async () => {
    const mockUsers: User[] = [
      { id: "1", email: "test1@example.com", name: "User One", role: "USER" },
    ];

    mockGetUsers.mockResolvedValue(mockUsers);

    render(<UsersManagement />);

    // Wait for users to load
    await waitFor(() => expect(mockGetUsers).calledOn(1));

    // Click the edit icon for the first user
    fireEvent.click(screen.getAllByLabelText("edit")[0]);

    // Edit the user details
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "editeduser@example.com" } });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Edited User" } });

    // Mock the updateUser function
    mockUpdateUser.mockResolvedValueOnce(undefined);

    // Save the edited user
    fireEvent.click(screen.getByText("Save"));

    // Wait for the user to be updated
    await waitFor(() => expect(mockUpdateUser).calledOn(1));
    expect(mockGetUsers).calledOn(2); // fetchUsers is called after update
  });

  test("deletes a user", async () => {
    const mockUsers: User[] = [
      { id: "1", email: "test1@example.com", name: "User One", role: "USER" },
    ];

    mockGetUsers.mockResolvedValue(mockUsers);
    mockDeleteUser.mockResolvedValueOnce(undefined);

    render(<UsersManagement />);

    // Wait for users to load
    await waitFor(() => expect(mockGetUsers).calledOn(1));

    // Click the delete icon for the first user
    fireEvent.click(screen.getAllByLabelText("delete")[0]);

    // Confirm deletion in the mock prompt
    global.confirm = jest.fn(() => true);

    // Wait for the delete function to be called
    await waitFor(() => expect(mockDeleteUser).calledOn(1));
    expect(mockGetUsers).calledOn(2); // fetchUsers is called after delete
  });

  test("generates a PDF report for a user", async () => {
    mockGeneratePDF.mockResolvedValueOnce({ url: "https://example.com/report.pdf" });

    render(<UsersManagement />);

    // Wait for users to load
    await waitFor(() => expect(mockGetUsers).calledOn(1));

    // Click the generate PDF icon for the user
    fireEvent.click(screen.getAllByLabelText("download")[0]);

    // Check if generatePDF is called
    await waitFor(() => expect(mockGeneratePDF).calledOn(1));
  });
});
