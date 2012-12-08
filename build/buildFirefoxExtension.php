<?php

/// Class to create firefoxe extension from a compiled in release pack
/// Quick and dirty
class createFirefoxExtension
{
	const output    = 'result/d3.user.js';
	const buildnum   = 'result/pack.build.txt';
	const firefoxExt = 'extensions/firefox/dirtyMSP';

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
		echo "Build number: ".$buldnumber."\n";

		$chrExtMan = json_decode( file_get_contents(self::firefoxExt . '/package.json' ));
		if ( $chrExtMan != FALSE )
		{
			$chrExtMan->{'version'} = '3.' . intval($buldnumber / 100 ) . '.' . ($buldnumber - intval($buldnumber / 100 ));
			file_put_contents(self::firefoxExt . '/package.json', json_encode( $chrExtMan ));
			echo "Building firefox extension package.json\n";
		}
		else
		{
			echo "Can't find package.json file! Aborting.\n";
			return;
		}

		//copy script
		$packRelease = file_get_contents(self::output);
		if ( $packRelease )
		{
			file_put_contents(self::firefoxExt.'/data/d3.user.js', $packRelease);
			echo "Pack copied to the extension folder.\n";
		}
		else
		{
			echo "Can't find d3.user.js file! Aborting.\n";
			return;
		}

		$extFile = getcwd().DIRECTORY_SEPARATOR.self::firefoxExt.DIRECTORY_SEPARATOR."dirtymsp.xpi";

		chdir(self::$buildDir.'..');
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

		echo "Invoke cfx command to build extension...\n";

		chdir(getcwd().DIRECTORY_SEPARATOR.self::firefoxExt.DIRECTORY_SEPARATOR);

		exec( "cfx xpi");
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

createFirefoxExtension::run(@$argv[1]);
