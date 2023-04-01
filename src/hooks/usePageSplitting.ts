import {
	useEffect,
	useState
} from "react";

export function usePageSplitting< T extends any >( Array: T[], NumPerPage: number = 50 ) {
	const [ SelectPage, setSelectedPage ] = useState( 0 );
	const [ CurrentPageArray, setCurrentPageArray ] = useState( () => [ ...Array ].splice( 0, NumPerPage ) );

	useEffect( () => {
		setCurrentPageArray( () => [ ...Array ].splice( SelectPage * NumPerPage, NumPerPage ) );
	}, [ Array ] )

	const SetPage = ( Page: number ) => {
		const RealPage = Math.min(Math.max(Page, 0), Math.ceil( Array.length / NumPerPage ))
		if( RealPage !== SelectPage ) {
			setSelectedPage( RealPage );
			setCurrentPageArray( [ ...Array ].splice( RealPage * NumPerPage, NumPerPage ) )
		}
	}

	const NextPage = ( Page: -1 | 1 ) => {
		SetPage( SelectPage + Page );
	}

	return {
		CurrentPageArray,
		SelectPage,
		SetPage,
		NextPage
	}
}