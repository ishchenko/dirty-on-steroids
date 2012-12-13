<?php

error_reporting(E_ALL);
ini_set('display_errors', true);

include "BuildExtension.php";

class BuildOperaExtension extends BuildExtension {
    const EXT_DIR                   = "extensions/opera/dirtyMSP/";
    const EXT_PRIVATE_BUILD_DIR     = "extensions/opera/.build/";
    const EXT_FILE_NAME_TEMPLATE    = "dirtyMSP-%s.oex";
    const EXT_RES_JS_FILE           = "includes/payload.js";
    const EXT_JS_TEMPLATE           = "../payload.template.js";
    const SUPER_VERSION             = 1;
    const BUILD_ERROR_CODE          = 1;

    private $tmpPath                = null;

    private function checkPreRequisites() {
        if (!class_exists("ZipArchive")) {
            echo "Please install PHP zip extension to use this build script. http://php.net/manual/en/book.zip.php".PHP_EOL;
            exit(self::BUILD_ERROR_CODE);
        }
    }

    public function cleanUp() {
        $this->deleteRecursive($this->getPrivateBuildDir());
    }

    public function getExtDir() {
        return $this->getRootDir().self::EXT_DIR;
    }

    public function getPrivateBuildDir() {
        return $this->getRootDir().self::EXT_PRIVATE_BUILD_DIR;
    }

    public function getExtTmpDir() {
        if (is_null($this->tmpPath)) {
            $this->tmpPath = sprintf($this->getPrivateBuildDir()."%s/src", time());
        }

        return $this->tmpPath.DIRECTORY_SEPARATOR;
    }

    public function prepareCode() {
        if (mkdir($this->getExtTmpDir(), 0755, true) === false) {
            echo "Cannot create temporary folder [{$this->getExtTmpDir()}]. Check permissions.".PHP_EOL;
            exit(self::BUILD_ERROR_CODE);
        }

        $this->copyRecursive($this->getExtDir(), $this->getExtTmpDir());

        $js = file_get_contents($this->getSourceJsFilePath());
        $template = file_get_contents($this->getExtDir().self::EXT_JS_TEMPLATE);
        file_put_contents($this->getResJsFilePath(), str_replace("//@@payload@@", $js, $template));

        unlink(dirname($this->getResJsFilePath()).DIRECTORY_SEPARATOR.".gitignore");
    }

    public function copyRecursive($from, $to) {
        foreach (
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($from, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::SELF_FIRST
            ) as $item
        ) {
            if ($item->isDir()) {
                mkdir($to.DIRECTORY_SEPARATOR.$iterator->getSubPathname());
            } else {
                copy($item, $to.DIRECTORY_SEPARATOR.$iterator->getSubPathname());
            }
        }
    }

    public function deleteRecursive($path) {
        foreach (
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::CHILD_FIRST
            ) as $item
        ) {
            if ($item->isFile()) {
                unlink($item->getPathName());
            } else {
                rmdir($item->getPathName());
            }
        }
        rmdir($path);
    }

    private function getExtFileName() {
        return sprintf(self::EXT_FILE_NAME_TEMPLATE, $this->getVersion());
    }

    private function getResBundleFilePath() {
        return $this->getResultDir().$this->getExtFileName();
    }

    public function getExtFilePath() {
        return $this->getExtTmpDir()."..".DIRECTORY_SEPARATOR.$this->getExtFileName();
    }

    public function getResJsFilePath() {
        return $this->getExtTmpDir().self::EXT_RES_JS_FILE;
    }

    public function getManifestFilePath() {
        return $this->getExtTmpDir()."config.xml";
    }

    public function packExtension() {
        $zip = new ZipArchive();
        if ($zip->open($this->getExtFilePath(), ZIPARCHIVE::CREATE) === false) {
            echo "Cannot create zip archive at [{$this->getExtFileName()}]".PHP_EOL;
            die(self::BUILD_ERROR_CODE);
        }

        foreach (
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($this->getExtTmpDir(), RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::CHILD_FIRST
            ) as $item
        ) {
            $itemPath = str_replace($this->getExtTmpDir(), "", $item->getPathName());
            if (!$item->isDir()) {
                $zip->addFile($item->getPathName(), $itemPath);
            }
            echo "Adding into package: {$item->getPathName()}".PHP_EOL;
        }

        $zip->close();
    }

    public function populateConfig() {
        $config = file_get_contents($this->getManifestFilePath());
        $configWithVersion = str_replace("@version@", $this->getVersion(), $config);
        file_put_contents($this->getManifestFilePath(), $configWithVersion);
    }

    public function moveProductToResultFolder() {
        if (file_exists($this->getResBundleFilePath())) {
            unlink($this->getResBundleFilePath());
        }

        copy($this->getExtFilePath(), $this->getResultDir().$this->getExtFileName());
    }

    public function build($arg) {
        $this->checkPreRequisites();

        $this->echoPaths();

        $this->prepareCode();

        $this->populateConfig();

        $this->packExtension();

        $this->moveProductToResultFolder();

        $bundle = $this->getResBundleFilePath();

        if (file_exists($bundle)) {
            echo PHP_EOL;
            echo "New extension created at: {$bundle}".PHP_EOL;
            echo "Enjoy!".PHP_EOL;
        } else {
            echo "Something went wrong, please check the output above.".PHP_EOL;
        }
    }

    public function getVersion() {
        $buildNumber = $this->getBuildNumber();

        return self::SUPER_VERSION.".".$buildNumber;
    }
}

$builder = new BuildOperaExtension();
register_shutdown_function(array($builder, "cleanUp"));
$builder->build(@$argv[1]);