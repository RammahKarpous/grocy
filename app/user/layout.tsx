import Navigation from "@/components/Navigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
			<Navigation />
		</>
	);
}
