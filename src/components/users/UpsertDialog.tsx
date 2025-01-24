import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React from "react";
import { User } from "../../interfaces/types";
import { useTranslation } from "next-i18next";

interface UpsertDialogProps {
    open: boolean;
    onClose: () => void;
    user: User
    handleChanges: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSave: () => void;
}

export default function UpsertDialog(props: UpsertDialogProps): React.ReactElement {
    const { open, onClose, user, handleChanges, handleSave } = props;
    const { t } = useTranslation("index");

    const handleChangeRole = (event: SelectChangeEvent<"ADMIN" | "USER">) => {
        const value = event.target.value;
        handleChanges({
            target: {
                name: "role",
                value
            }
        } as React.ChangeEvent<HTMLInputElement>);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSave();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <form onSubmit={onSubmit}>
                <DialogTitle>{t(`${user.id ? "Edit User" : "Add User"}`)}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label={t("Name")}
                        name="name"
                        type="text"
                        fullWidth
                        required
                        value={user.name}
                        onChange={handleChanges}
                    />
                    <TextField
                        margin="dense"
                        label={t("Email")}
                        name="email"
                        type="email"
                        fullWidth
                        required
                        value={user.email}
                        onChange={handleChanges}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="user-role-label">Role</InputLabel>
                        <Select
                            labelId="user-role-label"
                            id="user-role"
                            value={user.role}
                            label={t("Role")}
                            onChange={handleChangeRole}
                        >
                            <MenuItem value={"ADMIN"}>{t("Admin")}</MenuItem>
                            <MenuItem value={"USER"}>{t("User")}</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}