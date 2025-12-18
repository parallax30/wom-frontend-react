"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  OutlinedInput,
} from "@mui/material";
import Image from "next/image";
import { getUserById, getUsers, putUser } from "@/services/apiService";

export function ForgotPasswordFlow() {
  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const [openOtpModal, setOpenOtpModal] = React.useState(false);
  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
  const [openErrorModal, setOpenErrorModal] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const [userId, setUserId] = React.useState<string | null>(null);

  // Validación mínima
  const passwordsMatch =
    password.length >= 8 &&
    password2.length >= 8 &&
    password === password2 &&
    otp.length > 0;

  // -------------------------------------------------------------
  // 1️⃣ ENVIAR EMAIL PARA RECUPERAR CONTRASEÑA
  // -------------------------------------------------------------
  const handleSendEmail = async () => {
    if (!email.includes("@")) return;

    try {
      const res = await getUsers({ params: { filters: { email: { $eq: email } } } });
    
      if (!res.data || res.data.length === 0) {
        setOpenEmailModal(false);
        setOpenErrorModal(true);
        return;
      }

      const user = res.data[0];
      setUserId(user.id);

      // 2️⃣ Generar OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      // 3️⃣ Actualizar usuario en Strapi con OTP
      await putUser(user.id, { OTP: generatedOtp });

      // 4️⃣ Enviar OTP por correo
      await fetch(`${process.env.NEXT_PUBLIC_HELPER_API}/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          name: user.name,
          otp: generatedOtp,
        }),
      });

      setOpenEmailModal(false);
      setOpenOtpModal(true);
    } catch (err) {
      console.error(err);
      setOpenEmailModal(false);
      setOpenErrorModal(true);
    }
  };

  // -------------------------------------------------------------
  // 2️⃣ CONFIRMAR OTP Y NUEVA CONTRASEÑA
  // -------------------------------------------------------------
  const handleConfirmOtp = async () => {
    if (!userId) return;

    try {
      // 1️⃣ Obtener usuario de Strapi
      const res = await getUserById(userId); 
      
      if (!res) throw new Error("User not found");

      // 2️⃣ Validar OTP
      if (res?.data?.OTP !== otp) {
        setOpenOtpModal(false);
        setOpenErrorModal(true);
        return;
      }

      // 3️⃣ Actualizar contraseña en Strapi
      await putUser(userId, { password, OTP: "" }); //OTP ES CON MAYÚSCULAS

      setOpenOtpModal(false);
      setOpenSuccessModal(true);
    } catch (err) {
      console.error(err);
      setOpenOtpModal(false);
      setOpenErrorModal(true);
    }
  };

  return (
    <>
      {/* Trigger */}
      <Button
        onClick={() => setOpenEmailModal(true)}
        sx={{ fontSize: 14, color: "#3f51b5", fontWeight: 600, textTransform: "none", padding: 0 }}
      >
        Forgot your password
      </Button>

      {/* Modal Email */}
      <Dialog open={openEmailModal} onClose={() => setOpenEmailModal(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Forgot your password?</Typography>
        <Typography sx={{ mb: 3 }}>Enter your email to receive a recovery code.</Typography>
        <OutlinedInput
          fullWidth
          placeholder="example@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenEmailModal(false)}>CLOSE</Button>
          <Button variant="contained" onClick={handleSendEmail} disabled={!email}>SEND</Button>
        </Box>
      </Dialog>

      {/* Modal OTP */}
      <Dialog open={openOtpModal} onClose={() => setOpenOtpModal(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 3 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Reset Password</Typography>
        <OutlinedInput placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 2 }} />
        <OutlinedInput type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 2 }} />
        <OutlinedInput type="password" placeholder="Confirm password" value={password2} onChange={(e) => setPassword2(e.target.value)} sx={{ mb: 4, backgroundColor: "#fff", borderRadius: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenOtpModal(false)}>CLOSE</Button>
          <Button variant="contained" disabled={!passwordsMatch} onClick={handleConfirmOtp}>CONFIRM</Button>
        </Box>
      </Dialog>

      {/* Modal Success */}
      <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 3 } }}>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Image src="/assets/check-circle.png" width={70} height={70} alt="success" />
          <Typography sx={{ mt: 3, mb: 2, fontSize: 18 }}>Password changed successfully!</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => setOpenSuccessModal(false)}>CLOSE</Button>
        </Box>
      </Dialog>

      {/* Modal Error */}
      <Dialog open={openErrorModal} onClose={() => setOpenErrorModal(false)} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 4, p: 3 } }}>
        <Box sx={{ textAlign: "center", py: 3 }}>
          <Image src="/assets/x-circle.png" width={70} height={70} alt="error" />
          <Typography sx={{ mt: 3, mb: 2 }}>OTP incorrect or password mismatch.</Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => setOpenErrorModal(false)}>CLOSE</Button>
        </Box>
      </Dialog>
    </>
  );
}
