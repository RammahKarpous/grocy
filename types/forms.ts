export interface FormWrapperProps {
    className?: string;
    onSubmit: (e: React.FormEvent) => Promise<void>;
    title?: string;
    children: React.ReactNode
    width?: "small" | "medium" | "large" | "full" 
}