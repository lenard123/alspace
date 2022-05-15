<?php

namespace App\Services;

use App\Models\Image;
use Illuminate\Support\Facades\Storage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class ImageUploader
{

    public $type;

    public function __construct($type, $file, $folder)
    {
        $this->type = $type;
        $this->path = $this->getPath($file, $folder);
    }

    public static function upload($owner, $file, $folder = 'temp') : Image
    {
        $path = self::getPath($file, $folder);

        $image = new Image();
        $image->imageable()->associate($owner);
        $image->source = config('filesystems.default');
        $image->reference = $path;
        $image->save();

        return $image;
    }

    public static function getPath($file, $folder)
    {
        switch(config('filesystems.default')) {
            case 'cloudinary':
                return $file->storeOnCloudinary("alspace/$folder")->getSecurePath();
            default:
                return Storage::putFile($folder, $file);
        }
    }
}