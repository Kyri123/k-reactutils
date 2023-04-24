import { useEffect } from "react";

export function useTimeout( Function : () => void, Seconds  = 1000 ) : void {
	useEffect( () => {
		const Timeout = setTimeout( Function, Seconds );
		return () => clearTimeout( Timeout );
	}, [ Function, Seconds ] );
}