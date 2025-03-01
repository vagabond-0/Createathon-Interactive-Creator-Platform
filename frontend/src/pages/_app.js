import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/Components/Home/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <AuthProvider>
      {router.pathname !== "/Login" && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
