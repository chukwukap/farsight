import React from "react";
import {
  ExclamationTriangleIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

interface DataDisclaimerModalProps {
  onClose: () => void;
}

const DataDisclaimerModal: React.FC<DataDisclaimerModalProps> = ({
  onClose,
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-yellow-100 p-3 rounded-full">
          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Data Accuracy Notice</h2>
      <p className="text-muted-foreground mb-6">
        As we&apos;re still building and refining our analytics platform, the
        data presented here may not be 100% accurate. We&apos;re working
        diligently to improve our data collection and analysis processes.
      </p>
      <div className="flex justify-center space-x-4">
        <Button variant="outline" onClick={onClose}>
          I understand
        </Button>
        <Button
          onClick={onClose}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <HandThumbUpIcon className="h-5 w-5 mr-2" />
          Got it, thanks!
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-6">
        We appreciate your patience as we work to provide you with the most
        accurate insights possible.
      </p>
    </div>
  );
};

export default DataDisclaimerModal;
