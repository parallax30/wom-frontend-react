"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RegistrationValues {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  company: string;
  message: string;
}

export function RegistrationForm(): React.JSX.Element {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegistrationValues>({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      profession: "",
      company: "",
      message: "",
    },
  });

  const all = watch();
  const isEnabled =
    all.name &&
    all.lastName &&
    all.email &&
    all.phone &&
    all.profession &&
    all.company;

  const onSubmit = (values: RegistrationValues) => {
    console.log(values);
  };

  const inputStyles = {
    backgroundColor: "#fff",
    borderRadius: 2, // esquinas redondeadas
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#EFF1F3",
        px: { xs: 3, md: 10 },
        py: 6,
      }}
    >
      {/* LOGO */}
      <Box
        sx={{ textAlign: "center", mb: 4, cursor: "pointer" }}
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/wom_empresas_logo.png"
          width={200}
          height={100}
          alt="WOM Empresas"
        />
      </Box>

      {/* TITLE */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Registration Request
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* NAME */}
          <FormControl fullWidth error={Boolean(errors.name)}>
            <InputLabel>Name</InputLabel>
            <Controller
              control={control}
              name="name"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput {...field} label="Name" sx={inputStyles} />
              )}
            />
            {errors.name && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>

          {/* LAST NAME */}
          <FormControl fullWidth error={Boolean(errors.lastName)}>
            <InputLabel>Last Name</InputLabel>
            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput {...field} label="Last Name" sx={inputStyles} />
              )}
            />
            {errors.lastName && (
              <FormHelperText>{errors.lastName.message}</FormHelperText>
            )}
          </FormControl>

          {/* EMAIL */}
          <FormControl fullWidth error={Boolean(errors.email)}>
            <InputLabel>Email Address</InputLabel>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  label="Email Address"
                  sx={inputStyles}
                />
              )}
            />
            {errors.email && (
              <FormHelperText>{errors.email.message}</FormHelperText>
            )}
          </FormControl>

          {/* PHONE */}
          <FormControl fullWidth error={Boolean(errors.phone)}>
            <InputLabel>Phone</InputLabel>
            <Controller
              control={control}
              name="phone"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput {...field} label="Phone" sx={inputStyles} />
              )}
            />
            {errors.phone && (
              <FormHelperText>{errors.phone.message}</FormHelperText>
            )}
          </FormControl>

          {/* PROFESSION */}
          <FormControl fullWidth error={Boolean(errors.profession)}>
            <InputLabel>Profession</InputLabel>
            <Controller
              control={control}
              name="profession"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select {...field} label="Profession" sx={inputStyles}>
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value="Developer">Developer</MenuItem>
                  <MenuItem value="Engineer">Engineer</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
            {errors.profession && (
              <FormHelperText>{errors.profession.message}</FormHelperText>
            )}
          </FormControl>

          {/* COMPANY */}
          <FormControl fullWidth error={Boolean(errors.company)}>
            <InputLabel>Institution/Company</InputLabel>
            <Controller
              control={control}
              name="company"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput
                  {...field}
                  label="Institution/Company"
                  sx={inputStyles}
                />
              )}
            />
            {errors.company && (
              <FormHelperText>{errors.company.message}</FormHelperText>
            )}
          </FormControl>

          {/* MESSAGE — full width */}
          <Box sx={{ gridColumn: "1 / -1" }}>
            <FormControl fullWidth>
              <InputLabel shrink>Message</InputLabel>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <OutlinedInput
                    {...field}
                    multiline
                    minRows={6}
                    label="Message"
                    placeholder="Optional"
                    sx={inputStyles}
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>

        {/* SUBMIT BUTTON */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            type="submit"
            disabled={!isEnabled}
            sx={{
              backgroundColor: isEnabled ? "#E92070" : "#E5D1EE",
              color: "#fff",
              px: 6,
              py: 1.5,
              fontWeight: 700,
              width: { xs: "100%", md: 350 },
              borderRadius: 2,
              "&:hover": {
                backgroundColor: isEnabled ? "#C81C62" : "#E5D1EE",
              },
            }}
          >
            REGISTER
          </Button>
        </Box>
      </form>
    </Box>
  );
}
