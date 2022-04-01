import {
    Container,
    Center,
    Box,
    Input,
    FormControl,
    FormLabel,
    Button,
    Text,
    Icon,
    useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { VscKey } from "react-icons/vsc";

export default function login() {
    const [isLoginForm, setLoginForm] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [keyFile, setkeyFile] = useState({ name: null, text: null });
    const fileInput = useRef(null);
    const toast = useToast();

    const parseKeyFile = async () => {
        const files = fileInput.current.files;
        if (files.length > 0) {
            setkeyFile({
                name: files[0].name,
                text: await files[0].text(),
            });
        }
    };

    const validateInput = (e) => {
        const email = e.target[0].value;
        const password = e.target[1].value;
        if (email.trim() === "") throw "Email is empty";
        if (password.trim() === "") throw "Password is empty";
        if (!isLoginForm) {
            if (!keyFile || !keyFile.name) throw "Invalid Key file selection";
            if (e.target[2].value !== password) throw "Password fields don't match";
        }
        return { email, password };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { email, password } = validateInput(e);
        } catch (e) {
            setLoading(false);
            toast({
                title: e,
                status: "error",
                position: "top",
                isClosable: true,
            });
        }
    };

    return (
        <Container h="100vh">
            <Center h="100vh">
                <Box shadow="md" rounded="md" p="6" w="full" maxW="25em" border="1px">
                    <Text fontSize={"1.4em"} pb="4">
                        Sign In
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl my="4">
                            <FormLabel htmlFor="email" color={"whiteAlpha.500"}>
                                Email address
                            </FormLabel>
                            <Input id="email" type="email" />
                        </FormControl>
                        <FormControl my="4">
                            <FormLabel htmlFor="password" color={"whiteAlpha.500"}>
                                Password
                            </FormLabel>
                            <Input id="password" type="password" />
                        </FormControl>
                        {!isLoginForm && (
                            <FormControl my="4">
                                <FormLabel htmlFor="repassword" color={"whiteAlpha.500"}>
                                    Re-type Password
                                </FormLabel>
                                <Input id="repassword" type="password" />
                            </FormControl>
                        )}
                        {!isLoginForm && (
                            <Button isFullWidth={true} onClick={() => fileInput.current.click()}>
                                <Icon as={VscKey} mr="2"></Icon>{" "}
                                {keyFile.name || "Select Master Key"}
                            </Button>
                        )}
                        <Button
                            my="6"
                            isLoading={isLoading}
                            loadingText="Submitting"
                            colorScheme="teal"
                            isFullWidth={true}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                    <Button
                        isFullWidth={true}
                        variant={"link"}
                        onClick={() => setLoginForm(!isLoginForm)}
                    >
                        {isLoginForm ? "Create Account" : "Already have account? Sign in."}
                    </Button>
                    <input
                        type="file"
                        ref={fileInput}
                        style={{ display: "none" }}
                        onChange={parseKeyFile}
                    ></input>
                </Box>
            </Center>
        </Container>
    );
}
