import { useEffect }     from "react";

export function useTimeout( Function: () => void, Seconds: number = 1000 ): void {
	useEffect( () => {
		const Timeout = setTimeout( Function, Seconds );
		return () => clearTimeout( Timeout );
	}, [ Function, Seconds ] )
}