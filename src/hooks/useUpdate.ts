import { useToggle } from "./useToggle";

export function useUpdate() {
	const Toggle = useToggle( false );
	return Toggle[ 1 ];
}