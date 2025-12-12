"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  OutlinedInput,
  Link,
} from "@mui/material";
import Image from "next/image";

export function ForgotPasswordFlow() {
  // MODAL STATES
  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const [openResetModal, setOpenResetModal] = React.useState(false);
  const [openNotFoundModal, setOpenNotFoundModal] = React.useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);


  // INPUT STATES
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const handleOpenEmailModal = () => setOpenEmailModal(true);
  const handleCloseEmailModal = () => setOpenEmailModal(false);

  const handleCloseResetModal = () => setOpenResetModal(false);

  const handleCloseNotFoundModal = () => setOpenNotFoundModal(false);

  // ⚡ 1) SEND email to backend
  const handleSendEmail = async () => {
    if (!email.includes("@")) return; // validación mínima

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      // EMAIL NOT FOUND
      if (res.status === 404) {
        setOpenEmailModal(false);
        setOpenNotFoundModal(true);
        return;
      }

      // EMAIL OK
      if (res.ok) {
        setOpenEmailModal(false);
        setOpenResetModal(true);
      }
    } catch (err) {
      console.error("Error calling API:", err);
    }
  };

  // ⚡ 2) VALIDATE passwords
  const passwordsMatch =
    password.length >= 8 &&
    password2.length >= 8 &&
    password === password2 &&
    otp.length > 0;

  const handleResetPassword = async () => {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          password,
          confirmPassword: password2,
        }),
      });

      if (res.ok) {
        setOpenResetModal(false);
        setOpenSuccessModal(true);
      } else {
        setOpenResetModal(false);
        setOpenErrorModal(true);
      }
    } catch (err) {
      console.error(err);
      setOpenResetModal(false);
      setOpenErrorModal(true);
    }
  };


  return (
    <>
      {/* === THE TRIGGER BUTTON === */}
      <Button
        onClick={handleOpenEmailModal}
        sx={{
          fontSize: 14,
          color: "#3f51b5",
          fontWeight: 600,
          textTransform: "none",
          padding: 0,
          minWidth: 0,
        }}
      >
        Forgot your password
      </Button>

      {/* ############################################################ */}
      {/*                   MODAL 1 — ENTER EMAIL                     */}
      {/* ############################################################ */}

      <Dialog
        open={openEmailModal}
        onClose={handleCloseEmailModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Forgot your password?
        </Typography>

         <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Typography sx={{ mb: 3, color: "#555" }}>
          If you have forgotten your password, please enter the email address
          you used to register so we can send you a recovery code.
        </Typography>

        <Typography sx={{ mb: 1 }}>Email Address</Typography>

        <OutlinedInput
          fullWidth
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ background: "#fff", borderRadius: 2, mb: 4 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseEmailModal}
            sx={{
              borderColor: "#A45CE8",
              color: "#000",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            CLOSE
          </Button>

          <Button
            variant="contained"
            onClick={handleSendEmail}
            disabled={email.length === 0}
            sx={{
              backgroundColor: email ? "#E92070" : "#F0D6EB",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            SEND
          </Button>
        </Box>
      </Dialog>

      {/* ############################################################ */}
      {/*             MODAL 2 — OTP + NEW PASSWORD (RESET)            */}
      {/* ############################################################ */}

      <Dialog
        open={openResetModal}
        onClose={handleCloseResetModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            New Password
          </Typography>
          <Button onClick={handleCloseResetModal} sx={{ minWidth: 0 }}>
            ✕
          </Button>
        </Box>
         <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        {/* OTP */}
        <Typography sx={{ mb: 1 }}>Enter your OTP</Typography>
        <OutlinedInput
          fullWidth
          placeholder="Code sent to your email"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ background: "#fff", borderRadius: 2, mb: 3 }}
        />

        {/* PASSWORD */}
        <Typography sx={{ mb: 1 }}>Enter your new password</Typography>
        <OutlinedInput
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ background: "#fff", borderRadius: 2, mb: 3 }}
        />

        {/* PASSWORD 2 */}
        <Typography sx={{ mb: 1 }}>Repeat your new password</Typography>
        <OutlinedInput
          fullWidth
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          sx={{ background: "#fff", borderRadius: 2, mb: 4 }}
        />

        {/* FOOTER */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleCloseResetModal}
            sx={{
              borderColor: "#A45CE8",
              color: "#000",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            CLOSE
          </Button>

          <Button
            variant="contained"
            disabled={!passwordsMatch}
            onClick={handleResetPassword}
            sx={{
              backgroundColor: passwordsMatch ? "#E92070" : "#F0D6EB",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            SEND
          </Button>
        </Box>
      </Dialog>

      {/* ############################################################ */}
      {/*         MODAL 3 — EMAIL NOT FOUND (ERROR MODAL)             */}
      {/* ############################################################ */}

      <Dialog
        open={openNotFoundModal}
        onClose={handleCloseNotFoundModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Email address not found
          </Typography>

          <Button onClick={handleCloseNotFoundModal} sx={{ minWidth: 0 }}>
            ✕
          </Button>
        </Box>
         <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Box sx={{ textAlign: "center", py: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Image
              src="/assets/x-circle.png"
              width={80}
              height={80}
              alt="x-circle"
            />
          </Box>

          <Typography sx={{ mt: 2, mb: 1 }}>
            The email address you entered is not in our records.
          </Typography>

          <Typography sx={{ mb: 4 }}>
            Please check the email address you entered or request registration
            using the corresponding form{" "}
            <Link
              href="/register"
              sx={{ color: "#3f51b5", fontWeight: 600 }}
            >
              (Register)
            </Link>
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={handleCloseNotFoundModal}
            sx={{
              borderColor: "#A45CE8",
              color: "#000",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Dialog>


      {/* ############################################################ */}
      {/*         MODAL 4 — SUCCESS                                    */}
      {/* ############################################################ */}

      <Dialog
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            New Password
          </Typography>

          <Button onClick={() => setOpenSuccessModal(false)} sx={{ minWidth: 0 }}>
            ✕
          </Button>
        </Box>
         <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Box sx={{ textAlign: "center", py: 3 }}>
          <Image
            src="/assets/check-circle.png"
            width={70}
            height={70}
            alt="success"
          />

          <Typography sx={{ mt: 3, mb: 2, fontSize: 18 }}>
            ¡Password changed successfully!
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => setOpenSuccessModal(false)}
            sx={{
              borderColor: "#A45CE8",
              color: "#000",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Dialog>

      {/* ############################################################ */}
      {/*         MODAL 5 — ERROR.                                     */}
      {/* ############################################################ */}
      <Dialog
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            New Password
          </Typography>

          <Button onClick={() => setOpenErrorModal(false)} sx={{ minWidth: 0 }}>
            ✕
          </Button>
        </Box>

        {/* Línea divisoria */}
        <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Box sx={{ textAlign: "center", py: 3 }}>
          {/* 🔽 CENTRADO REAL */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Image
              src="/assets/x-circle.png"
              width={70}
              height={70}
              alt="error"
            />
          </Box>

          <Typography sx={{ mt: 3, mb: 2 }}>
            The OTP code is incorrect or the information provided for the
            new password is not the same.
          </Typography>

          <Typography>Please check and try again.</Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="outlined"
            onClick={() => setOpenErrorModal(false)}
            sx={{
              borderColor: "#A45CE8",
              color: "#000",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
            }}
          >
            CLOSE
          </Button>
        </Box>
      </Dialog>



    </>
  );
}
