<?php

/// Class to merge core script and modules
/// Quick and dirty 
class d3merge
{
	const core='d3.template.js';
	const output='result\\d3.user.js';
	
	static public function run()
	{
		chdir(dirname(__FILE__));
		$jQuery=file_get_contents('jquery.js');
		
		$names=file('modules.txt');
		$modules='';
		foreach($names as $fname)
		{
			$fname=preg_replace('![\\r\\n]+!','',$fname);
			if(file_exists($fname))
			{
				echo "Add $fname\n";
				$modules.="\n".file_get_contents($fname);
			}
			else 
			{
				echo "Can't find $fname\n";
				return;
			}
		}
		
		file_put_contents(self::output
			,str_replace('// @modules@',$modules
				,str_replace('// @jQuery@',$jQuery
					,file_get_contents(self::core))));
							
		echo "done.\n";
		echo "Now install ".self::output." script into your browser.\n";
	}
}

d3merge::run();