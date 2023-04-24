import fs from "fs";

fs.existsSync( "./lib" ) && fs.rmSync( "./lib", { recursive: true } );
fs.existsSync( "./esm" ) && fs.rmSync( "./esm", { recursive: true } );
