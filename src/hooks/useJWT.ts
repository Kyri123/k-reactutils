import { useLocalStorage }        from "./useLocalStorage";
import { useMemo }                from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";

export function useJWT<T = any & JwtPayload>( StorageKey : string ) {
	const { Storage, SetStorage, ResetStorage } = useLocalStorage( StorageKey, "" );

	const Session = useMemo( () : ( T & JwtPayload | undefined ) => {
		try {
			return jwt_decode( Storage );
		}
		catch ( e ) {
			console.warn( e );
		}
		return undefined;
	}, [ Storage ] );

	const GetRaw = () : T | undefined => {
		if ( !Session ) {
			return Session;
		}

		const RawSession = { ...Session };

		delete RawSession.exp;
		delete RawSession.aud;
		delete RawSession.iat;
		delete RawSession.iss;
		delete RawSession.nbf;
		delete RawSession.jti;
		delete RawSession.sub;

		return RawSession;
	};

	const SecondsLeft = () => {
		return Math.max( ( Session?.exp || 0 ) - Math.trunc( Date.now() / 1000 ), 0 );
	};

	const SessionActive = () => {
		return SecondsLeft() > 0;
	};

	return {
		Token: Storage,
		UpdateToken: SetStorage,
		SecondsLeft,
		SessionActive,
		Session,
		ClearSession: ResetStorage,
		GetRawSession: GetRaw
	};
}