<?php

/// Class to create chrome extension from a compiled in release pack
/// Quick and dirty
class createChromeExtension
{
	const output    = 'result/d3.user.js';
	const buildnum   = 'extensions/chrome/dirtyMSP/pack.build.txt';
	const chromeExt = 'extensions/chrome/dirtyMSP';

	static protected $buildDir;

	static public function run($arg)
	{
		self::$buildDir = dirname(__FILE__).DIRECTORY_SEPARATOR;
		chdir(self::$buildDir.'..');

		$buldnumber = file_get_contents(self::buildnum, NULL, NULL, 0, 5 );
		if ( $buldnumber == FALSE )
		{
			$buldnumber = 0;
		}
		$buldnumber++;
		echo "Build number: ".$buldnumber."\n";
		file_put_contents(self::buildnum, $buldnumber );

		$chrExtMan = json_decode( file_get_contents(self::chromeExt . '/manifest.json' ));
		if ( $chrExtMan != FALSE )
		{
			$chrExtMan->{'version'} = '3.' . intval($buldnumber / 100 ) . '.' . ($buldnumber - intval($buldnumber / 100 ));
			file_put_contents(self::chromeExt . '/manifest.json', json_encode( $chrExtMan ));
			echo "Building chrome extension manifest.\n";
		}
		else
		{
			echo "Can't find manifest.json file! Aborting.\n";
			return;
		}

		//copy script
		$packRelease = file_get_contents(self::output);
		if ( $packRelease )
		{
			file_put_contents(self::chromeExt.'/d3.user.js', $packRelease);
			echo "Pack copied to the extension folder.\n";
		}
		else
		{
			echo "Can't find d3.user.js file! Aborting.\n";
			return;
		}

		$extFile = getcwd().DIRECTORY_SEPARATOR.self::chromeExt.".crx";

		if ( file_exists( $extFile ))
		{
			echo "Deleting old extension file...\n";
			unlink( $extFile ); 
			if ( file_exists( $extFile ))
			{
				echo "Can't delete old extension file! Aborting.\n";
				return;
			}
			else
			{
				echo "Old extension file deleted.\n";
			}
		}

		echo "Invoke chrome to build extension...\n";
		exec( "chrome.exe --pack-extension=\"" . getcwd().DIRECTORY_SEPARATOR.self::chromeExt . "\" --pack-extension-key=\"" . getcwd().DIRECTORY_SEPARATOR.self::chromeExt . ".pem\"");
		if ( file_exists( $extFile ))
		{
			echo "New extension file has been created.\n";
			echo "Now you may distribute extension file: ".$extFile."\n";
		}
		else
		{
			echo "Something went wrong!\n";
		}
	}
}

createChromeExtension::run(@$argv[1]);
