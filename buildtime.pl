#!/usr/bin/perl

$filename = "dirty.pack.user.js";
open ( FILE, $filename) or die "Cannot open file: $!";

$found = 0;
while ( $line = <FILE> ) {
    if ($linea =~ m/	buildtime:(.+)/) {
			$time = time();
			$found = 1;
			push(@outLines, "	buildtime: ".$time.",");
			print("Set buildtime to " . $time . ".\n");
		}else{
			push(@outLines, $line);
		}
}
close FILE;

if($found == 0){die "Buildtime marker not found in js file";}

open ( OUTFILE, ">$filename" );
print ( OUTFILE @outLines );
close ( OUTFILE );
