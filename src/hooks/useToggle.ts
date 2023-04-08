import { useState } from "react";

/**
 * Toggle hook to toggle a boolean.
 * Good for modals or something like that
 */
export function useToggle( InitValue : boolean ) : [
	boolean,
	() => void
] {
	const [ Boolean, setBoolean ] = useState<boolean>( () => InitValue );
	const Toggle = () => setBoolean( Current => !Current );

	return [ Boolean, Toggle ];
}