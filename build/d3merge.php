<?php

/// Class to merge core script and modules
/// Quick and dirty
class d3merge
{
	const core      = 'd3.template.js';
	const output    = 'result/d3.user.js';
	const revisor   = 'result/pack.version.json';
	const devOutput = 'result/dev.d3.user.js';
	const gitHead   = '.git/HEAD';

	static protected $buildDir;

	static public function run($arg)
	{
		self::$buildDir = dirname(__FILE__).DIRECTORY_SEPARATOR;
		chdir(self::$buildDir.'..');

		$release = ($arg=='release') || (file_exists(self::gitHead) && preg_match('!/master$!', file_get_contents(self::gitHead)));
		echo ($release ? 'Release' : 'Dev')." mode\n";

		$buildTime = date('Y-m-d H:i:s');
		$code = strtr(file_get_contents(self::core), array
				('@buildTime@'         => $buildTime
				,'// @corelibs@'       => self::sourcesByList('corelibs.txt','core/')
				,'// @contentModules@' => self::sourcesByList('contentModules.txt','content/')
				,'// @modules@'        => self::sourcesByList('modules.txt','modules/')
				,'// @jQuery@'         => file_get_contents('core/libs/jquery.js')
				));

		if($release)
		{
			preg_match('!^//\\s+@version\\s+(\\S+)!m', $code, $result);
			file_put_contents(self::revisor, json_encode(array('buildTime' => $buildTime, 'version' => $result[1])));
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
		return join ("\n", array_map
				(function($file) use($directory)
				{
					$full = preg_replace('![\n\r]!','',$directory.$file);
					echo "Add $full\n";
					if(file_exists($full))
					{
						return file_get_contents($full);
					}else
					{
						echo "File not found: $full\n";
						return '//'.$full;
					}
				}
				,file(self::$buildDir.$list)));
	}
}

d3merge::run(@$argv[1]);
