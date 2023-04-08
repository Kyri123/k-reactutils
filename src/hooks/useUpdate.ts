import { useToggle } from "./useToggle";

export function useUpdate() : () => void {
	const Toggle = useToggle( false );
	return () => Toggle[ 1 ]();
}