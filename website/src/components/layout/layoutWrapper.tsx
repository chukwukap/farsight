import { Modal } from "../modal";
import { Toast } from "../ui/toast";
import Providers from "../providers";
import Footer from "./footer";
import Header from "./header";

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Providers>
      <Modal />
      <Toast />
      <div className="flex flex-col h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
};
