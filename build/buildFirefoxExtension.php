<?php
include_once "BuildExtension.php";

/// Class to create firefoxe extension from a compiled in release pack
class BuildFirefoxExtension extends BuildExtension {

    const extDir = "extensions/firefox/dirtymsp/";
    const extFileName = "dirtymsp.xpi";
    const resJsPath = "data";
    const manifestFile = "package.json";

    public function getExtDir() {
        return $this->getRootDir() . self::extDir;
    }

    public function getExtFilePath() {
        return $this->getExtDir() . self::extFileName;
    }

    public function getResJsFilePath() {
        return $this->getExtDir() . self::resJsPath . DIRECTORY_SEPARATOR . self::resJs;
    }

    public function getManifestFilePath() {
        return $this->getExtDir() . self::manifestFile;
    }

    public function packExtension() {
        echo "Invoke cfx command to build extension...\n";
        chdir($this->getExtDir());
        exec("cfx xpi");
    }
}

$builder = new BuildFirefoxExtension();
$builder->build(@$argv[1]);