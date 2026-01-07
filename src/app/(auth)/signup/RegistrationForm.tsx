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
  Dialog,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Backdrop, CircularProgress } from "@mui/material";

interface RegistrationValues {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  profession: string;
  company: string;
  country: string;
  city: string;
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
      country: "",
      city: "",
      message: "",
    },
  });

  const all = watch();
  const selectedCountry = watch("country");

  const [isLoading, setIsLoading] = React.useState(false);


  const isEnabled =
    all.name &&
    all.lastName &&
    all.email &&
    all.phone &&
    all.profession &&
    all.company &&
    all.country &&
    all.city;

  const [openOtpModal, setOpenOtpModal] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [registeredEmail, setRegisteredEmail] = React.useState("");
  const [registeredName, setRegisteredName] = React.useState("");
  


  const [openSuccessModal, setOpenSuccessModal] = React.useState(false);

  const handleCloseSuccessModal = () => {
    setOpenSuccessModal(false);

    router.push("/"); // Redirect to home after closing
  };

  const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


  const onSubmit = async (values: RegistrationValues) => {
    try {
      setIsLoading(true);

      const otp = generateOTP();

      const body = {
        username: values.email.split("@")[0],
        email: values.email,
        password: "Temp1234!", // temporal
        name: values.name,
        lastName: values.lastName,
        phone: values.phone,
        profession: values.profession,
        message: values.message,
        institution: values.company,
        country: values.country,
        city: values.city,
        OTP: otp
      };


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error("STRAPI REGISTER ERROR:", data);
        throw new Error(data?.error?.message || "Register failed");
      }


      // 2️⃣ Enviar OTP por email (NestJS)
      await fetch(`${process.env.NEXT_PUBLIC_HELPER_API}/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "X-Internal-Token": process.env.NEXT_PUBLIC_HELPER_API_TOKEN!, },
        body: JSON.stringify({
          to: values.email,
          name: values.name,
          otp,
        }),
      });

      // 3️⃣ Abrir modal OTP
      setOpenOtpModal(true);
      setRegisteredEmail(values.email);
      setRegisteredName(values.name + ' ' + values.lastName);

    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    try {
      setIsLoading(true);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_HELPER_API}/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "X-Internal-Token": process.env.NEXT_PUBLIC_HELPER_API_TOKEN!, },
        body: JSON.stringify({
          email: registeredEmail,
          otp,
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("VALIDATE OTP ERROR:", data);
        throw new Error(data?.error?.message || "Confirm OTP failed");
      }

      // 2️⃣ Avisar al admin WOM
      const res1 = await fetch(`${process.env.NEXT_PUBLIC_HELPER_API}/email/admin-new-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "X-Internal-Token": process.env.NEXT_PUBLIC_HELPER_API_TOKEN!, },
        body: JSON.stringify({
          email: registeredEmail,
          name: registeredName,
        }),
      });

      const data1 = await res1.json();
      if (!res1.ok) {
        console.error("ADMIN ALERT ERROR:", data1);
        throw new Error(data1?.error?.message || "Confirm OTP failed");
      }

      setOpenOtpModal(false);
      setOpenSuccessModal(true);
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };



  const inputStyles = {
    backgroundColor: "#fff",
    borderRadius: 2,
  };

  // -----------------------------
  // Countries & Cities
  // -----------------------------
  const [countries, setCountries] = React.useState<string[]>([]);
  const [cities, setCities] = React.useState<string[]>([]);

  // Load countries
  React.useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => {
        const countryNames = data.data
          .map((c: any) => c.name)
          .sort((a: string, b: string) => a.localeCompare(b));

        setCountries(countryNames);
      })
      .catch((err) => {
        console.error("Error loading countries:", err);
      });
  }, []);


  // Load cities when country changes
  React.useEffect(() => {
    if (!selectedCountry) {
      setCities([]);
      return;
    }

    fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: selectedCountry }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data.data || []);
      })
      .catch(console.error);
  }, [selectedCountry]);

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
          src="/assets/wom_logo.png"
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
            <FormHelperText>{errors.name?.message}</FormHelperText>
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
            <FormHelperText>{errors.lastName?.message}</FormHelperText>
          </FormControl>

          {/* EMAIL */}
          <FormControl fullWidth error={Boolean(errors.email)}>
            <InputLabel>Email Address</InputLabel>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput {...field} label="Email Address" sx={inputStyles} />
              )}
            />
            <FormHelperText>{errors.email?.message}</FormHelperText>
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
            <FormHelperText>{errors.phone?.message}</FormHelperText>
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
                  <MenuItem value="Fixed Income Investor">Fixed Income Investor</MenuItem>
                  <MenuItem value="Fixed Income Sell-Side">Fixed Income Sell-Side</MenuItem>
                  <MenuItem value="Equity Investor">Equity Investor</MenuItem>
                  <MenuItem value="Equity Sell-Side">Equity Sell-Side</MenuItem>
                  <MenuItem value="Credit Rating">Credit Rating</MenuItem>
                  <MenuItem value="Journalist/Press">Journalist/Press </MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              )}
            />
            <FormHelperText>{errors.profession?.message}</FormHelperText>
          </FormControl>

          {/* COMPANY */}
          <FormControl fullWidth error={Boolean(errors.company)}>
            <InputLabel>Institution/Company</InputLabel>
            <Controller
              control={control}
              name="company"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <OutlinedInput {...field} label="Institution/Company" sx={inputStyles} />
              )}
            />
            <FormHelperText>{errors.company?.message}</FormHelperText>
          </FormControl>

          {/* COUNTRY */}
          <FormControl fullWidth error={Boolean(errors.country)}>
            <InputLabel>Country</InputLabel>
            <Controller
              control={control}
              name="country"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select {...field} label="Country" sx={inputStyles}>
                  <MenuItem value="">Select</MenuItem>
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>

          {/* CITY */}
          <FormControl
            fullWidth
            error={Boolean(errors.city)}
            disabled={!selectedCountry}
          >
            <InputLabel>City</InputLabel>
            <Controller
              control={control}
              name="city"
              rules={{ required: "Required" }}
              render={({ field }) => (
                <Select {...field} label="City" sx={inputStyles}>
                  <MenuItem value="">Select</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <FormHelperText>{errors.city?.message}</FormHelperText>
          </FormControl>

          {/* MESSAGE */}
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

        {/* SUBMIT */}
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
      <Dialog
        open={openOtpModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Verify your email
        </Typography>

        <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Typography sx={{ mb: 3 }}>
          Enter the verification code sent to your email and set your password.
        </Typography>

        <OutlinedInput
          fullWidth
          placeholder="OTP Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          sx={{ mb: 2 }}
        />

        <OutlinedInput
          fullWidth
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <OutlinedInput
          fullWidth
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 4 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => setOpenOtpModal(false)}>
            CLOSE
          </Button>

          <Button
            variant="contained"
            disabled={
              !otp ||
              !password ||
              password !== confirmPassword
            }
            onClick={handleConfirmOtp}
            sx={{ backgroundColor: "#E92070" }}
          >
            CONFIRM
          </Button>
        </Box>
      </Dialog>
      <Dialog
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: 4, p: 3 } }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Account created
        </Typography>

        <Box sx={{ borderBottom: "1px solid #DEE2E6", mb: 3 }} />

        <Typography sx={{ mb: 4, color: "#555" }}>
          Your account has been created. Now, please wait until our team finish your
          details review. You will receive a new email when you can enter to this
          portal.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleCloseSuccessModal}
            sx={{
              backgroundColor: "#E92070",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 2,
              px: 4,
              "&:hover": {
                backgroundColor: "#C81C62",
              },
            }}
          >
            ACCEPT
          </Button>

        </Box>
      </Dialog>

      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.modal + 1,
          backdropFilter: "blur(4px)",
        }}
        open={isLoading}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: 2, fontWeight: 600 }}>
            Creating your account...
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}
