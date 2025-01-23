import React, { useState, useEffect } from "react";
import {
    Container,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
} from "@mui/material";
import { Add, Edit, Delete, Download } from "@mui/icons-material";

interface UserType {
    email: string;
    name: string;
    role: string;
}

const HomeComponent = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newUser, setNewUser] = useState({ email: "", name: "", role: "" });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    useEffect(() => {
        // Fetch initial user data (replace with actual API call if needed)
        const initialUsers = [
            { email: "john.doe@example.com", name: "John Doe", role: "Admin" },
            { email: "jane.smith@example.com", name: "Jane Smith", role: "User" },
        ];
        setUsers(initialUsers);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const addOrUpdateUser = () => {
        if (editingIndex !== null) {
            // Update existing user
            const updatedUsers = [...users];
            updatedUsers[editingIndex] = newUser;
            setUsers(updatedUsers);
            setEditingIndex(null);
        } else {
            // Add new user
            setUsers([...users, newUser]);
        }
        setNewUser({ email: "", name: "", role: "" });
    };

    const editUser = (index: number) => {
        setNewUser(users[index]);
        setEditingIndex(index);
    };

    const deleteUser = (index: number) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    const generatePDF = (user: UserType) => {
        console.log(user)
        // const doc = new jsPDF();
        // doc.text(`User Activity Summary`, 10, 10);
        // doc.text(`Email: ${user.email}`, 10, 20);
        // doc.text(`Name: ${user.name}`, 10, 30);
        // doc.text(`Role: ${user.role}`, 10, 40);
        // doc.save(`${user.name}_Activity.pdf`);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h3" component="h1">User Management</Typography>

            <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Paper style={{ padding: "16px", marginBottom: "16px" }}>
                <TextField
                    label="Email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={addOrUpdateUser}
                >
                    {editingIndex !== null ? "Update User" : "Add User"}
                </Button>
            </Paper>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => editUser(index)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => deleteUser(index)}>
                                        <Delete />
                                    </IconButton>
                                    <IconButton color="default" onClick={() => generatePDF(user)}>
                                        <Download />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default HomeComponent;