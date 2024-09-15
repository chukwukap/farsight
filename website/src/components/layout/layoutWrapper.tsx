import ModalManager from "../modals/modalManager";
import { Toast } from "../ui/toast";
import Providers from "../providers";
import Footer from "./footer";
import Header from "./header";
import LoadingScreen from "../loadingScreen";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <ModalManager />
      <Toast />
      <LoadingScreen />
      <div className="flex flex-col h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
};
