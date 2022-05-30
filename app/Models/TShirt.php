<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TShirt extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'price', 'availability'];

    protected $with = ['thumbnail'];

    protected $hidden = ['thumbnail'];

    protected $appends = ['thumbnail_url'];

    public function thumbnail()
    {
        return $this->morphOne(Image::class, 'imageable')
            ->withDefault(['source' => 'null']);
    }

    public function getThumbnailUrlAttribute()
    {
        return $this->thumbnail->url;
    }

    public function updateImage($file)
    {
        if (!$this->exists()) {
            $this->save();
        }

        $this->thumbnail->upload($file, 'tshirts');

        return $this->thumbnail;
    }

    protected function price() : Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / 100,
            set: fn($value) => $value * 100
        );
    }

    public function scopeAvailable($query)
    {
        return $query->where('availability', 'Available');
    }
}
