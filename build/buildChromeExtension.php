<?php
include_once "BuildExtension.php";

/// Class to create chrome extension from a compiled in release pack
class BuildChromeExtension extends BuildExtension {

    const extDir = "extensions/chrome/";
    const extFileName = "dirtymsp.crx";
    const innerExtPath = "dirtymsp";
    const manifestFile = "manifest.json";

    public function getExtDir() {
        return $this->getRootDir() . self::extDir;
    }

    public function getExtFilePath() {
        return $this->getExtDir() . self::extFileName;
    }

    public function getResJsFilePath() {
        return $this->getExtDir() . self::innerExtPath . DIRECTORY_SEPARATOR . self::resJs;
    }

    public function getManifestFilePath() {
        return $this->getExtDir() . self::innerExtPath . DIRECTORY_SEPARATOR . self::manifestFile;
    }

    public function packExtension() {
        echo "Invoke chrome to build extension...\n";
        $rawPath = $this->getExtDir().self::innerExtPath;
        exec("chrome.exe --pack-extension=\"$rawPath\" --pack-extension-key=\"$rawPath.pem\"");
    }
}

$builder = new BuildChromeExtension();
$builder->build(@$argv[1]);