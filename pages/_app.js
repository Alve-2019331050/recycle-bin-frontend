import { StoreProvider } from "@/context/Store";
import { AuthProvider } from "@/context/auth";
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
    <StoreProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StoreProvider>
    </>
  )
}
