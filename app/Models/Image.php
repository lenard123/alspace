<?php

namespace App\Models;

use App\Services\ImageUploader;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'reference',
        'payload',
    ];

    protected $appends = ['url'];

    public function imageable()
    {
        return $this->morphTo();
    }

    public function getUrlAttribute()
    {
        switch($this->source) {
            case 'null':
                return null;
            case 'storage':
            case 'public':
                return Storage::url($this->reference);
            default:
                return $this->reference;
        }
    }

    public function upload($file, $folder = '')
    {
        if ($file) {
            $this->source = config('filesystems.default');
            $this->reference = ImageUploader::getPath($file, $folder);
            $this->saveQuietly();
        }
    }

}
