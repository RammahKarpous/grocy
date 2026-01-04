import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<AuthProvider>
				{children}
				
				<Navigation />
			</AuthProvider>
		</>
	);
}
