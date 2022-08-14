import { ReactNode } from "react";

export interface IStyledIconWrapperProps {
    isCard: boolean;
    size?: string;
};

export interface IIconWrapperProps {
    size?: string;
    children: ReactNode;
};
