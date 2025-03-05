import { ThemeProvider } from "@/components/theme-provider";
import type { ChildrenProps } from "@/types";

const GlobalProvider = ({ children }: ChildrenProps) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
};

export default GlobalProvider;
