import React, { PropsWithChildren } from "react";

export class ErrorBoundary extends React.Component<{
	Fallback? : JSX.Element | React.ReactNode
} & PropsWithChildren, {
	HasError : boolean
}> {
	state = { HasError: false };

	// @ts-ignore
	static getDerivedStateFromError() {
		return { HasError: true };
	}

	public componentDidCatch( error : Error, errorInfo : React.ErrorInfo ) : void {
		console.error( error, errorInfo );
	}

	public render() : React.ReactNode {
		if ( this.state.HasError ) {
			return this.props.Fallback;
		}
		return this.props.children;
	}

}