import { useRef } from "react";

export function usePageTitle( InitTitle?: string ): ( NewTitle: string ) => void {
	const Title = useRef( InitTitle || document.title );

	if( Title.current ) {
		if (document.title !== Title.current) {
			document.title = Title.current;
		}
	}

	return ( NewTitle : string ) => {
		if( Title.current !== InitTitle ) {
			Title.current = NewTitle;
			if( document.title !== Title.current ) {
				document.title = Title.current;
			}
		}
	};
}