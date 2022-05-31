<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TShirtRequest extends Model
{
    use HasFactory;

    protected $appends = ['total'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tshirt()
    {
        return $this->belongsTo(TShirt::class, 'tshirt_id');
    }

    protected function price() : Attribute
    {
        return Attribute::make(
            get: fn($value) => $value / 100,
            set: fn($value) => $value * 100
        );
    }

    protected function total() : Attribute
    {
        return Attribute::make(
            get: fn() => ($this->quantity * $this->price)
        );
    }
}
