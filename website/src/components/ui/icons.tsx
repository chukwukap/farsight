import React from "react";

interface FarcasterIconProps extends React.SVGProps<SVGSVGElement> {}

export const FarcasterIcon: React.FC<FarcasterIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4.11841 1H19.5982V4.09052H24L23.0775 7.18179H22.2964V19.6873C22.6881 19.6873 23.0061 20.0012 23.0061 20.3892V21.2321H23.1481C23.5406 21.2321 23.8587 21.5468 23.8587 21.9348V22.7778H15.9053V21.9348C15.9053 21.5468 16.2233 21.2321 16.6157 21.2321H16.7578V20.3892C16.7578 20.0519 16.9984 19.7702 17.3187 19.7024L17.3037 12.8021C17.0526 10.0451 14.7107 7.88443 11.8583 7.88443C9.00593 7.88443 6.66403 10.0451 6.41293 12.8021L6.3979 19.6963C6.7768 19.7521 7.24293 20.0412 7.24293 20.3892V21.2321H7.38502C7.77671 21.2321 8.09473 21.5468 8.09473 21.9348V22.7778H0.142092V21.9348C0.142092 21.5468 0.460107 21.2321 0.8518 21.2321H0.993892V20.3892C0.993892 20.0012 1.31191 19.6873 1.70436 19.6873V7.18179H0.923221L0 4.09052H4.11841V1Z" />
    </svg>
  );
};

interface XIconProps extends React.SVGProps<SVGSVGElement> {}

export const XIcon: React.FC<XIconProps> = (props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
};
