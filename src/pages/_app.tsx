import "tailwindcss/tailwind.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "hooks/theme";

export default function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
