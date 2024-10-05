import { Box, Image, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/use.store";

export default function ProtectedRoutes() {
  const auth = useAppSelector((state) => state.auth);

  // if (auth.loading == "pending") {
  //   return (
  //     <Box
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       height="100vh"
  //     >
  //       <Box textAlign="center">
  //         <Image mb={4} h={50} src="/logo.svg" alt="circle logo" />
  //         <Spinner h={50} w={50} mt={4} />
  //       </Box>
  //     </Box>
  //   );
  // }

  if (auth.loading == "pending") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        bg="backgroundCircle" // Background color for better visibility
      >
        <Box textAlign="center">
          {/* Logo with scale animation only */}
          <Image
            mb={4}
            h={50}
            src="/logo.svg"
            alt="circle logo"
            animation="scaleUpDown 1.5s infinite alternate" // Add scale animation
          />

          {/* Customize Spinner appearance */}
          <Spinner
            h={50}
            w={50}
            mt={4}
            thickness="4px"
            speed="0.8s"
            emptyColor="gray.200"
            color="blue.500" // Change spinner color to blue
            size="2xl" // Make spinner a bit larger
            animation="fadeIn 1.5s infinite alternate" // Add fading effect
          />
        </Box>

        {/* CSS keyframes for animations */}
        <style jsx>{`
          @keyframes scaleUpDown {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1); // Scale up for a bounce effect
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0.5; // Start with reduced opacity
            }
            100% {
              opacity: 1; // End with full opacity
            }
          }
        `}</style>
      </Box>
    );
  }

  if (auth.entities.id) {
    return (
      <div>
        <Outlet />
      </div>
    );
  }

  if (auth.loading == "failed") {
    return <Navigate to="login" />;
  }
}
