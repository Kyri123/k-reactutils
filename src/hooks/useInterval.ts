import { useEffect } from "react";
import { useToggle } from "./useToggle";

export function useInterval( Function : () => void, Seconds : number = 1000 ) {
	const [ Active, Toggle ] = useToggle( true );

	useEffect( () => {
		if ( Active ) {
			const Interval = setInterval( Function, Seconds );
			return () => clearInterval( Interval );
		}
		return () => {
		};
	}, [ Function, Seconds, Active ] );

	return { Toggle };
}