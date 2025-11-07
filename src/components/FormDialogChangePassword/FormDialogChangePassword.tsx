"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Box,
    TextField,
    Button,
    Typography,
} from "@mui/material";
import { changePassword } from "@/actions/changePassword.action";

interface DialogProps {
    open: boolean;
    handleCloseDialog: () => void;
}

const initialValues = {
    password: "",
    newPassword: ""
}
const validationSchema = Yup.object({
    password: Yup.string()
        .required("Current password is required")
        .min(8, "Must be at least 8 characters"),
    newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Must be at least 8 characters")
        .test("uppercase", "Must contain an uppercase letter", (val) =>
            val ? /[A-Z]/.test(val) : false
        )
        .test("lowercase", "Must contain a lowercase letter", (val) =>
            val ? /[a-z]/.test(val) : false
        )
        .test("number", "Must contain a number", (val) =>
            val ? /[0-9]/.test(val) : false
        )
        .test("special", "Must contain a special character", (val) =>
            val ? /[#?!@$%^&*-]/.test(val) : false
        ),
});

export default function FormDialogChangePassword({
    open,
    handleCloseDialog,
}: DialogProps) {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const res = await changePassword(values)
            console.log(res);

        },
    });

    return (
        <Dialog
            open={open}
            onClose={handleCloseDialog}
            PaperProps={{
                sx: {
                    borderRadius: "8px",
                    width: "380px",
                    padding: "24px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    backgroundColor: "#fff",
                },
            }}
            sx={{
                "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.08)" },
            }}
        >
            <DialogContent sx={{ p: 0 }}>
                <Box className="flex flex-col h-full justify-evenly gap-5">
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ fontWeight: 600, color: "#0a0b21" }}
                    >
                        Reset Password
                    </Typography>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                        <TextField
                            name="password"
                            label="Current password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.submitCount >= 1 && formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.submitCount >= 1 && formik.touched.password && formik.errors.password
                            }
                        />

                        <TextField
                            name="newPassword"
                            label="New password"
                            type="password"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.submitCount >= 1 && formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                            }
                            helperText={
                                formik.submitCount >= 1 && formik.touched.newPassword && formik.errors.newPassword
                            }
                        />
                        {
                            !formik.isSubmitting && formik.status ? <p className="text-red-500 text-sm font-medium ps-2">{formik.status}</p> : null
                        }
                        <DialogActions sx={{ px: 0, mt: 2 }}>
                            <Button
                                onClick={() => {
                                    handleCloseDialog()
                                    formik.resetForm()
                                }}
                                type="button"
                                variant="outlined"
                                sx={{
                                    textTransform: "none",
                                    borderColor: "#d1d5db",
                                    color: "#374151",
                                    "&:hover": { borderColor: "#9ca3af", background: "#f9fafb" },
                                    borderRadius: "8px",
                                    flex: 1,
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    backgroundColor: "#0a0b21",
                                    "&:hover": { backgroundColor: "#111236" },
                                    borderRadius: "8px",
                                    flex: 1,
                                }}
                            >
                                Change Password
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
