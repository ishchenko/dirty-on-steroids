<?php

/// Class to merge core script and modules
/// Quick and dirty
class d3merge
{
	const core      = 'd3.template.js';
	const output    = 'result/d3.user.js';
	const revisor   = 'result/pack.version.json';
	const devOutput = 'result/dev.d3.user.js';
	const buildFile = 'result/pack.build.txt';
	const gitHead   = '.git/HEAD';

	static protected $buildDir;
	static public $browser;

	static public function run($mode, $browser = 'cross')
	{
		self::$buildDir = dirname(__FILE__).DIRECTORY_SEPARATOR;
		self::$browser = $browser;
		chdir(self::$buildDir.'..');

		$release = ($mode=='release') || (file_exists(self::gitHead) && preg_match('!/master$!', file_get_contents(self::gitHead)));
		$buildMode = $release ? 'Release' : 'Dev';
		echo "$buildMode mode\n";

		$buildTime = date('Y-m-d H:i:s');
		$buildNumber = (int)@file_get_contents(self::buildFile);
		if($release)
		{
			// increase release build number for extensions
			$buildNumber++;
			echo "Build number: $buildNumber\n";
			file_put_contents(self::buildFile, $buildNumber);
		}

		$code = strtr(file_get_contents(self::core), array
				('// @corelibs@'       => self::sourcesByList('corelibs.txt','core/')
				,'// @contentModules@' => self::sourcesByList('contentModules.txt','content/')
				,'// @modules@'        => self::sourcesByList('modules.txt','modules/')
				,'@buildTime@'         => $buildTime
				,'@buildMode@'         => $buildMode
				,'@buildNumber@'       => $buildNumber
				,'// @jQuery@'         => file_get_contents('core/libs/jquery.js')
				));

		if($release)
		{
			file_put_contents(self::revisor, json_encode(array('buildTime' => $buildTime)));
			echo "Compressing...\n";
			require_once self::$buildDir.'jsmin.php';
			$parts=explode('==/UserScript==',$code);
			$parts[1]=JSMin::minify($parts[1]);
			$code=implode("==/UserScript==\n",$parts);
			$output = self::output;
		}else
		{
			$output = self::devOutput;
		}

		file_put_contents($output,$code);

		echo "done.\n";
		echo "Now install ".realpath($output)." script into your browser.\n";
	}

	static protected function sourcesByList($list, $directory='')
	{
		$browser = self::$browser;
		return join ("\n", array_map
				(function($file) use($directory, $browser)
				{
					$file = preg_replace('![\n\r]!', '', $directory.$file);
					$fn = function($file, $browser){return preg_replace('/@browser@/', $browser, $file);};

					if(!file_exists($full = $fn($file, $browser)) && !file_exists($full = $fn($file, 'cross')))
					{
						$full = $fn($file, $browser);
						echo "File not found: $full\n";
						return '//'.$full;
					}

					echo "Add $full\n";
					return file_get_contents($full);
				}
				,file(self::$buildDir.$list)));
	}
}

d3merge::run(@$argv[1], empty($argv[2])?'cross':$argv[2]);
