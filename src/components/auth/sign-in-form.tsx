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
  Backdrop,
  CircularProgress,
} from "@mui/material";

import { paths } from "@/paths";
import { authClient } from "@/lib/auth/custom/client";
import { ForgotPasswordFlow } from "./ForgotPasswordFlow";

const schema = zod.object({
  email: zod.string().email("Email is required"),
  password: zod.string().min(1, "Password is required"),
  accept: zod.boolean().refine((val) => val === true, {
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
    setError,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", accept: false },
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [hasReadPolicies, setHasReadPolicies] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const email = watch("email");
  const password = watch("password");
  const accept = watch("accept");

  const isButtonEnabled =
    email.trim() !== "" &&
    password.trim() !== "" &&
    accept === true;

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      setHasReadPolicies(true);
    }
  };

  const onSubmit = async (values: Values) => {
    try {
      setIsPending(true);
      setIsLoading(true);

      const { error } = await authClient.signInWithPassword(values);

      if (error) {
        setError("root", { type: "server", message: error });
        return;
      }

      router.push(paths.portal);
    } finally {
      setIsPending(false);
      setIsLoading(false);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleCloseModal = () => setOpen(false);

  const registerUrl = cms?.loginUrlLinkRegister;
  const agreementUrl = `${process.env.NEXT_PUBLIC_STRAPI_MEDIA}${cms?.loginUrlLinkAgreement}`;
  const agreementText = cms?.loginParagraphAgreement;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <>
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 600, textAlign: "left" }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {/* EMAIL */}
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

            {/* LINKS */}
            <Box sx={{ fontSize: 14, fontWeight: 600 }}>
              <Stack spacing={0.5} alignItems="flex-end">
                <ForgotPasswordFlow />

                <Link href={registerUrl} underline="hover">
                  New user? Register
                </Link>
              </Stack>
            </Box>

            {/* PASSWORD */}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <FormControl fullWidth error={Boolean(errors.password)}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput {...field} type="password" label="Password" />
                  {errors.password && (
                    <FormHelperText>{errors.password.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Typography sx={{ fontWeight: 600 }}>
              Confidentiality Agreement & Policies
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 2, maxHeight: 170, overflowY: "auto", borderRadius: 2 }}
              ref={scrollRef}
              onScroll={handleScroll}
            >
              <Typography component="div" sx={{ fontSize: 14, textAlign: "justify" }}>
                {agreementText}
              </Typography>
            </Paper>

            <Link
              href={`${agreementUrl}`}
              target="_blank"
              underline="hover"
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              <NextImage
                src="/assets/register_icon.png"
                width={20}
                height={20}
                alt="doc"
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
                    disabled={!hasReadPolicies}
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        disabled={!hasReadPolicies}
                      />
                    }
                    label="I agree to the Confidentiality Agreement & Policies"
                  />
                  {errors.accept && (
                    <FormHelperText>{errors.accept.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            {/* SUBMIT */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isButtonEnabled || isPending}
              sx={{
                height: 48,
                fontWeight: 600,
                backgroundColor: isButtonEnabled ? "#E92070" : "#e5d1ee",
              }}
            >
              LOGIN
            </Button>

            {errors.root && (
              <Alert severity="error">{errors.root.message}</Alert>
            )}

            <Typography sx={{ fontSize: 13, textAlign: "center", color: "text.secondary" }}>
              Having trouble accessing your account? Contact us at{" "}
              <Link href="mailto:ir@wom.cl">ir@wom.cl</Link>
            </Typography>
          </Stack>
        </form>
      </Stack>

      {/* LOADING OVERLAY */}
      <Backdrop
        open={isLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
          backdropFilter: "blur(4px)",
          color: "#fff",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, fontWeight: 600 }}>
            Signing you in...
          </Typography>
        </Box>
      </Backdrop>
    </>
  );
}
