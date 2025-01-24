import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { UserType } from "../../interfaces/types";

interface UpsertDialogProps {
    open: boolean;
    onClose: () => void;
    user: UserType
    handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
}

export default function UpsertDialog(props: UpsertDialogProps): React.ReactElement {
    const { open, onClose, user, handleChanges, handleSave } = props;

    const handleChangeRole = (event: SelectChangeEvent<"ADMIN" | "USER">) => {
        const value = event.target.value;
        handleChanges({
            target: {
                name: "role",
                value
            }
        } as React.ChangeEvent<HTMLInputElement>);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{user.id ? "Edit" : "Add"} User</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    name="name"
                    type="text"
                    fullWidth
                    value={user.name}
                    onChange={handleChanges}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    value={user.email}
                    onChange={handleChanges}
                />

                <FormControl fullWidth>
                    <InputLabel id="user-role-label">Role</InputLabel>
                    <Select
                        labelId="user-role-label"
                        id="user-role"
                        value={user.role}
                        label="Role"
                        onChange={handleChangeRole}
                    >
                        <MenuItem value={"ADMIN"}>Admin</MenuItem>
                        <MenuItem value={"USER"}>User</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}