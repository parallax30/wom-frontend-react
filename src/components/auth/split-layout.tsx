'use client';

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";

export interface SplitLayoutProps {
  children: React.ReactNode;
  cms?: any;
}

export function SplitLayout({ children, cms }: SplitLayoutProps) {
  const title = cms?.leftTitle ?? "About WOM";

  // Imagen del CMS
  const leftImage = cms?.leftImage?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${cms.leftImage.url}`
    : "/assets/about_wom_image.jpg";

  const logoGrande = cms?.leftImage?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${cms.logoGrande}`
    : "/assets/wom_empresas_logo.png";

  console.log("Logo Grande URL:", cms.logoGrande);


  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
        minHeight: "100vh",
      }}
    >
      {/* LEFT PANEL */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          px: { xs: 3, md: 8 },
          py: 4,
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "700px", mx: "auto" }}>
          
          {/* Logo fijo */}
          <Box sx={{ mb: 4, mt: 2, width: 250, height: 120, position: "relative" }}>
            <Image
              src={logoGrande}
              alt="WOM Empresas"
              fill
              sizes="250px"
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Título dinámico */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
            {title}
          </Typography>

          {/* Imagen dinámica */}
          <Box sx={{ width: "100%", mb: 3 }}>
            <Image
              src={leftImage}
              width={570}
              height={300}
              alt={title}
              sizes="250px"
              style={{ width: "100%", height: "auto", borderRadius: 4 }}
            />
          </Box>

          {/* Texto dinámico */}
          <Typography
            component="div"   // 👈 CLAVE
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "justify" }}
          >
            {cms.loginParagraphLeft}
          </Typography>

          {/* Link de registro fijo */}
          {/* <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 12 }}>
            <Typography>New User?</Typography>
            <Link
              href="/signup"
              underline="hover"
              sx={{ fontWeight: 700, color: "#3f51b5" }}
            >
              Register
            </Link>

            <Image
              src="/assets/register_icon.png"
              width={22}
              height={22}
              alt="Register icon"
              style={{ width: "auto", height: "auto" }}
            />
          </Stack> */}
        </Box>
      </Box>

      {/* RIGHT PANEL */}
      <Box
        sx={{
          boxShadow: "var(--mui-shadows-8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Box sx={{ maxWidth: "100%", width: "100%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}


