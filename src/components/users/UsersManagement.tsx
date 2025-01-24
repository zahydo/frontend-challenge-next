import { Add, Delete, Download, Edit } from "@mui/icons-material";
import {
    Button,
    Container,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { UserType } from "../../interfaces/types";
import UpsertDialog from "./UpsertDialog";
import UserServiceClient from "../../services/UserService";

const DEFAULT_NEW_USER: UserType = { email: "", name: "", role: "USER", id: undefined };


const UsersManagement = () => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newUser, setNewUser] = useState<UserType>(DEFAULT_NEW_USER);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [openUpsertDialog, setOpenUpsertDialog] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };


    const fetchUsers = useCallback(async () => {
        try {
            const serviceInstance = UserServiceClient.getInstance();
            const data = await serviceInstance.getUsers({ search: searchTerm || undefined });
            setUsers(data);
            setEditingIndex(null);
            setNewUser(DEFAULT_NEW_USER);
            setOpenUpsertDialog(false);
        } catch (error) {
            console.error(error);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const addOrUpdateUser = async () => {
        if (editingIndex !== null) {
            setEditingIndex(null);
            await UserServiceClient.getInstance().updateUser(newUser);
        } else {
            await UserServiceClient.getInstance().createUser(newUser);
        }
        await fetchUsers();
        setNewUser(DEFAULT_NEW_USER);
        setOpenUpsertDialog(false);
    };

    const editUser = (index: number) => {
        console.log(index)
        console.log(users)
        setNewUser(users[index]);
        setEditingIndex(index);
        setOpenUpsertDialog(true);
    };

    const deleteUser = (index: number) => {
        const response = confirm(`Are you sure you want to delete the user ${users[index].name}?`);
        if (response) {
            handleConfirmDelete(index);
        }
    };

    const handleConfirmDelete = async (index: number) => {
        await UserServiceClient.getInstance().deleteUser(users[index]?.id as string);
        await fetchUsers();
    }

    const generatePDF = (user: UserType) => {
        console.log(user)
    };

    const handleOpenUpsertDialog = () => {
        setNewUser(DEFAULT_NEW_USER);
        setOpenUpsertDialog(true);
    }

    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        await fetchUsers();
    }

    return (
        <Container>
            <Typography variant="h3" component="h1">User Management</Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                onClick={handleOpenUpsertDialog}
            >
                Add User
            </Button>

            <TextField
                label="Search Users by Name or Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
            />

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
                        {users.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => editUser(index)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="error" onClick={() => deleteUser(index)}>
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

            <UpsertDialog
                open={openUpsertDialog}
                onClose={() => setOpenUpsertDialog(false)}
                user={newUser}
                handleChanges={handleInputChange}
                handleSave={addOrUpdateUser}
            />
        </Container>
    );
};

export default UsersManagement;