"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import NextImage from "next/image";


import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
  Paper,
  Dialog,
} from "@mui/material";

import { paths } from "@/paths";
import { authClient } from "@/lib/auth/custom/client";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";

const schema = zod.object({
  email: zod.string().email("Email is required"),
  password: zod.string().min(1, "Password is required"),
  accept: zod.boolean().refine(val => val === true, {
    message: "You must accept the policies",
  }),
});

type Values = zod.infer<typeof schema>;

export function SignInForm({ cms }: { cms: any }): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors }
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", accept: false },
  });

  const [isPending, setIsPending] = React.useState(false);

  // Track if user reached bottom of scroll
  const [hasReadPolicies, setHasReadPolicies] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Enable button only if all conditions are met
  const email = watch("email");
  const password = watch("password");
  const accept = watch("accept");

  const isButtonEnabled =
    email.trim() !== "" &&
    password.trim() !== "" &&
    accept === true &&
    hasReadPolicies;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;
    if (atBottom) setHasReadPolicies(true);
  };

  const onSubmit = async (values: Values) => {
    setIsPending(true);

    const { error } = await authClient.signInWithPassword(values);

    if (error) {
      setError("root", { type: "server", message: error });
      setIsPending(false);
      return;
    }

    setIsPending(false);

    router.push(paths.portal);
  };

  const [open, setOpen] = React.useState(false);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const registerUrl = cms?.loginUrlLinkRegister;      //TODO: Esto no va porque es un modal
  const forgotPassUrl = cms?.loginUrlLinkForgotPass;  //TODO: Esto no va porque es un modal
  const agreementUrl = cms?.loginUrlLinkAgreement;
  const agreementText = cms?.loginParagraphAgreement

  const [mounted, setMounted] = React.useState(false);


  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Stack spacing={3} sx={{ width: "100%", maxWidth: 600, textAlign: "left" }}>
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        Login
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>


          {/* EMAIL FIELD */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.email)}>
                <InputLabel>Email Address</InputLabel>
                <OutlinedInput {...field} type="email" label="Email Address" />
                {errors.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />


          {/* PASSWORD + Forgot password */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 500 }}> </Typography>

            <ForgotPasswordFlow />

          </Box>
          {mounted && (<Dialog
            open={open}
            onClose={handleCloseModal}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              sx: {
                borderRadius: 4,
                p: 3,
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                New Password
              </Typography>
              <Button onClick={handleCloseModal} sx={{ minWidth: 0 }}>
                ✕
              </Button>
            </Box>

            {/* FORM FIELDS */}
            <Box sx={{ mt: 1 }}>
              <Typography sx={{ mb: 1 }}>Enter your OTP</Typography>
              <OutlinedInput
                fullWidth
                placeholder="Code sent to your email"
                sx={{ background: "#fff", borderRadius: 2, mb: 3 }}
              />

              <Typography sx={{ mb: 1 }}>Enter your new password</Typography>
              <OutlinedInput
                fullWidth
                type="password"
                sx={{ background: "#fff", borderRadius: 2, mb: 3 }}
              />

              <Typography sx={{ mb: 1 }}>Repeat your new password</Typography>
              <OutlinedInput
                fullWidth
                type="password"
                sx={{ background: "#fff", borderRadius: 2, mb: 4 }}
              />
            </Box>

            {/* FOOTER BUTTONS */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
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
                disabled
                sx={{
                  backgroundColor: "#F0D6EB",
                  color: "#fff",
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                }}
              >
                SEND
              </Button>
            </Box>
          </Dialog>)}


          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  type="password"
                  label="Password"
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />


          {/* CONFIDENTIALITY AGREEMENT title */}
          <Typography sx={{ fontWeight: 600, mt: 2 }}>
            Confidentiality Agreement & Policies
          </Typography>

          {/* SCROLLABLE BOX */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              maxHeight: 170,
              overflowY: "auto",
              borderRadius: 2,
            }}
            ref={scrollRef}
            onScroll={handleScroll}
          >
            <Typography component="div" sx={{ color: "text.secondary", fontSize: 14 }}>
              {agreementText}
            </Typography>
          </Paper>

          {/* Download LINK */}
          <Link
            href={agreementUrl}
            target="_blank"
            underline="hover"
            sx={{ fontSize: 15, display: "flex", gap: 1, alignItems: "center" }}
          >
            <NextImage
              src="/assets/register_icon.png"
              width={20}
              height={20}
              style={{ width: 'auto', height: 'auto' }}
              alt="doc icon"
            />
            Download our Confidentiality Agreement & Policies Document
          </Link>


          {/* CHECKBOX */}
          <Controller
            control={control}
            name="accept"
            render={({ field }) => (
              <FormControl error={Boolean(errors.accept)}>
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="I accept the Confidentiality Agreement & Policies"
                />
                {errors.accept && (
                  <FormHelperText>{errors.accept.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* SUBMIT BUTTON */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={!isButtonEnabled || isPending}
            sx={{
              color: "#fff",
              backgroundColor: isButtonEnabled ? "#E92070" : "#e5d1ee",
              "&:hover": {
                backgroundColor: isButtonEnabled ? "#c81c62" : "#e5d1ee",
              },
              height: 48,
              fontWeight: 600,
            }}
          >
            LOGIN
          </Button>

          {errors.root && <Alert severity="error">{errors.root.message}</Alert>}
        </Stack>
      </form>
    </Stack>
  );
}
