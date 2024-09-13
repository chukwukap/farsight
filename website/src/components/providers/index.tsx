import { ToastProvider } from "../ui/toast";
import { FarcasterProvider } from "./farcasterProvider";
import { StoreProvider } from "./storesProvider";
import { ThemeProvider } from "./themeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <StoreProvider>
        <ToastProvider>
          <FarcasterProvider>{children}</FarcasterProvider>
        </ToastProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
