<?php

/// Base class to create extension from a compiled in release pack
abstract class BuildExtension {
    const resultDir = 'result';
    const sourceJs = 'd3.user.js';
    const resJs = 'd3.user.js';
    const buildnum = 'pack.build.txt';

    public function getBuildDir() {
        return dirname(__FILE__) . DIRECTORY_SEPARATOR;
    }

    public function getRootDir() {
        $path = realpath($this->getBuildDir() . '..' . DIRECTORY_SEPARATOR);
        if (substr_compare($path, DIRECTORY_SEPARATOR, -strlen(DIRECTORY_SEPARATOR)) === 0) {
            return $path;
        } else {
            return $path . DIRECTORY_SEPARATOR;
        }
    }

    public function getResultDir() {
        return $this->getRootDir() . self::resultDir . DIRECTORY_SEPARATOR;
    }

    public function getSourceJsFilePath() {
        return $this->getResultDir() . self::sourceJs;
    }

    public static function createDirForFile($file) {
        $dir = dirname($file);
        if (!file_exists($dir)) {
            if (!mkdir($dir, 0777, true)) {
                throw new Exception("Unable to create directory: $dir.");
            }
        }
    }

    abstract public function getExtDir();

    abstract public function getExtFilePath();

    abstract public function getResJsFilePath();

    abstract public function getManifestFilePath();

    abstract public function packExtension();

    /**
     * @return int|string
     */
    public function getBuildNumber() {
        $buldnumber = file_get_contents($this->getResultDir() . self::buildnum, NULL, NULL, 0, 5);
        if ($buldnumber === FALSE) {
            return 0;
        }
        return $buldnumber;
    }


    public function echoPaths() {
        echo "Paths:\n";
        echo "rootDir:{$this->getRootDir()}\n";
        echo "buildDir:{$this->getBuildDir()}\n";
        echo "sourceJsFilePath:{$this->getSourceJsFilePath()}\n";
        echo "extDir:{$this->getExtDir()}\n";
        echo "extFilePath:{$this->getExtFilePath()}\n";
        echo "resultDir:{$this->getResultDir()}\n";
        echo "resJsFilePath:{$this->getResJsFilePath()}\n";
        echo "manifestFilePath:{$this->getManifestFilePath()}\n";
    }

    public function build($arg) {
        $this->echoPaths();

        chdir($this->getRootDir());

        $buldnumber = $this->getBuildNumber();
        echo "Build number: " . $buldnumber . "\n";

        @$manifestContentJson = json_decode(file_get_contents($this->getManifestFilePath()));
        if ($manifestContentJson != FALSE) {
            $majorVersion = intval($buldnumber / 100 );
            $minorVersion = $buldnumber - ( $majorVersion * 100 );
            $manifestContentJson->{'version'} = "3.$majorVersion.$minorVersion";
            file_put_contents($this->getManifestFilePath(), json_encode($manifestContentJson));
            echo "Building manifest.\n";
        } else {
            echo "Can't find {$this->getManifestFilePath()} file! Aborting.\n";
            return;
        }

        //copy script
        $jsSourcePath = $this->getSourceJsFilePath();
        if (file_exists($jsSourcePath)) {
            $rezPath = $this->getResJsFilePath();
            self::createDirForFile($rezPath);
            copy($jsSourcePath, $rezPath);
            echo "Pack copied to the extension folder.\n";
        } else {
            echo "Can't find '$jsSourcePath'! Aborting.\n";
            return;
        }

        $extFile = $this->getExtFilePath();
        if (file_exists($extFile)) {
            echo "Deleting old extension file...\n";
            if (!unlink($extFile)) {
                echo "Can't delete old extension file! Aborting.\n";
                return;
            } else {
                echo "Old extension file deleted.\n";
            }
        }

        $this->packExtension();

        if (file_exists($extFile)) {
            echo "New extension file has been created.\n";
            echo "Now you may distribute extension file: $extFile\n";
        } else {
            echo "Something went wrong!\n";
        }
    }
}
