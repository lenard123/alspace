<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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

    protected function scopeCompleted($query)
    {
        return $query->where('status', 'COMPLETED');
    }

    protected function scopePending($query)
    {
        return $query->where('status', 'PENDING');
    }

    public static function calculateTotalSales()
    {
        $result = self::query()
            ->completed()
            ->select([
                DB::raw('sum(quantity * price) as total_sales')
            ])
            ->first();
        
        $total_sales = $result->total_sales;

        return $total_sales / 100;
    }

    protected function total() : Attribute
    {
        return Attribute::make(
            get: fn() => ($this->quantity * $this->price)
        );
    }
}
